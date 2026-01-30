import { useState, useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import { UserList } from '../components/UserList';
import { SearchBar } from '../components/SearchBar';
import { SortControls, type SortOrder } from '../components/SortControls';
import { UserModal } from '../components/UserModal';
import { type User } from '../utils/api';
import { Loader2, AlertCircle } from 'lucide-react';

export const Dashboard = () => {
  const { data: users, isLoading, error } = useUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Reset page when search/sort changes
  useMemo(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortOrder]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    let result = users;

    // Filter
    if (debouncedSearchTerm) {
      const lowerTerm = debouncedSearchTerm.toLowerCase();
      result = result.filter(user =>
        user.name.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return result;
  }, [users, debouncedSearchTerm, sortOrder]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="loading-state">
        <Loader2 className="animate-spin" size={48} />
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <AlertCircle size={48} color="#dc2626" />
        <h2>Error loading users</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>User Directory</h1>
        <div className="controls">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <SortControls sortOrder={sortOrder} onSortChange={setSortOrder} />
        </div>
      </header>

      <main>
        <UserList users={paginatedUsers} onUserClick={setSelectedUser} />

        {filteredUsers.length > ITEMS_PER_PAGE && (
          <div className="pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="page-btn"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="page-btn"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

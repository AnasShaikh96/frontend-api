import { type User } from '../utils/api';
import { UserCard } from './UserCard';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export const UserList = ({ users, onUserClick }: UserListProps) => {
  if (users.length === 0) {
    return (
      <div className="no-results">
        <p>No users found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={onUserClick} />
      ))}
    </div>
  );
};

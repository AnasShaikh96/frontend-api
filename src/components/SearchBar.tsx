import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        placeholder="Search users by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search users"
      />
    </div>
  );
};

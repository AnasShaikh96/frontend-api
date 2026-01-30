import React from 'react';
import type { User } from '../utils/api';
import { Building2, Mail } from 'lucide-react';

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

export const UserCard = React.memo(({ user, onClick }: UserCardProps) => {
  return (
    <div
      className="user-card"
      onClick={() => onClick(user)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(user);
        }
      }}
    >
      <h3>{user.name}</h3>
      <p className="user-email">
        <Mail size={16} />
        {user.email}
      </p>
      <p className="user-company">
        <Building2 size={16} />
        {user.company.name}
      </p>
    </div>
  );
});

UserCard.displayName = 'UserCard';

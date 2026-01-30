import { useEffect } from 'react';
import type { User } from '../utils/api';
import { X, Phone, Globe, MapPin } from 'lucide-react';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export const UserModal = ({ user, onClose }: UserModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (user) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [user, onClose]);

  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 id="modal-title">{user.name}</h2>
        <p className="modal-username">@{user.username}</p>

        <div className="modal-details">
          <div className="detail-item">
            <MapPin size={20} />
            <div>
              <strong>Address</strong>
              <p>{user.address.street}, {user.address.suite}</p>
              <p>{user.address.city}, {user.address.zipcode}</p>
            </div>
          </div>

          <div className="detail-item">
            <Phone size={20} />
            <div>
              <strong>Phone</strong>
              <p>{user.phone}</p>
            </div>
          </div>

          <div className="detail-item">
            <Globe size={20} />
            <div>
              <strong>Website</strong>
              <p>{user.website}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="company-info">
              <strong>Company: {user.company.name}</strong>
              <p>"{user.company.catchPhrase}"</p>
              <p className="bs">{user.company.bs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

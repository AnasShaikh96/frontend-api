import { useQuery } from '@tanstack/react-query';
import { fetchUsers, type User } from '../utils/api';

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

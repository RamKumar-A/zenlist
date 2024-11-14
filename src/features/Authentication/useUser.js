import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
  const { data: user, isUserPending } = useQuery({
    queryKey: ['users'],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isUserPending,
    isAuthenticated: user?.role === 'authenticated',
  };
}

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
  const {
    data: user,
    isPending: isUserPending,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getCurrentUser,
    retry: false,
  });

  const isAuthenticated = user?.role === 'authenticated';

  return {
    user,
    isUserPending,
    isAuthenticated,
    isError,
  };
}

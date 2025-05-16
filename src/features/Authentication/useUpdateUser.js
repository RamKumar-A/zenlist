import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      queryClient.setQueryData(['users'], user.user);
    },
  });
  return { isUpdating, updateUser, error };
}

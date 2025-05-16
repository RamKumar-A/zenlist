import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSubtask as addSubtaskApi } from '../../services/apiTasks';

export function useCreateSubtask() {
  const queryClient = useQueryClient();

  const { mutate: addSubtask, isPending: isAddingSubtask } = useMutation({
    mutationFn: addSubtaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
  return { addSubtask, isAddingSubtask };
}

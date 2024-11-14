import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubtask as deleteSubtaskApi } from '../../services/apiTasks';

export function useDeleteSubtask() {
  const queryClient = useQueryClient();
  const { mutate: deleteSubtask, isPending: isDeletingSubtask } = useMutation({
    mutationFn: (id) => deleteSubtaskApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
  return { deleteSubtask, isDeletingSubtask };
}

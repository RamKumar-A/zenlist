import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSubtask as updateSubtaskApi } from '../../services/apiTasks';

export function useUpdateSubtask() {
  const queryClient = useQueryClient();

  const { mutate: updateSubTask, isPending: isUpdatingSubtask } = useMutation({
    mutationFn: ({ id, updates }) => updateSubtaskApi(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
  return { updateSubTask, isUpdatingSubtask };
}

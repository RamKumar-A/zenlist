import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask as updateTaskApi } from '../../services/apiTasks';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updates }) => updateTaskApi(id, updates),
    onSuccess: (data, { id, updates }) => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
  return { updateTask, isUpdating };
}

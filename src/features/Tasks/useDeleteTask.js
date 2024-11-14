import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask as deleteTaskApi } from '../../services/apiTasks';

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: (id) => deleteTaskApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
  return { deleteTask, isDeletingTask };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask as addTaskApi } from '../../services/apiTasks';

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { mutate: addTask, isPending: isAddingTask } = useMutation({
    mutationFn: addTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
  return { addTask, isAddingTask };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addList as addListApi } from '../../services/apiLists';

export function useCreateList() {
  const queryClient = useQueryClient();

  const { mutate: addList, isPending: isAddingList } = useMutation({
    mutationFn: (list) => addListApi(list),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lists'],
      });
    },
  });
  return { addList, isAddingList };
}

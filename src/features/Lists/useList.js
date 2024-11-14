import { useQuery } from '@tanstack/react-query';
import { getLists } from '../../services/apiLists';
import { useUser } from '../Authentication/useUser';

export function useList() {
  const { user } = useUser();

  const { data: lists, isPending: isListPending } = useQuery({
    queryKey: ['lists', user.id],
    queryFn: () => getLists(user.id),
    enabled: !!user.id,
  });
  return { lists, isListPending };
}

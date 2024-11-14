import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../services/apiTasks';
import { useUser } from '../Authentication/useUser';

export function useTask() {
  const { user } = useUser();
  const { data, isPending } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: () => getTasks(user?.id),
    enabled: !!user?.id,
  });
  return { data, isPending };
}

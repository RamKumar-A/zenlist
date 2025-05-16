import { useLocation } from 'react-router';

import Template from '../../ui/Template';
import { useTask } from '../Tasks/useTask';

function List() {
  const location = useLocation();
  const { listId } = location.state;

  const { data } = useTask();
  const tasks = data?.filter((d) => d.listId === listId);

  return <Template tasks={tasks} />;
}

export default List;

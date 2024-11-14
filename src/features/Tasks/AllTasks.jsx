import Template from '../../ui/Template';
import { useTask } from './useTask';

function AllTasks() {
  const { data: tasks } = useTask();

  return <Template isAllTask={true} tasks={tasks || []} />;
}

export default AllTasks;

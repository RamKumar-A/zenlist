import { useParams } from 'react-router';
import Template from '../../ui/Template';
import { useTask } from './useTask';

function Priority() {
  const params = useParams();
  const { data } = useTask();
  const priority = params.priorityTag.toLowerCase();
  const tasks = data?.filter((d) => d.priority === priority);
  return (
    <Template
      tasks={tasks}
      priority={priority}
      isImpTask={priority === 'high'}
    />
  );
}

export default Priority;

import { isOverdue } from '../../helpers/isOverdue';
import Template from '../../ui/Template';
import { useTask } from '../Tasks/useTask';

function MydayTasks() {
  const { data } = useTask();
  const tasks = data?.filter((task) => {
    const overdue = isOverdue(task?.dueDate);
    return !overdue && task?.isToday;
  });

  return (
    <Template
      tasks={tasks}
      isTodayTask={true}
      isAllTask={false}
      isImpTask={false}
    />
  );
}

export default MydayTasks;

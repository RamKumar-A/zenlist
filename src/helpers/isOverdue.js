import { format } from 'date-fns';

export function isOverdue(task) {
  const now = new Date();
  const taskDueDate = new Date(task?.dueDate);
  now.setHours(23, 59, 0, 0);
  if (isNaN(taskDueDate)) {
    console.error('Invalid task due date:', task?.dueDate);
    return false;
  }
  return (
    format(now, 'yyyy-MM-dd HH:mm') > format(taskDueDate, 'yyyy-MM-dd HH:mm')
  );
}

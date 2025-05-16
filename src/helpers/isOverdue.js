import { format } from 'date-fns';

// export function isOverdue(task = {}) {
export function isOverdue(dueDate = null) {
  const now = new Date();
  const taskDueDate = new Date(dueDate);
  if (isNaN(taskDueDate)) {
    console.error('Invalid task due date:', dueDate);
    return false;
  }
  // return format(now, 'yyyy-MM-dd') > format(taskDueDate, 'yyyy-MM-dd');
  return new Date() > new Date(dueDate);
}

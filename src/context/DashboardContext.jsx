import { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addDays, isToday, isTomorrow } from 'date-fns';
import { useTask } from '../features/Tasks/useTask';

const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const { data: allTask, isPending } = useTask();
  const [searchParams] = useSearchParams();

  const filterTask = useMemo(() => {
    const days = searchParams.get('task') || 'all';
    if (!allTask) return [];

    const today = new Date();
    const tomorrow = addDays(today, 1);

    return allTask?.filter((task) => {
      const taskDueDate = new Date(task?.dueDate);
      switch (days) {
        case 'today':
          return isToday(taskDueDate);
        case 'tomorrow':
          return isTomorrow(taskDueDate);
        case 'upcoming':
          return taskDueDate > tomorrow;
        default:
          return true;
      }
    });
  }, [allTask, searchParams]);

  if (isPending) return <div>Loading tasks...</div>;

  return (
    <DashboardContext.Provider value={{ allTask, filterTask }}>
      {children}
    </DashboardContext.Provider>
  );
}

function useDashboardTask() {
  const context = useContext(DashboardContext);
  if (context === undefined)
    throw new Error('Dashboard context was used outside the provider');
  return context;
}

export { DashboardProvider, useDashboardTask };

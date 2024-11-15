import { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { useTask } from '../features/Tasks/useTask';

const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const { data: allTask } = useTask();

  const [params] = useSearchParams();

  const days = params.get('task');

  const filterTask = useMemo(() => {
    if (!allTask) return [];

    // Define reference dates
    const today = new Date();
    const tomorrow = addDays(today, 1);

    return allTask?.filter((task) => {
      const taskDueDate = new Date(task?.dueDate);
      // console.log(
      //   format(taskDueDate, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd')
      // );
      switch (days) {
        case 'today':
          return (
            format(taskDueDate, 'yyyy-MM-dd HH:mm') ===
            format(today, 'yyyy-MM-dd HH:mm')
          );
        case 'tomorrow':
          return (
            format(taskDueDate, 'yyyy-MM-dd HH:mm') ===
            format(tomorrow, 'yyyy-MM-dd HH:mm')
          );
        case 'upcoming':
          return taskDueDate > tomorrow;
        case 'all':
        default:
          return true;
      }
    });
  }, [allTask, days]);

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

import { createContext, useContext, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { selectAllTask } from '../Tasks/taskSlice';

const initialState = {
  allTasks: [],
  filterTasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'allTask/addAllTask':
      return { ...state, allTasks: action.payload }; // Fix here: use payload instead of action
    case 'filterTask/today':
      return {
        ...state,
        filterTasks: state.allTasks.filter(
          (task) => task.dueDate === format(new Date(), 'dd/M/yyyy')
        ),
      };
    case 'filterTask/tomorrow':
      return {
        ...state,
        filterTasks: state.allTasks.filter(
          (task) => task.dueDate === format(addDays(new Date(), 1), 'dd/M/yyyy')
        ),
      };

    case 'filterTask/upcoming':
      return {
        ...state,
        filterTasks: state.allTasks.filter(
          (task) => task.dueDate > format(addDays(new Date(), 1), 'dd/M/yyyy')
        ),
      };

    case 'filterTask/all':
      return {
        ...state,
        filterTasks: state.allTasks.map((task) => task),
      };

    default:
      throw new Error('Unknown Type');
  }
}

const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const [{ allTasks, filterTasks }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const allTask = useSelector(selectAllTask);
  const lists = useSelector((state) => state.lists.data);
  const [params] = useSearchParams();

  useEffect(
    function () {
      try {
        const newTaskInList = lists?.flatMap((all) => all.tasks);
        const combinedTask = allTask?.concat(newTaskInList);

        const set = new Set(combinedTask.map((task) => task.id));
        const allTask1 = Array.from(set, (id) =>
          combinedTask.find((task) => task.id === id)
        );

        dispatch({ type: 'allTask/addAllTask', payload: allTask1 });

        const days = params.get('task');

        switch (days) {
          case 'today':
            dispatch({ type: 'filterTask/today' });
            break;
          case 'tomorrow':
            dispatch({ type: 'filterTask/tomorrow' });
            break;
          case 'upcoming':
            dispatch({ type: 'filterTask/upcoming' });
            break;
          case 'all':
            dispatch({ type: 'filterTask/all' });
            break;
          default:
            break;
        }
      } catch (err) {
        throw new Error('Error in Dashboard Context ', err.message);
      }
    },
    [allTask, dispatch, lists, params]
  );

  return (
    <DashboardContext.Provider value={{ allTasks, dispatch, filterTasks }}>
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

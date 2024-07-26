import { createSlice } from '@reduxjs/toolkit';

const persistedTask = localStorage.getItem('tasks');
const persistedImpTask = localStorage.getItem('impTasks');
const persistedAllTask = localStorage.getItem('allTasks');

const initialState = {
  tasks: JSON.parse(persistedTask) || [],
  impTask: JSON.parse(persistedImpTask) || [],
  allTask: JSON.parse(persistedAllTask) || [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks(state, action) {
      state.tasks = [...state.tasks, action.payload];

      // Save tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    importantTask(state) {
      state.impTask = state.tasks.filter((task) => task.important === true);
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
    },

    allTask(state) {
      state.allTask = [...state.tasks];
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },

    deleteTask(state, action) {
      updateFunc(state, 'filter', (task) => task.id !== action.payload);
    },

    finishedTask(state, action) {
      updateFunc(state, 'map', (task) =>
        task.id === action.payload
          ? { ...task, finished: !task.finished }
          : task
      );
    },

    addDueDate(state, action) {
      const { taskId, dueDate } = action.payload;
      updateFunc(state, 'map', (task) =>
        task.id === taskId ? { ...task, dueDate: dueDate } : task
      );
    },

    addReminder(state, action) {
      const { taskId, date, time } = action.payload;
      updateFunc(state, 'forEach', (task) => {
        if (task.id === taskId) {
          task.remindDate = date;
          task.remindTime = time;
        }
      });
    },

    setReminder(state, action) {
      const { taskId } = action.payload;
      updateFunc(state, 'map', (task) =>
        task.id === taskId
          ? {
              ...task,
              reminder: !task.reminder,
            }
          : task
      );
    },

    deleteImpTask(state, action) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        impTask: state.impTask.filter((task) => task.id !== action.payload),
      };
    },

    markedImportantTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, important: !task.important }
          : task
      );
      state.allTask = state.allTask.map((task) =>
        task.id === action.payload
          ? { ...task, important: !task.important }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },

    addSubtask(state, action) {
      const { taskId, subtask } = action.payload;

      updateFunc(state, 'map', (task) =>
        task?.id === taskId
          ? {
              ...task,
              subtasks: [...(task.subtasks || []), subtask].slice(0, 3),
            }
          : task
      );
    },

    deleteSubTask(state, action) {
      const { taskId, deleteId } = action.payload;
      updateFunc(state, 'map', (task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.subTaskId !== deleteId
              ),
            }
          : task
      );
    },

    finishedSubTask(state, action) {
      const { taskId, finishedId } = action.payload;
      updateFunc(state, 'map', (task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.subTaskId === finishedId
                  ? {
                      ...subtask,
                      finished: !subtask.finished,
                    }
                  : subtask
              ),
            }
          : task
      );
    },

    addNotes(state, action) {
      const { taskId, notes } = action.payload;
      updateFunc(state, 'map', (task) =>
        task.id === taskId
          ? {
              ...task,
              notes: notes,
            }
          : task
      );
    },
  },
});

function updateFunc(state, funcType = 'map', func) {
  if (funcType === 'map') {
    state.tasks = state.tasks.map(func);
    state.impTask = state.impTask.map(func);
    state.allTask = state.allTask.map(func);
  } else if (funcType === 'filter') {
    state.tasks = state.tasks.filter(func);
    state.impTask = state.impTask.filter(func);
    state.allTask = state.allTask.filter(func);
  } else if (funcType === 'forEach') {
    state.tasks.forEach(func);
    state.impTask.forEach(func);
    state.allTask.forEach(func);
  }
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
  localStorage.setItem('impTasks', JSON.stringify(state.impTask));
  localStorage.setItem('allTasks', JSON.stringify(state.allTask));
}

export const selectTasks = (state) => state.tasks.tasks;

export const selectImpTask = (state) => state.tasks.impTask;

export const selectAllTask = (state) => state.tasks.allTask;

export const {
  addTasks,
  deleteTask,
  finishedTask,
  markedImportantTask,
  importantTask,
  deleteImpTask,
  finishedImpTask,
  allTask,
  addReminder,
  addSubtask,
  deleteSubTask,
  finishedSubTask,
  addNotes,
  setReminder,
  addDueDate,
} = taskSlice.actions;

export default taskSlice.reducer;

// state.tasks = state.tasks.map((task) =>
//   task.id === taskId
//     ? {
//         ...task,
//         subtasks: [...(task.subtasks || []), subtask].slice(0, 3),
//       }
//     : task
// );
// state.impTask = state.impTask.map((task) =>
//   task.id === taskId
//     ? {
//         ...task,
//         subtasks: [...(task.subtasks || []), subtask].slice(0, 3),
//       }
//     : task
// );
// state.allTask = state.allTask.map((task) =>
//   task.id === taskId
//     ? {
//         ...task,
//         subtasks: [...(task.subtasks || []), subtask].slice(0, 3),
//       }
//     : task
// );

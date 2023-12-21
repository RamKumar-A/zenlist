import { createSlice } from '@reduxjs/toolkit';

const persistedTask = localStorage.getItem('tasks');
const persistedImpTask = localStorage.getItem('impTasks');
const persistedAllTask = localStorage.getItem('allTasks');

const initialState = {
  tasks: persistedTask ? JSON.parse(persistedTask) : [],
  impTask: persistedImpTask ? JSON.parse(persistedImpTask) : [],
  allTask: persistedAllTask ? JSON.parse(persistedAllTask) : [],
};

const taskSlice = createSlice({
  name: 'task',
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
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.impTask = state.impTask.filter(
        (task) => task.id !== action.payload
      );
      state.allTask = state.allTask.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },

    finishedTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, finished: !task.finished }
          : task
      );
      state.impTask = state.impTask.map((task) =>
        task.id === action.payload
          ? { ...task, finished: !task.finished }
          : task
      );
      state.allTask = state.allTask.map((task) =>
        task.id === action.payload
          ? { ...task, finished: !task.finished }
          : task
      );

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },

    addDueDate(state, action) {
      const { taskId, dueDate } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, dueDate: dueDate } : task
      );
      state.impTask = state.impTask.map((task) =>
        task.id === taskId ? { ...task, dueDate: dueDate } : task
      );
      state.allTask = state.allTask.map((task) =>
        task.id === taskId ? { ...task, dueDate: dueDate } : task
      );

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },

    addReminder(state, action) {
      const { taskId, date, time } = action.payload;

      state.impTask.forEach((task) => {
        if (task.id === taskId) {
          task.remindDate = date;
          task.remindTime = time;
        }
      });
      state.tasks.forEach((task) => {
        if (task.id === taskId) {
          task.remindDate = date;
          task.remindTime = time;
        }
      });
      state.allTask.forEach((task) => {
        if (task.id === taskId) {
          task.remindDate = date;
          task.remindTime = time;
        }
      });

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));

      // state.tasks = state.tasks.map((task) =>
      //   task.id === taskId ? { ...task, date } : task
      // );
      //   // state.impTask = state.impTask.map((task) =>
      //   //   task.id === taskId ? { ...task, date } : task
      //   // );
      //   // state.allTask = state.allTask.map((task) =>
      //   //   task.id === taskId ? { ...task, date } : task
      //   // );
    },

    setReminder(state, action) {
      const { taskId } = action.payload;

      state.tasks = state.tasks.map((task) => {
        return task.id === taskId
          ? {
              ...task,
              reminder: !task.reminder,
            }
          : task;
      });
      state.impTask = state.impTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              reminder: !task.reminder,
            }
          : task
      );
      state.allTask = state.allTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              reminder: !task.reminder,
            }
          : task
      );

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
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

      state.tasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [...(task.subtasks || []), subtask].slice(0, 3),
            }
          : task
      );
      state.impTask = state.impTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [...(task.subtasks || []), subtask].slice(0, 3),
            }
          : task
      );
      state.allTask = state.allTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [...(task.subtasks || []), subtask].slice(0, 3),
            }
          : task
      );

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },

    deleteSubTask(state, action) {
      const { taskId, deleteId } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.subTaskId !== deleteId
              ),
            }
          : task
      );
      state.impTask = state.impTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.subTaskId !== deleteId
              ),
            }
          : task
      );
      state.allTask = state.allTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.subTaskId !== deleteId
              ),
            }
          : task
      );

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },

    finishedSubTask(state, action) {
      const { taskId, finishedId } = action.payload;
      state.tasks = state.tasks.map((task) =>
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
      state.impTask = state.impTask.map((task) =>
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
      state.allTask = state.allTask.map((task) =>
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

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },

    addNotes(state, action) {
      const { taskId, notes } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              notes: notes,
            }
          : task
      );
      state.impTask = state.impTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              notes: notes,
            }
          : task
      );
      state.allTask = state.allTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              notes: notes,
            }
          : task
      );

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('impTasks', JSON.stringify(state.impTask));
      localStorage.setItem('allTasks', JSON.stringify(state.allTask));
    },
  },
});

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

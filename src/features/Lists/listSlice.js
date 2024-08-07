import { createSlice } from '@reduxjs/toolkit';

// retreving list and its data in local storage (with the key: 'lists')

const persistedListTask = localStorage.getItem('lists');

const initialState = {
  data: JSON.parse(persistedListTask) || [
    {
      listId: 1,
      name: 'Personal',
      tasks: [],
    },
  ],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList(state, action) {
      const newListId = state.data.length + 1;
      state.data.push({
        listId: newListId,
        name: action.payload.name,
        tasks: [],
      });

      // storing list to localStorage
      localStorage.setItem('lists', JSON.stringify(state.data));
    },

    deleteList(state, action) {
      state.data = state.data.filter((list) => list.listId !== action.payload);
      // console.log(action.payload);
      // deleting list in localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    addTaskInList(state, action) {
      const { listId, tasks } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        const uniqueTasks = tasks.filter(
          (newTask) =>
            !list.tasks.find((existingTask) => existingTask.id === newTask.id)
        );
        list.tasks = [...list.tasks, ...uniqueTasks];
      }

      // storing data to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    deleteTaskInList(state, action) {
      const { listId, taskId } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== taskId);
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    finishedTaskInList(state, action) {
      const { listId, taskId } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              finished: !task.finished,
            };
          }
          return task;
        });
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data);.
      updateFunc(state);
    },

    importantTaskInList(state, action) {
      const { listId, taskId } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              important: !task.important,
            };
          }
          return task;
        });
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    addDueDateInList(state, action) {
      const { listId, taskId, dueDate } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              dueDate: dueDate,
            };
          }
          return task;
        });
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    addReminderInList(state, action) {
      const { listId, taskId, date, time } = action.payload;

      const list = state.data.find((list) => list.listId === listId);

      if (list) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              remindDate: date,
              remindTime: time,
            };
          }
          return task;
        });
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));/
      updateFunc(state);
    },

    setReminderInList(state, action) {
      const { listId, taskId } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.map((task) => {
          return task.id === taskId
            ? { ...task, reminder: !task.reminder }
            : task;
        });
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    addSubTaskInList(state, action) {
      const { listId, taskId, subtask } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: [...(task.subtasks || []), subtask].slice(0, 3),
              }
            : task
        );
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    finishedSubtasksInList(state, action) {
      const { listId, taskId, finishedId } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.map((task) =>
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
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    deleteSubtasksInList(state, action) {
      const { listId, taskId, deleteId } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: task.subtasks.filter(
                  (subtask) => subtask.subTaskId !== deleteId
                ),
              }
            : task
        );
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },

    addNotesInList(state, action) {
      const { listId, taskId, note } = action.payload;
      const list = state.data.find((list) => list.listId === listId);
      if (list) {
        list.tasks = list.tasks.map((task) => {
          return task.id === taskId
            ? {
                ...task,
                notes: note,
              }
            : task;
        });
      }

      //  updating tasks and its list to localStorage
      // localStorage.setItem('lists', JSON.stringify(state.data));
      updateFunc(state);
    },
  },
});

function updateFunc(state) {
  localStorage.setItem('lists', JSON.stringify(state.data));
}

export const {
  addList,
  deleteList,
  addTaskInList,
  deleteTaskInList,
  importantTaskInList,
  finishedTaskInList,
  addSubTaskInList,
  finishedSubtasksInList,
  deleteSubtasksInList,
  addNotesInList,
  addReminderInList,
  setReminderInList,
  addDueDateInList,
} = listSlice.actions;

export const getList = (state) => state.lists.data;

export default listSlice.reducer;

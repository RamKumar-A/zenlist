import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../src/features/Tasks/taskSlice';
import listReducer from './features/Lists/listSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    lists: listReducer,
  },
});

export default store;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTasks, allTask, importantTask } from '../features/Tasks/taskSlice';
import { addTaskInList } from '../features/Lists/listSlice';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

// const TIME_TO_ADD = 4 * 60 * 60 * 1000;

function TaskAddInput({ listid, important, list }) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const uniqueID = uuidv4();
  function numericTaskId() {
    const numericValue = parseInt(uniqueID.replace(/-/g, ''), 16);
    return numericValue;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const dueDate = new Date();
    toast.success('Task Added Successfully');
    const taskId = numericTaskId();

    // data that going to be used in entire website
    const locale = 'en-US';
    const newTask = {
      desc: value,
      id: taskId,
      finished: false,
      listId: listid || 1,
      important: important ? true : false,
      remindDate: format(new Date().toLocaleDateString(locale), 'dd/M/yyyy'),
      remindTime: new Date().toLocaleTimeString(locale),
      reminder: false,
      notes: '',
      subtasks: [],
      dueDate: format(new Date().toLocaleDateString(locale), 'dd/M/yyyy'),
      dueTime: dueDate.toLocaleTimeString(locale),
    };

    if (list) {
      dispatch(
        addTaskInList({
          listId: listid,
          tasks: [
            {
              ...newTask,
              id: numericTaskId(),
            },
          ],
        })
      );
    } else {
      dispatch(addTasks(newTask));
      dispatch(
        addTaskInList({
          listId: 1,
          tasks: [
            {
              ...newTask,
              id: numericTaskId(),
            },
          ],
        })
      );
      dispatch(importantTask());
      dispatch(allTask());
    }
    setValue('');
  }

  return (
    <form
      className="w-full px-2 h-full inset-0 absolute"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="+ Add Tasks"
        className="w-full border-2 border-gray-400 bg-gray-200 dark:bg-gray-900 text-gray-950 dark:text-gray-300 h-full pl-5  rounded-2xl outline-none font-medium"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </form>
  );
}

export default TaskAddInput;

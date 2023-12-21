import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSubtask } from '../features/Tasks/taskSlice';
import { addSubTaskInList } from '../features/Lists/listSlice';
import toast from 'react-hot-toast';

function SubtaskInput({ tasks }) {
  const { id, listId } = tasks;
  const [inpValue, setInpValue] = useState('');
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const generateSubtaskID = () => {
    setCounter((prevCounter) => prevCounter + 1);
    return counter;
  };

  function handleSubmit(e) {
    e.preventDefault();
    toast.success('Subtask added');

    const newSubtask = {
      subTaskId: generateSubtaskID(),
      desc: inpValue,
      finished: false,
      important: false,
    };

    dispatch(
      addSubTaskInList({ listId: listId, taskId: id, subtask: newSubtask })
    );
    dispatch(addSubtask({ taskId: id, subtask: newSubtask }));

    setInpValue('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-gray-950 dark:text-gray-200 w-full py-2 pt-4 flex items-center justify-center lg:pl-3 lg:justify-start  "
    >
      <input
        type="text"
        value={inpValue}
        onChange={(e) => setInpValue(e.target.value)}
        className=" w-[90%] bg-gray-200 dark:bg-gray-900 p-1 pl-5 border border-gray-500 dark:border-gray-900 outline-none rounded-lg sm:h-9 xl:w-1/2 "
        placeholder="Add some subtasks"
        required
      />
    </form>
  );
}

export default SubtaskInput;

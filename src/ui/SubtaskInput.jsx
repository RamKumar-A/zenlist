import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSubtask } from '../features/Tasks/taskSlice';
import { addSubTaskInList } from '../features/Lists/listSlice';
import toast from 'react-hot-toast';

function SubtaskInput({ tasks }) {
  const { id, listId, desc: addTo, subtasks } = tasks || {};
  const [inpValue, setInpValue] = useState('');
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const generateSubtaskID = () => {
    setCounter((prevCounter) => prevCounter + 1);
    return counter;
  };

  function handleSubmit(e) {
    e.preventDefault();

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
    toast.success(`Subtask added to ${addTo}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-gray-950 dark:text-gray-200 w-full  flex items-center justify-center  lg:justify-start p-1 "
    >
      <input
        type="text"
        value={inpValue}
        onChange={(e) => setInpValue(e.target.value)}
        className=" w-full bg-gray-200 dark:bg-gray-900 px-3 border border-gray-500 dark:border-gray-900 outline-none rounded text-sm py-1 xl:w-1/2 "
        placeholder="Add subtask"
        required
        disabled={subtasks?.length >= 3}
      />
    </form>
  );
}

export default SubtaskInput;

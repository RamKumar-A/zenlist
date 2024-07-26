import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotes } from '../features/Tasks/taskSlice';
import { addNotesInList } from '../features/Lists/listSlice';
import toast from 'react-hot-toast';

function NotesInput({ tasks, list, setToggleNotes }) {
  const { id, listId } = tasks;
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addNotesInList({ listId: listId, taskId: id, note: notes }));
    dispatch(addNotes({ taskId: id, notes: notes }));
    setToggleNotes(false);
    toast.success('Note Added');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  flex items-center justify-center  p-1 h-10 sm:h-14 lg:h-16 "
    >
      <input
        type="text"
        value={notes}
        className="w-full border sm:w-1/2 dark:bg-gray-800 dark:text-gray-300 h-full pl-2  border-blue-900 outline-none rounded-lg "
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add Notes"
      />
    </form>
  );
}

export default NotesInput;

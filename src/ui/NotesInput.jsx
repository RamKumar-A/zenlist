import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotes } from '../features/Tasks/taskSlice';
import { addNotesInList } from '../features/Lists/listSlice';

function NotesInput({ tasks, setToggleNotes, toggleNotes }) {
  const { id, listId } = tasks;
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addNotesInList({ listId: listId, taskId: id, note: notes }));
    dispatch(addNotes({ taskId: id, notes: notes }));
    setNotes('');
    setToggleNotes(!toggleNotes);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center  md:h-20">
      <input
        type="text"
        value={notes}
        className="w-full dark:bg-gray-800 dark:text-gray-300 h-8 pl-2 border border-blue-700 outline-none rounded-lg md:h-12 "
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add Notes"
      />
    </form>
  );
}

export default NotesInput;

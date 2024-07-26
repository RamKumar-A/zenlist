import { format, subDays } from 'date-fns';
import { useState } from 'react';
import { addDueDateInList } from '../features/Lists/listSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css//
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useDispatch } from 'react-redux';
import { addDueDate } from '../features/Tasks/taskSlice';
import toast from 'react-hot-toast';

function AddDueDate({ listId, id }) {
  const dispatch = useDispatch();
  const [selectedDateVal, setSelectedDateVal] = useState(new Date());

  function handleSubmitDueDate(e) {
    e.preventDefault();
    dispatch(
      addDueDateInList({
        listId: listId,
        taskId: id,
        dueDate: format(selectedDateVal, 'dd/M/yyyy'),
      })
    );
    dispatch(
      addDueDate({ taskId: id, dueDate: format(selectedDateVal, 'dd/M/yyyy') })
    );
    toast.success('Due date added');
  }

  return (
    <form
      className="px-2 flex items-center  gap-2 sm:gap-4"
      onSubmit={handleSubmitDueDate}
    >
      <DatePicker
        selected={selectedDateVal}
        onChange={(date) => setSelectedDateVal(date)}
        dateFormat="dd/M/yyyy"
        minDate={subDays(new Date(), 0)}
        className="dark:bg-gray-800 dark:text-gray-300 my-2 p-1 pl-3 border border-blue-700 rounded "
        placeholderText="Select Due Date"
        withPortal
        portalId="custom-datepicker-portal"
        required
      />
      <button type="submit" className="bg-blue-700 text-gray-300 px-1 rounded">
        Add
      </button>
    </form>
  );
}

export default AddDueDate;

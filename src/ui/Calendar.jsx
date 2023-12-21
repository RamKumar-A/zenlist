import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { format, subDays } from 'date-fns';
import DatePicker from 'react-datepicker';
// CSS Modules, react-datepicker-cssmodules.css//
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { addReminder } from '../features/Tasks/taskSlice';
import { addReminderInList } from '../features/Lists/listSlice';

function Calendar({ id, listId, setCalendarClose }) {
  // const date = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  // const [timeInput, setTimeInput] = useState(selectedTime.toLocaleTimeString());
  const dispatch = useDispatch();
  // console.log(selectedTime);
  function handleSubmit(e) {
    e.preventDefault();
    setCalendarClose((close) => !close);
    dispatch(
      addReminderInList({
        taskId: id,
        listId: listId,
        date: format(selectedDate, 'dd/M/yyyy'),
        time: format(selectedTime, 'h:mm a'),
      })
    );
    dispatch(
      addReminder({
        taskId: id,
        date: format(selectedDate, 'dd/M/yyyy'),
        time: format(selectedTime, 'h:mm a'),
      })
    );
  }

  return (
    <form action="" onSubmit={handleSubmit} className="w-full h-48 grid gap-5 ">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/M/yyyy"
        minDate={subDays(new Date(), 0)}
        className={` dark:bg-gray-800 dark:text-gray-300 my-2 p-1 pl-3 border border-blue-700 rounded `}
        popperPlacement="bottom-end"
        withPortal
        id="datepicker"
        portalId="custom-datepicker-portal"
        required
      />

      <DatePicker
        selected={selectedTime}
        onChange={(time) => setSelectedTime(time)}
        className="dark:bg-gray-800 dark:text-gray-300 my-2 p-1 pl-3 rounded border border-blue-700 "
        showTimeSelect
        showTimeSelectOnly
        timeCaption="Time"
        dateFormat="h:mm a"
        timeIntervals={1}
        timeInputLabel="Time"
        placeholderText="add time"
        withPortal
        id="timepicker"
        portalId="custom-timepicker-portal"
        required
      />

      <div className="text-center">
        <button
          className="bg-blue-700 text-stone-50  px-3 py-1  rounded"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default Calendar;

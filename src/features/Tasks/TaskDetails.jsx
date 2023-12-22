import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiOutlinePlusCircle, HiTrash } from 'react-icons/hi2';

import Calendar from '../../ui/Calendar';
import AddDueDate from '../../ui/AddDueDate';

import NotesInput from '../../ui/NotesInput';
import SubtaskTemplate from '../../ui/SubtaskTemplate';
import SubtaskInput from '../../ui/SubtaskInput';
import CalendarModal from '../../context/CalendarModal';
import CommonModal from '../../context/CommonModal';

import {
  deleteTaskInList,
  finishedTaskInList,
  setReminderInList,
} from '../Lists/listSlice';

import {
  deleteTask,
  finishedTask,
  selectAllTask,
  selectImpTask,
  selectTasks,
  setReminder,
} from './taskSlice';

function convertDate(date = '01/01/2070', time = '00:00') {
  const [day, month, year] = date?.split('/');
  const converted = new Date(`${year}-${month}-${day} ${time}`);
  return converted;
}

function TaskDetails({ details, allTask, list, imp, todayTask }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [toggleNotes, setToggleNotes] = useState(false);
  const [calendarClose, setCalendarClose] = useState(false);

  const allTaskDetails = useSelector(selectAllTask);
  const impTaskDetails = useSelector(selectImpTask);
  const selectedList = useSelector((state) => state.lists.data);
  const allListTasks = selectedList.flatMap((task) => task.tasks);
  const todayTasks = useSelector(selectTasks);

  let tasks;

  if (list) {
    tasks = allListTasks.find((task) => task.id === details.id);
  } else if (allTask) {
    tasks =
      allTaskDetails.find((task) => task.id === details.id) ||
      allListTasks.find((task) => task.id === details.id);
  } else if (todayTask) {
    tasks = todayTasks.find((task) => task.id === details.id);
  } else if (imp) {
    tasks =
      impTaskDetails.find((task) => task.id === details.id) ||
      allListTasks.find((task) => task.id === details.id);
  } else {
    if (!tasks) throw new Error('No Task found');
  }

  const { remindDate, remindTime, dueDate, notes, subtasks } = tasks || {};

  const convertedRemindDate = convertDate(remindDate, remindTime);

  const month = convertedRemindDate?.toLocaleDateString('en-US', {
    month: 'short',
  });
  const hrs = convertedRemindDate?.getHours();
  const convertedHrs = String(hrs > 12 ? hrs - 12 : hrs).padStart(2, '0');
  const mins = convertedRemindDate?.getMinutes();
  const convertedMins = String(mins).padStart(2, '0');
  const len = Object.keys(details).length;

  function handleReminder() {
    dispatch(setReminder({ taskId: tasks?.id }));
    dispatch(setReminderInList({ listId: tasks?.listId, taskId: tasks?.id }));
  }

  function handleFinished() {
    dispatch(finishedTask(tasks?.id));
    dispatch(finishedTaskInList({ listId: tasks?.listId, taskId: tasks?.id }));
  }

  function handleDelete() {
    dispatch(deleteTask(tasks?.id));
    dispatch(deleteTaskInList({ listId: tasks?.listId, taskId: tasks?.id }));
  }

  return (
    <div
      className={`px-2 relative sm:m-5 ${
        tasks?.finished && 'opacity-90 pointer-events-none'
      } ${len < 0 && 'hidden'} `}
    >
      <CalendarModal>
        <header className="flex items-center justify-between gap-2 ">
          <div className="text-xs font-extralight sm:text-xs">
            Mylist &#12297;{params?.list || 'Personal'}
          </div>
          <div className="text-sm flex sm:text-lg sm:gap-2 ">
            <span
              onClick={handleFinished}
              className={`cursor-pointer ${
                tasks?.finished && 'pointer-events-auto visible text-green-500 '
              } `}
            >
              {tasks?.finished ? <BsCheckCircleFill /> : <BsCircle />}
            </span>
            <span onClick={handleDelete} className="cursor-pointer">
              {<HiTrash />}
            </span>
          </div>
        </header>
        <div className="pt-2">
          <span className="text-lg py-2 font-bold xl:text-2xl xl:pt-5">
            {tasks?.desc}
          </span>
        </div>
        {/* Calender */}
        <section className="pb-5">
          <div className="h-20 flex items-center sm:gap-3">
            <div className=" w-full">
              <div className="flex items-center gap-2">
                <CalendarModal.Open opens="calendar-open">
                  <div className="flex gap-2 ">
                    <span className="text-xs px-1 font-bold border border-gray-200 rounded tracking-widest lg:font-semibold xl:text-sm xl:py-2 lg:shadow-sm lg:shadow-blue-800 ">
                      {`${month || 'JAN'} ${
                        convertedRemindDate?.getDate() || '01'
                      }, ${convertedRemindDate?.getFullYear() || '2023'}`}
                    </span>
                    <span className="text-xs px-1 font-bold border border-gray-200 tracking-widest lg:font-semibold xl:text-sm xl:py-2 lg:shadow-sm lg:shadow-blue-800 rounded">
                      {`${convertedHrs || '12'}:${convertedMins || '00'} ${
                        hrs < 12 ? 'AM' : 'PM' || ''
                      }`}
                    </span>
                  </div>
                </CalendarModal.Open>
                <span
                  className={`text-sm text-stone-50 px-2 py-1 font-semibold rounded-full cursor-pointer  ${
                    tasks?.reminder ? 'bg-red-700' : 'bg-gray-500'
                  }`}
                  onClick={handleReminder}
                >
                  {tasks?.reminder ? 'Off' : 'On'}
                </span>
              </div>
            </div>
            <CalendarModal.Window
              name="calendar-open"
              calendarClose={calendarClose}
              setCalendarClose={setCalendarClose}
            >
              <Calendar
                id={tasks?.id}
                list={list}
                listId={tasks?.listId}
                setCalendarClose={setCalendarClose}
              />
            </CalendarModal.Window>
          </div>

          <div className="xl:py-5">
            <CalendarModal.Open opens="due-date-open">
              <div className="flex items-center gap-5">
                <span className="text-xs px-1 tracking-widest font-bold border border-gray-200 lg:font-semibold xl:text-sm   xl:py-2 lg:shadow-sm lg:shadow-blue-800">
                  {dueDate || 'JAN 01, 2023'}
                </span>
                <h1 className="font-semibold uppercase lg:text-normal cursor-pointer">
                  Add Due Date
                </h1>
              </div>
            </CalendarModal.Open>
            <CalendarModal.Window
              name="due-date-open"
              calendarClose={calendarClose}
              setCalendarClose={setCalendarClose}
            >
              <AddDueDate
                listId={tasks?.listId}
                list={list}
                id={tasks?.id}
                setCalendarClose={setCalendarClose}
              />
            </CalendarModal.Window>
          </div>
        </section>

        <CommonModal>
          {/* Notes */}
          <section>
            <div>
              <CommonModal.Open opens="notes-open">
                <h1 className="font-medium uppercase xl:font-semibold flex items-center gap-x-2 cursor-pointer">
                  <span>Notes</span>
                  {notes?.length === 0 && (
                    <span
                      className=""
                      onClick={() => setToggleNotes(!toggleNotes)}
                    >
                      <HiOutlinePlusCircle />
                    </span>
                  )}
                </h1>
              </CommonModal.Open>
            </div>
            <span
              className="text-sm p-3 pl-5 font-semibold capitalize"
              onClick={() => setToggleNotes(!toggleNotes)}
            >
              {notes}
            </span>
            <CommonModal.Window name="notes-open">
              <NotesInput
                tasks={tasks}
                list={list}
                toggleNotes={toggleNotes}
                setToggleNotes={setToggleNotes}
              />
            </CommonModal.Window>
          </section>
          {/* Subtasks */}
          <section className="pb-3 relative sm:py-2  ">
            <h1 className="uppercase sm:py-2 lg:text-normal xl:font-semibold ">
              Subtasks{' '}
              <span className="text-xs lowercase font-light ">( max 3 )</span>
            </h1>
            {subtasks?.length > 0 && (
              <ul className="rounded-xl sm:px-3 ">
                {subtasks.map((st, i) => (
                  <li className="py-2" key={i}>
                    <SubtaskTemplate st={st} tasks={tasks} list={list} />
                  </li>
                ))}
              </ul>
            )}
            <SubtaskInput tasks={tasks || {}} />
          </section>
        </CommonModal>
      </CalendarModal>
    </div>
  );
}

export default TaskDetails;

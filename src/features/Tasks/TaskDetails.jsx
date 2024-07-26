import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import {
  HiOutlineExclamationCircle,
  HiOutlinePlusCircle,
  HiTrash,
} from 'react-icons/hi2';

import Calendar from '../../ui/Calendar';
import AddDueDate from '../../ui/AddDueDate';

import NotesInput from '../../ui/NotesInput';
import SubtaskTemplate from '../../ui/SubtaskTemplate';
import SubtaskInput from '../../ui/SubtaskInput';
import CalendarModal from '../../context/CalendarModal';

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
import InputModal from '../../context/InputModal';
import DeleteTask from '../../ui/DeleteTask';

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
  // const len = Object.keys(details).length;

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
      className={`w-full px-2 lg:px-4 relative p-3 sm:space-y-2 ${
        tasks?.finished && 'opacity-70 pointer-events-none'
      }  ${tasks || 'pointer-events-none'}`}
    >
      <CalendarModal>
        <header className="flex items-center justify-between gap-2 py-2  ">
          <div className="text-xs font-extralight sm:text-xs">
            Mylist &#12297;{params?.list || 'Personal'}
          </div>
          <div className="text-sm flex gap-2 ">
            <span
              onClick={handleFinished}
              className={`cursor-pointer ${
                tasks?.finished && 'pointer-events-auto visible text-green-500 '
              } `}
            >
              {tasks?.finished ? <BsCheckCircleFill /> : <BsCircle />}
            </span>
            <InputModal>
              <InputModal.Open opens="delete-task-details">
                <span
                  // onClick={handleDelete}
                  className="cursor-pointer hover:text-red-500"
                >
                  <HiTrash />
                </span>
              </InputModal.Open>
              <InputModal.Window name="delete-task-details">
                <DeleteTask handler={handleDelete} />
              </InputModal.Window>
            </InputModal>
          </div>
        </header>
        <h1 className="flex items-center gap-2 py-4 text-lg ">
          <span className="text-xl tracking-wider font-bold">
            {tasks?.desc || 'Click the task to view'}{' '}
          </span>
          {tasks?.important && (
            <span className="bg-orange-400 rounded-full text-white  ">
              <HiOutlineExclamationCircle className=" " size={14} />
            </span>
          )}
        </h1>
        {/* Calender */}
        <section className="space-y-4 py-2 ">
          <div className="flex items-center gap-3">
            <CalendarModal.Open opens="calendar-open">
              <div className="flex gap-2 ">
                <span className="text-xs xl:p-2 p-1 font-medium border border-gray-200 rounded tracking-widest">
                  {`${month || 'JAN'} ${
                    convertedRemindDate?.getDate() || '01'
                  }, ${convertedRemindDate?.getFullYear() || '2023'}`}
                </span>
                <span className="text-xs xl:p-2 p-1 font-medium border border-gray-200 tracking-widest rounded">
                  {`${convertedHrs || '12'}:${convertedMins || '00'} ${
                    hrs < 12 ? 'AM' : 'PM' || ''
                  }`}
                </span>
              </div>
            </CalendarModal.Open>
            <span
              className={`text-xs xl:p-2 px-2 py-0.5 text-blue-50 font-semibold rounded cursor-pointer  ${
                tasks?.reminder ? 'bg-red-700' : 'bg-blue-600'
              }`}
              onClick={handleReminder}
            >
              {tasks?.reminder ? 'Turn Off' : 'Turn On'}
            </span>
            <CalendarModal.Window name={'calendar-open'}>
              <Calendar id={tasks?.id} list={list} listId={tasks?.listId} />
            </CalendarModal.Window>
          </div>

          <CalendarModal.Open opens="due-date-open">
            <h1 className="flex items-center gap-3 w-fit ">
              <span className="text-xs  tracking-widest font-medium border border-gray-200 xl:p-2 p-1 ">
                {dueDate || 'JAN 01, 2023'}
              </span>
              <span className="font-medium   cursor-pointer text-sm xl:p-2">
                Add due date
              </span>
            </h1>
          </CalendarModal.Open>
          <CalendarModal.Window name={'due-date-open'}>
            <AddDueDate
              listId={tasks?.listId}
              list={list}
              id={tasks?.id}
              calendarClose={calendarClose}
              setCalendarClose={setCalendarClose}
            />
          </CalendarModal.Window>
        </section>

        <InputModal>
          {/* Notes */}
          <section className="py-3 space-y-2">
            <InputModal.Open opens="notes-open">
              <h1 className="font-medium capitalize flex items-center gap-2 cursor-pointer text-md">
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
            </InputModal.Open>
            <span
              className="text-sm line-clamp-1  capitalize"
              onClick={() => setToggleNotes(!toggleNotes)}
            >
              {notes}
            </span>
            <InputModal.Window name="notes-open">
              <NotesInput
                tasks={tasks}
                list={list}
                setToggleNotes={setToggleNotes}
              />
            </InputModal.Window>
          </section>
          {/* Subtasks */}
          <section className=" relative space-y-2 ">
            <h1 className="capitalize py-1 text-md font-medium ">
              Subtasks <span className="text-xs lowercase ">(max 3)</span>
            </h1>
            {subtasks?.length > 0 && (
              <ul className="p-1 space-y-2 sm:space-y-3">
                {subtasks.map((st, i) => (
                  // <li className="" key={i}>
                  <SubtaskTemplate st={st} tasks={tasks} list={list} key={i} />
                  // </li>
                ))}
              </ul>
            )}
            <SubtaskInput tasks={tasks || {}} />
          </section>
        </InputModal>
      </CalendarModal>
    </div>
  );
}

export default TaskDetails;

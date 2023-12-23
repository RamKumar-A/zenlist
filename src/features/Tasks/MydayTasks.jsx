import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {
  HiBellAlert,
  HiMiniExclamationCircle,
  HiOutlineExclamationCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { BsCircle, BsCheckCircleFill } from 'react-icons/bs';
import { FaCodeBranch } from 'react-icons/fa6';

import {
  deleteTask,
  finishedTask,
  markedImportantTask,
  importantTask,
  selectTasks,
} from './taskSlice';

import {
  deleteTaskInList,
  finishedTaskInList,
  importantTaskInList,
} from '../Lists/listSlice';

import TaskDetails from './TaskDetails';
import DetailsModal from '../../context/DetailsModal';

function MydayTasks() {
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();
  const tasks1 = useSelector(selectTasks);
  const tasks = [...tasks1].sort((a, b) => {
    if (a.finished && !b.finished) return 1;
    if (!a.finished && b.finished) return -1;
    return 0;
  });

  function handleDelete(list) {
    toast.error('Task Removed ');
    dispatch(deleteTask(list.id));
    dispatch(deleteTaskInList({ listId: list.listId, taskId: list.id }));
  }

  function handleDetails(list) {
    setDetails(list);
  }

  function handleFinished(list) {
    if (!list.finished) toast.success('Congrats on finishing task');
    dispatch(finishedTask(list.id));
    dispatch(finishedTaskInList({ listId: list.listId, taskId: list.id }));
  }

  function handleImportant(list) {
    if (!list.important) toast.success('Task Marked as important');
    dispatch(markedImportantTask(list.id));
    dispatch(importantTask());
    dispatch(
      importantTaskInList({
        listId: list.listId,
        taskId: list.id,
      })
    );
  }

  return (
    <ul className="text-gray-950 dark:text-gray-200 px-5 mt-2 ">
      <DetailsModal>
        {tasks.map((list, i) => (
          <li
            role="button"
            tabIndex={0}
            key={`list-${i}-${list.id}`}
            className={`flex p-2  gap-2 items-center justify-between h-[4.5rem] px-5 border-b border-gray-400 mb-2 cursor-pointer shadow-lg hover:shadow-gray-800 bg-gray-100 dark:bg-gray-950 text-gray-950 dark:text-gray-200 sm:pt-5
                 dark:border-gray-900  ${
                   list.finished &&
                   'bg-gray-300 dark:bg-gray-700 border-none rounded-xl shadow-none'
                 }`}
            onClick={() => handleDetails(list)}
          >
            <span className=" sm:text-2xl" onClick={() => handleFinished(list)}>
              {' '}
              {list.finished ? (
                <BsCheckCircleFill className="text-green-500" />
              ) : (
                <BsCircle className="" />
              )}
            </span>

            <DetailsModal.Open opens="open-details">
              <div className="w-full">
                <span
                  className={`sm:text-xl ${list.finished && 'line-through '}`}
                >
                  {list.desc}
                </span>
                <div className="pl-1.5 pt-1 flex items-center gap-3 text-xs">
                  {list.reminder && (
                    <span className="hidden lg:flex items-center">
                      <HiBellAlert className="text-red-700" />
                      <p>{list?.dueDate}</p>
                    </span>
                  )}
                  {list?.subtasks?.length > 0 && (
                    <span className="subtaskLengthSpan">
                      <FaCodeBranch className="opacity-70 -rotate-90" />
                      <p>
                        <span>
                          {
                            list.subtasks.filter(
                              (task) => task.finished === true
                            ).length
                          }
                        </span>{' '}
                        / <span>{list?.subtasks?.length}</span>
                      </p>
                    </span>
                  )}
                </div>
              </div>
            </DetailsModal.Open>
            <span
              onClick={() => handleImportant(list)}
              className={`${list.finished ? 'hidden' : 'sm:text-2xl pr-2'}`}
            >
              {list.important ? (
                <HiMiniExclamationCircle className=" important" />
              ) : (
                <HiOutlineExclamationCircle className="notImportant" />
              )}
            </span>
            <span onClick={() => handleDelete(list)} className="deleteTask">
              <HiOutlineXMark />
            </span>
          </li>
        ))}
        <DetailsModal.Window name="open-details" todayTasks>
          <div className="">
            <TaskDetails
              details={details || {}}
              todayTask={true}
              allTask={false}
              list={false}
              imp={false}
            />
          </div>
        </DetailsModal.Window>
      </DetailsModal>
    </ul>
  );
}

export default MydayTasks;

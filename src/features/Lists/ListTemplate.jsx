import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { FaCodeBranch } from 'react-icons/fa6';
import toast from 'react-hot-toast';

import {
  HiBellAlert,
  HiMiniExclamationCircle,
  HiOutlineExclamationCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';

import TaskDetails from '../Tasks/TaskDetails';
import TaskAddInput from '../../ui/TaskAddInput';
import DetailsModal from '../../context/DetailsModal';

import {
  deleteTaskInList,
  finishedTaskInList,
  importantTaskInList,
} from './listSlice';

import {
  deleteTask,
  finishedTask,
  importantTask,
  markedImportantTask,
} from '../Tasks/taskSlice';
import Error from '../../ui/Error';
// import ToolTip from '../../ui/ToolTip';

function ListTemplate() {
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const lists = useSelector((state) => state.lists.data);
  const listName = params.list;
  const selectedList1 = lists.find((list) => list.name === listName);
  const selectedList2 = selectedList1 ? selectedList1.tasks : [];

  const selectedList = [...selectedList2]?.sort((a, b) => {
    if (a.finished && !b.finished) {
      return 1;
    }
    if (!a.finished && b.finished) {
      return -1;
    }
    return 0;
  });

  function handleFinished(task) {
    toast.success('Congrats for finishing your task');
    dispatch(finishedTask(task.id));
    dispatch(finishedTaskInList({ taskId: task.id, listId: task.listId }));
  }

  function handleDelete(task) {
    toast.error('Task removed Successfully');

    dispatch(
      deleteTaskInList({
        listId: task.listId,
        taskId: task.id,
      })
    );
    dispatch(deleteTask(task.id));
  }

  function handleImportant(task) {
    toast.error('Task marked as Important');

    dispatch(markedImportantTask(task.id));
    dispatch(importantTask());
    dispatch(
      importantTaskInList({
        listId: task.listId,
        taskId: task.id,
      })
    );
  }

  function handleDetails(task) {
    setDetails(task);
  }

  if (!selectedList) return <Error />;

  return (
    <div>
      <header className="bg-gray-100 dark:bg-gray-950 dark:text-gray-300 text-xl mx-5 my-5 px-5 py-3 rounded-full sm:text-2xl lg:w-[46%] ">
        <h1 className="px-5 font-semibold">{selectedList1.name}</h1>
      </header>

      <section className="w-full">
        <DetailsModal>
          <div className="w-full px-5 flex items-center justify-center gap-4 ">
            <div className=" w-full h-full bg-gray-100 dark:bg-gray-950 rounded-2xl sm:w-[40%] md:w-full lg:w-1/2 xl:w-1/2">
              <div className="h-10 bg-blue-700 mx-2 my-3 rounded-full relative sm:h-14 sm:flex items-center justify-center ">
                <TaskAddInput list={true} listid={selectedList1?.listId} />
              </div>
              <div className="overflow-y-auto sm:h-[550px] mb-2">
                <ul className="text-gray-950 dark:text-gray-200 px-5">
                  {selectedList.map((task, i) => (
                    // <li className="sm:pt-5" key={task.id}>
                    <li
                      role="button"
                      tabIndex={0}
                      key={task.id}
                      className={`h-[4.5rem] mb-2 p-2 px-5 shadow-lg border-b border-gray-400 dark:border-gray-900  hover:shadow-gray-800 flex gap-2 items-center justify-between cursor-pointer sm:pt-5 ${
                        task.finished &&
                        'bg-gray-300 dark:bg-gray-700 border-none rounded-xl shadow-none'
                      }`}
                      onClick={() => handleDetails(task)}
                    >
                      <span
                        className="text-2xl"
                        onClick={() => handleFinished(task)}
                      >
                        {/* Optional Feature but not using now */}

                        {/* <ToolTip content={'Mark as finished'}> */}
                        {task.finished ? (
                          <BsCheckCircleFill className="text-green-500" />
                        ) : (
                          <BsCircle />
                        )}
                        {/* </ToolTip> */}
                      </span>
                      <DetailsModal.Open opens="todayTask-open">
                        <div className="w-full">
                          <span
                            className={`sm:text-xl   ${
                              task.finished && 'line-through '
                            }`}
                          >
                            {task.desc}
                          </span>
                          <div className="text-xs pt-1 pl-1.5  lg:flex items-center gap-3 ">
                            {task.reminder && (
                              <span className="hidden lg:flex items-center">
                                <HiBellAlert className="text-red-700" />
                                <p>{task?.dueDate}</p>
                              </span>
                            )}
                            {task.subtasks.length > 0 && (
                              <span className="text-[10px] font-extralight flex items-center gap-1 lg:text-xs ">
                                <FaCodeBranch className="opacity-70 -rotate-90" />
                                <p>
                                  <span>
                                    {
                                      task.subtasks.filter(
                                        (task) => task.finished === true
                                      ).length
                                    }
                                  </span>{' '}
                                  / <span>{task.subtasks.length}</span>
                                </p>
                              </span>
                            )}
                          </div>
                        </div>
                      </DetailsModal.Open>

                      <span
                        onClick={() => handleImportant(task)}
                        className={`${
                          task.finished ? 'hidden' : 'pr-2 sm:text-2xl '
                        }`}
                      >
                        {/* Optional Feature but not using now */}
                        {/* <ToolTip content="Mark as Imp"> */}
                        {task.important ? (
                          <HiMiniExclamationCircle className=" bg-gray-950 text-yellow-400 rounded-full hover:rotate-[360deg] duration-500" />
                        ) : (
                          <HiOutlineExclamationCircle className="  rounded-full hover:rotate-[360deg] duration-500" />
                        )}
                        {/* </ToolTip> */}
                      </span>
                      <span
                        onClick={() => handleDelete(task)}
                        className="text-sm p-0.5 rounded-full sm:text-xl hover:bg-red-600 hover:text-gray-300 hover:rotate-180 transition-transform duration-500 "
                      >
                        <HiOutlineXMark />
                      </span>
                    </li>
                    // </li>
                  ))}
                </ul>
              </div>

              {/* <div className="h-10 bg-blue-700 mx-2 my-3 rounded-full relative sm:h-14 sm:flex items-center justify-center ">
                <TaskAddInput list={true} listid={selectedList1?.listId} />
              </div> */}
            </div>
            {selectedList1?.tasks.length > 0 && (
              <div className="hidden h-[620px] bg-gray-300 dark:bg-gray-900 dark:text-gray-300 rounded-2xl lg:block xl:w-1/2">
                <TaskDetails details={details || {}} list={true} />
              </div>
            )}

            <DetailsModal.Window name="todayTask-open">
              <TaskDetails details={details || {}} list={true} />
            </DetailsModal.Window>
          </div>
        </DetailsModal>
      </section>
    </div>
  );
}

export default ListTemplate;

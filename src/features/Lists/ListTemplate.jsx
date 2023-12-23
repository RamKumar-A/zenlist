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
    if (!task.finished) toast.success('Congrats on finishing task');
    dispatch(finishedTask(task.id));
    dispatch(finishedTaskInList({ taskId: task.id, listId: task.listId }));
  }

  function handleDelete(task) {
    toast.error('Task Removed ');
    dispatch(
      deleteTaskInList({
        listId: task.listId,
        taskId: task.id,
      })
    );
    dispatch(deleteTask(task.id));
  }

  function handleImportant(task) {
    if (!task.important) toast.success('Task Marked as Important');

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
    <div className="grid h-[100vh] grid-rows-[1fr_auto] items-center">
      <header className="bg-gray-100 dark:bg-gray-950 dark:text-gray-300 text-xl mx-5 sm:my-3 px-5 py-3 rounded-full sm:text-2xl lg:w-[46%] ">
        <h1 className="px-5 font-semibold">{selectedList1.name}</h1>
      </header>

      <section className="w-full mb-5 sm:mb-4">
        <div className="w-full px-5 flex items-center justify-center gap-4 ">
          <DetailsModal>
            <div className=" w-full mb-1 grid h-[80dvh] sm:h-full grid-rows-[1fr_auto] bg-gray-100 dark:bg-gray-950 rounded-2xl sm:w-[40%] md:w-full lg:w-1/2 xl:w-1/2">
              {/* <div className="h-10 bg-blue-700 mx-2 my-2 rounded-full relative top-1 sm:h-14 sm:flex items-center justify-center ">
                <TaskAddInput list={true} listid={selectedList1?.listId} />
              </div> */}
              <div className="overflow-y-auto sm:h-[550px] mb-2">
                <ul className="text-gray-950 dark:text-gray-200 px-5">
                  {selectedList.map((task, i) => (
                    <li className="sm:pt-5" key={task.id}>
                      <div
                        role="button"
                        tabIndex={0}
                        key={task.id}
                        className={`taskDiv
                        
                        ${
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
                                <span className="subtaskLengthSpan ">
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
                            <HiMiniExclamationCircle
                              className="important
                            
                            "
                            />
                          ) : (
                            <HiOutlineExclamationCircle className=" notImportant" />
                          )}
                          {/* </ToolTip> */}
                        </span>
                        <span
                          onClick={() => handleDelete(task)}
                          className="deleteTask"
                        >
                          <HiOutlineXMark />
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="taskAddInputDiv">
                <TaskAddInput list={true} listid={selectedList1?.listId} />
              </div>
            </div>
            {selectedList1?.tasks.length > 0 && (
              <div className="hidden h-[620px] bg-gray-300 dark:bg-gray-900 dark:text-gray-300 rounded-2xl lg:block xl:w-1/2">
                <TaskDetails details={details || {}} list={true} />
              </div>
            )}

            <DetailsModal.Window name="todayTask-open">
              <TaskDetails details={details || {}} list={true} />
            </DetailsModal.Window>
          </DetailsModal>
        </div>
      </section>
    </div>
  );
}

export default ListTemplate;

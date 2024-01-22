import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  HiBellAlert,
  HiMiniExclamationCircle,
  HiOutlineExclamationCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { FaCodeBranch } from 'react-icons/fa6';
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';

import TaskAddInput from '../../ui/TaskAddInput';
import {
  deleteTaskInList,
  finishedTaskInList,
  importantTaskInList,
} from '../Lists/listSlice';

import {
  selectAllTask,
  deleteTask,
  finishedTask,
  markedImportantTask,
  importantTask,
} from './taskSlice';

import TaskDetails from './TaskDetails';
import DetailsModal from '../../context/DetailsModal';
import DeleteTask from '../../ui/DeleteTask';
import DeleteModal from '../../context/DeleteModal';

function AllTasks() {
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();
  const allTask = useSelector(selectAllTask);
  const lists = useSelector((state) => state.lists.data);

  const newTaskInList = lists.flatMap((all) => all.tasks);
  const combinedTask = allTask.concat(newTaskInList);
  const set = new Set(combinedTask.map((task) => task.id));
  const allTasks1 = Array.from(set, (id) =>
    combinedTask.find((task) => task.id === id)
  );

  const allTasks = [...allTasks1]?.sort((a, b) => {
    if (a.finished && !b.finished) {
      return 1;
    }
    if (!a.finished && b.finished) {
      return -1;
    }
    return 0;
  });

  function handleFinished(list) {
    if (!list.finished) toast.success('Congrats on finishing task');
    dispatch(finishedTask(list.id));
    dispatch(finishedTaskInList({ listId: list.listId, taskId: list.id }));
  }

  function handleDelete(list) {
    toast.error('Task Removed ');
    dispatch(deleteTaskInList({ listId: list.listId, taskId: list.id }));
    dispatch(deleteTask(list.id));
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

  function handleDetails(list) {
    setDetails(list);
  }

  return (
    <div className="w-full mb-5 sm:mb-4">
      <DetailsModal>
        <div className=" w-full px-5 flex items-center justify-center gap-4">
          <div className=" w-full sm:h-full grid h-[80dvh] grid-rows-[1fr_auto] mb-1 bg-gray-100 dark:bg-gray-950 rounded-2xl sm:w-[40%] md:w-full lg:w-1/2 xl:w-1/2">
            <div className="overflow-y-auto sm:h-[550px] mb-2">
              <ul className="text-gray-950 dark:text-gray-200 px-5 ">
                {allTasks.map((list, i) => (
                  <li className="sm:pt-5 " key={`list-${i}-${list.id}`}>
                    <div
                      role="button"
                      tabIndex={0}
                      className={`taskDiv
                      
                      ${
                        list.finished &&
                        'bg-gray-300 dark:bg-gray-700 border-none rounded-xl shadow-none'
                      }  `}
                      onClick={() => handleDetails(list)}
                    >
                      <span
                        className=" sm:text-2xl "
                        onClick={() => handleFinished(list)}
                      >
                        {list.finished ? (
                          <BsCheckCircleFill className="text-green-500 " />
                        ) : (
                          <BsCircle className="" />
                        )}
                      </span>
                      <DetailsModal.Open opens="alltask-open">
                        <div className="w-full">
                          <h1
                            className={`sm:text-lg ${
                              list.finished && 'line-through '
                            }`}
                          >
                            {list.desc}
                          </h1>
                          <div className="text-xs pt-1 pl-1.5  lg:flex items-center gap-3 ">
                            {list.reminder && (
                              <span className="hidden lg:flex items-center">
                                <HiBellAlert className="text-red-700" />
                                <p>{list?.dueDate}</p>
                              </span>
                            )}
                            {list.subtasks.length > 0 && (
                              <span className="subtaskLengthSpan">
                                <FaCodeBranch className="opacity-70 -rotate-90 " />
                                <p>
                                  <span>
                                    {
                                      list.subtasks.filter(
                                        (task) => task.finished === true
                                      ).length
                                    }
                                  </span>{' '}
                                  / <span>{list.subtasks.length}</span>
                                </p>
                              </span>
                            )}
                          </div>
                        </div>
                      </DetailsModal.Open>

                      <span
                        onClick={() => handleImportant(list)}
                        className={`${
                          list.finished ? 'hidden' : 'pr-2 sm:text-2xl '
                        } `}
                      >
                        {list.important ? (
                          <HiMiniExclamationCircle className="important" />
                        ) : (
                          <HiOutlineExclamationCircle className="notImportant" />
                        )}
                      </span>

                      <DeleteModal>
                        <DeleteModal.Open opens="delete">
                          <span className="deleteTask">
                            <HiOutlineXMark />
                          </span>
                        </DeleteModal.Open>
                        <DeleteModal.Window name="delete">
                          <DeleteTask
                            task={list?.desc}
                            handler={() => handleDelete(list)}
                          />
                        </DeleteModal.Window>
                      </DeleteModal>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="taskAddInputDiv">
              <TaskAddInput />
            </div>
          </div>
          {allTasks.length !== 0 && (
            <div className="hidden h-[620px] bg-gray-300 dark:bg-gray-900 dark:text-gray-300 rounded-2xl lg:block xl:w-1/2">
              <TaskDetails
                details={details || {}}
                allTask={true}
                list={false}
                imp={false}
              />
            </div>
          )}

          <DetailsModal.Window name="alltask-open">
            <div className="">
              <TaskDetails
                details={details || {}}
                allTask={true}
                list={false}
                imp={false}
              />
            </div>
          </DetailsModal.Window>
        </div>
      </DetailsModal>
    </div>
  );
}

export default AllTasks;

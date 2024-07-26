import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiOutlineExclamationCircle, HiOutlineXMark } from 'react-icons/hi2';

import { useDashboardTask } from './DashboardContext';

import {
  deleteTask,
  finishedTask,
  importantTask,
  markedImportantTask,
} from '../Tasks/taskSlice';
import {
  deleteTaskInList,
  finishedTaskInList,
  importantTaskInList,
} from '../Lists/listSlice';
import EmptyTasks from '../../ui/EmptyTasks';

function DashboardTask() {
  const { filterTasks: tasks1 } = useDashboardTask();
  const dispatch = useDispatch();

  const tasks = tasks1.sort((a, b) => {
    if (a.finished && !b.finished) return 1;
    if (!a.finished && b.finished) return -1;
    return 0;
  });

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
  function handleFinished(task) {
    toast.success('Task Finished Successfully');
    dispatch(finishedTask(task.id));
    dispatch(finishedTaskInList({ listId: task.listId, taskId: task.id }));
  }

  function handleDelete(task) {
    toast.error('Task Removed Successfully');
    dispatch(deleteTask(task.id));
    dispatch(deleteTaskInList({ listId: task.listId, taskId: task.id }));
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-300 w-full   rounded-md overflow-y-auto py-5 px-4 grid gap-5 h-full content-start ">
      <h1 className=" text-lg font-medium lg:text-xl flex justify-between items-center ">
        <span>Tasks</span>
        {/* <span className="text-xs cursor-pointer">Remove All</span> */}
      </h1>
      {tasks?.length !== 0 ? (
        <ul className="space-y-3 overflow-y-auto">
          <AnimatePresence>
            {tasks?.map((task) => (
              <motion.li
                key={task.id}
                className={`bg-gray-200 dark:bg-gray-800 rounded-lg px-2 relative flex items-center justify-center gap-1 cursor-pointer h-10 origin-right ${
                  task.finished &&
                  'border-none  rounded-xl brightness-110 shadow-none opacity-40 dark:brightness-50'
                }  `}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
              >
                <span
                  className="cursor-pointer"
                  onClick={() => handleFinished(task)}
                >
                  {task.finished ? (
                    <BsCheckCircleFill size={17} className="text-green-500" />
                  ) : (
                    <BsCircle size={17} />
                  )}
                </span>
                <span className="w-full text-sm md:text-sm ">{task.desc}</span>
                <span
                  onClick={() => handleImportant(task)}
                  className={`${
                    (task?.finished || !task?.important) && 'hidden'
                  } text-md bg-orange-400 text-white rounded-full `}
                >
                  {task?.important && (
                    <HiOutlineExclamationCircle className="" />
                  )}
                </span>

                <motion.button
                  className="p-1"
                  onClick={() => handleDelete(task)}
                  whileHover={{
                    borderRadius: 9999,
                    backgroundColor: '#ff0000',
                    color: '#fff',
                    rotate: 360,
                  }}
                >
                  <HiOutlineXMark />
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <EmptyTasks />
      )}
    </div>
  );
}

export default DashboardTask;

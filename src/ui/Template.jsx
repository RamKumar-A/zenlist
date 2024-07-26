import {
  HiBellAlert,
  HiMiniExclamationCircle,
  HiOutlineExclamationCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';
import TaskDetails from '../features/Tasks/TaskDetails';
import DeleteTask from './DeleteTask';
import { FaCodeBranch } from 'react-icons/fa6';
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import TaskAddInput from './TaskAddInput';
import DetailsModal from '../context/DetailsModal';
import InputModal from '../context/InputModal';
import { motion, AnimatePresence } from 'framer-motion';
import EmptyTasks from './EmptyTasks';

function Template({
  isAllTask,
  isImpTask,
  isList,
  isTodayTask,
  tasks,
  handleDelete,
  handleDetails,
  handleImportant,
  handleFinished,
  details,
  detailsOpen,
  listId,
}) {
  return (
    <div className="w-full flex items-center justify-center gap-4 ">
      <DetailsModal>
        <div className=" w-full sm:h-[86dvh]  h-[86dvh] bg-gray-100 dark:bg-gray-950 rounded-3xl xl:w-1/2 relative  p-1 grid ">
          <ul
            className={`text-gray-950 dark:text-gray-200 overflow-y-auto  h-[75dvh] sm:h-[75dvh] space-y-3 p-1 ${
              tasks.length <= 0 && 'grid'
            } `}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {tasks?.map((list, i) => (
                <ListItem
                  list={list}
                  handleDelete={handleDelete}
                  handleDetails={handleDetails}
                  handleImportant={handleImportant}
                  handleFinished={handleFinished}
                  key={`${list?.id}`}
                  detailsOpen={detailsOpen}
                />
              ))}
            </AnimatePresence>
            {tasks.length <= 0 && <EmptyTasks />}
          </ul>
          <div className=" rounded-2xl relative h-[8dvh] w-full flex  items-center justify-center ">
            <TaskAddInput important={isImpTask} list={isList} listid={listId} />
          </div>
        </div>
        <AnimatePresence>
          {!isTodayTask && tasks?.length !== 0 && (
            <motion.div
              className="hidden bg-gray-100 dark:bg-gray-900 dark:text-gray-300 rounded-3xl xl:block xl:w-1/2 sm:h-[86dvh] overflow-y-auto origin-left "
              initial={{ scale: 0 }}
              exit={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <TaskDetails
                details={details || {}}
                allTask={isAllTask}
                list={isList}
                imp={isImpTask}
                todayTask={isTodayTask}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <DetailsModal.Window name={detailsOpen} todayTasks={isTodayTask}>
          <div className="">
            <TaskDetails
              details={details || {}}
              allTask={isAllTask}
              list={isList}
              imp={isImpTask}
              todayTask={isTodayTask}
            />
          </div>
        </DetailsModal.Window>
      </DetailsModal>
    </div>
  );
}

function ListItem({
  list,
  handleDetails,
  handleFinished,
  handleDelete,
  handleImportant,
  detailsOpen,
}) {
  return (
    <motion.li
      className={`h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl px-2 relative flex items-center justify-center gap-1 cursor-pointer origin-right ${
        list?.finished && 'brightness-110  dark:brightness-50'
      }`}
      onClick={() => handleDetails(list)}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 1, opacity: list?.finished ? 0.4 : 1 }}
      exit={{ scale: 0 }}
    >
      <span className="  " onClick={() => handleFinished(list)}>
        {list?.finished ? (
          <BsCheckCircleFill className="text-green-600 " size={17} />
        ) : (
          <BsCircle className="" size={17} />
        )}
      </span>

      <DetailsModal.Open opens={detailsOpen}>
        <div className="w-full  ">
          <span className={` ${list?.finished && 'line-through '} `}>
            {list?.desc}
          </span>
          <div className=" pt-1 pl-1.5 text-[0.6rem] lg:flex items-center gap-3 ">
            {list?.reminder && (
              <motion.span
                className="hidden lg:flex items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <HiBellAlert className="text-red-700" />
                <p>{list?.dueDate}</p>
              </motion.span>
            )}
            {list?.subtasks.length > 0 && (
              <motion.div
                className=" font-extralight flex items-center gap-1 "
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <FaCodeBranch className="opacity-70 -rotate-90 " />
                <p>
                  <span>
                    {
                      list?.subtasks.filter((task) => task?.finished === true)
                        .length
                    }
                  </span>{' '}
                  / <span>{list?.subtasks.length}</span>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </DetailsModal.Open>

      <span
        onClick={() => handleImportant(list)}
        className={`${
          list?.finished && 'hidden'
        } text-md bg-orange-400 text-white rounded-full `}
      >
        {list?.important ? (
          <HiOutlineExclamationCircle className="" />
        ) : (
          <HiMiniExclamationCircle className="bg-orange-300 rounded-full" />
        )}
      </span>

      <InputModal>
        <InputModal.Open opens={`delete-${detailsOpen}`}>
          <motion.button
            className="text-gray-900 dark:text-white rounded-full p-1"
            whileHover={{
              backgroundColor: '#ff0000',
              color: '#fff',
              rotate: 360,
            }}
            onClick={() => handleDelete(list)}
          >
            <HiOutlineXMark className="" />
          </motion.button>
        </InputModal.Open>
        <InputModal.Window name={`delete-${detailsOpen}`}>
          <DeleteTask task={list?.desc} handler={() => handleDelete(list)} />
        </InputModal.Window>
      </InputModal>
    </motion.li>
  );
}

export default Template;

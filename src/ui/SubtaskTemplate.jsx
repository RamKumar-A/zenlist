import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { deleteSubTask, finishedSubTask } from '../features/Tasks/taskSlice';
import {
  deleteSubtasksInList,
  finishedSubtasksInList,
} from '../features/Lists/listSlice';
import { motion } from 'framer-motion';

function SubtaskTemplate({ st, tasks }) {
  const { listId, id } = tasks;
  const dispatch = useDispatch();
  function handleDeleteSubTask() {
    // toast.error('Subtask removed Successfully');
    dispatch(
      deleteSubtasksInList({
        listId: listId,
        taskId: id,
        deleteId: st?.subTaskId,
      })
    );

    dispatch(deleteSubTask({ taskId: id, deleteId: st?.subTaskId }));
  }

  function handleFinishedSubTask() {
    dispatch(
      finishedSubtasksInList({
        taskId: id,
        listId: listId,
        finishedId: st?.subTaskId,
      })
    );
    dispatch(finishedSubTask({ taskId: id, finishedId: st?.subTaskId }));
  }

  // optional

  // useEffect(
  //   function () {
  //     if (finished) handleFinishedSubTask();
  //   },
  //   [finished]
  // );

  return (
    <li className="text-sm py-1.5 px-3 flex items-center justify-between gap-2 border border-gray-300 dark:border-gray-800 rounded-xl">
      <span className="cursor-pointer p-1" onClick={handleFinishedSubTask}>
        {st?.finished ? (
          <BsCheckCircleFill className="text-green-500" />
        ) : (
          <BsCircle className="" />
        )}
      </span>
      <span className=" w-full">{st?.desc}</span>
      {st?.finished && (
        <motion.span
          className="rounded-full cursor-pointer p-1"
          onClick={handleDeleteSubTask}
          whileHover={{
            backgroundColor: '#ff0000',
            color: '#fff',
            rotate: 180,
          }}
        >
          <HiOutlineXMark size={14} />
        </motion.span>
      )}
    </li>
  );
}

export default SubtaskTemplate;

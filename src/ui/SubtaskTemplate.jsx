import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { deleteSubTask, finishedSubTask } from '../features/Tasks/taskSlice';
import {
  deleteSubtasksInList,
  finishedSubtasksInList,
} from '../features/Lists/listSlice';
import toast from 'react-hot-toast';
// import { useEffect } from 'react';

function SubtaskTemplate({ st, tasks }) {
  const { listId, id } = tasks;
  // console.log(tasks);
  const dispatch = useDispatch();
  function handleDeleteSubTask() {
    toast.error('Subtask removed Successfully');
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
    <div className="text-sm p-1 px-3 flex items-center justify-between gap-2 border border-stone-300 rounded-xl sm:p-2 sm:px-5 md:bg-none md:text-lg lg:border-stone-700">
      <h1 className="cursor-pointer" onClick={handleFinishedSubTask}>
        {st?.finished ? (
          <BsCheckCircleFill className="lg:text-green-500" />
        ) : (
          <BsCircle className="" />
        )}
      </h1>
      <h1 className=" w-full">{st?.desc}</h1>
      {st?.finished && (
        <h1
          className=" p-0.5 border border-gray-900 rounded-full cursor-pointer dark:border-gray-200 hover:rotate-180 transition-transform duration-300 hover:bg-red-600 hover:text-gray-100"
          onClick={handleDeleteSubTask}
        >
          <HiOutlineXMark className="text-sm" />
        </h1>
      )}
    </div>
  );
}

export default SubtaskTemplate;

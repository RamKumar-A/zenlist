import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiOutlineXMark } from 'react-icons/hi2';

import { useDashboardTask } from './DashboardContext';
import { deleteTask, finishedTask } from '../Tasks/taskSlice';
import { deleteTaskInList, finishedTaskInList } from '../Lists/listSlice';
import EmptyTasks from '../../ui/EmptyTasks';

function DashboardTask() {
  const { filterTasks: tasks1 } = useDashboardTask();
  const dispatch = useDispatch();

  const tasks = tasks1.sort((a, b) => {
    if (a.finished && !b.finished) return 1;
    if (!a.finished && b.finished) return -1;
    return 0;
  });

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
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300 w-full h-[300px] p-5 border border-gray-500 rounded-lg overflow-y-auto md:block lg:h-[500px]">
      <h1 className=" text-xl px-1 font-semibold lg:text-2xl ">Tasks</h1>
      {tasks?.length !== 0 ? (
        <ul className="p-1 ">
          {tasks?.map((task) => (
            <StyledLi
              key={task.id}
              className={`${
                task.finished ? 'bg-gray-300 dark:bg-gray-700 rounded-xl' : ''
              } shadow-lg mb-3 hover:shadow-gray-800 cursor-pointer`}
            >
              <h1
                className=" sm:text-2xl cursor-pointer"
                onClick={() => handleFinished(task)}
              >
                {task.finished ? (
                  <BsCheckCircleFill className="text-green-500" />
                ) : (
                  <BsCircle />
                )}
              </h1>
              <div className="w-full sm:text-xl">
                <h1>{task.desc}</h1>
              </div>
              <div onClick={() => handleDelete(task)}>
                <h1 className="text-xs p-0.5  hover:bg-red-600 hover:rotate-180 transition-transform duration-500 rounded-full sm:text-xl cursor-pointer hover:text-gray-300">
                  <HiOutlineXMark />
                </h1>
              </div>
            </StyledLi>
          ))}
        </ul>
      ) : (
        <EmptyTasks />
      )}
    </div>
  );
}

const StyledLi = styled.li`
  display: flex;
  gap: 0.75rem;
  height: 4rem;
  align-items: center;
  padding: 0.5rem;
  @media (min-width: 1280px) {
    height: 5rem;
  }
`;

export default DashboardTask;

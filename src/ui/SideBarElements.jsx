import { NavLink } from 'react-router-dom';
import User from '../features/Users/User';
import {
  HiOutlineCalendarDays,
  HiOutlineExclamationCircle,
} from 'react-icons/hi2';
import Mylist from '../features/Lists/Mylist';
import { useSelector } from 'react-redux';
import {
  selectAllTask,
  selectImpTask,
  selectTasks,
} from '../features/Tasks/taskSlice';
import { FaTasks } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';

function SideBarElements() {
  const mydayTotal = useSelector(selectTasks);
  const importantTask = useSelector(selectImpTask);
  const allTask = useSelector(selectAllTask);
  const lists = useSelector((state) => state.lists.data);

  // to get the total length of allTasks (i.e (lists + allTask))

  const newTaskInList = lists?.flatMap((all) => all?.tasks);
  const combinedTask = allTask.concat(newTaskInList);
  const set = new Set(combinedTask?.map((task) => task?.id));
  const allTasks = Array.from(set, (id) =>
    combinedTask?.find((task) => task?.id === id)
  );

  // to get the total length of ImportantTasks (i.e (lists.important + importantTask))

  const impTaskInList = lists
    .flatMap((all) => all.tasks)
    .filter((task) => task.important);
  const combinedImpTask = importantTask.concat(impTaskInList);
  const setImp = new Set(combinedImpTask?.map((task) => task?.id));
  const impTasks = Array.from(setImp, (id) =>
    combinedImpTask.find((task) => task.id === id)
  );

  const datas = [
    {
      to: '/',
      name: 'My Day',
      length: mydayTotal,
      icons: <HiOutlineCalendarDays />,
    },
    {
      to: '/importanttasks',
      name: 'Important',
      length: impTasks,
      icons: <HiOutlineExclamationCircle />,
    },
    {
      to: '/alltasks',
      name: 'All Tasks',
      length: allTasks,
      icons: <FaTasks />,
    },
    {
      to: '/dashboard?task=today',
      name: 'Dashboard',
      length: '',
      icons: <MdOutlineDashboard />,
    },
  ];

  return (
    <>
      <h1 className="text-left dark:text-gray-300 px-2 sm:px-6 py-5 md:py-2 flex items-center justify-center font-semibold gap-3 ">
        <User />
      </h1>
      <AnimatePresence>
        {datas.map((data) => (
          <SideBarContent
            to={data.to}
            icon={data.icons}
            tasklen={data.length}
            key={data.to}
          >
            <p>{data.name}</p>
          </SideBarContent>
        ))}
      </AnimatePresence>

      <div className="px-5 ">
        <Mylist />
      </div>
    </>
  );
}

function SideBarContent({ to, children, icon, tasklen }) {
  return (
    <div className=" px-6 py-4 text-sm md:text-base ">
      <NavLink to={to} className="flex items-center gap-3">
        <span className="text-lg ">{icon}</span>
        <span className=" ">{children}</span>
        <span className="text-xs font-bold pl-5 ">{tasklen.length || ''}</span>
      </NavLink>
    </div>
  );
}

export default SideBarElements;

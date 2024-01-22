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

function SideBarElements() {
  const mydayTotal = useSelector(selectTasks);
  const importantTask = useSelector(selectImpTask);
  const allTask = useSelector(selectAllTask);
  const lists = useSelector((state) => state.lists.data);

  // to get the total length of allTasks (i.e (lists + allTask))

  const newTaskInList = lists.flatMap((all) => all.tasks);
  const combinedTask = allTask.concat(newTaskInList);
  const set = new Set(combinedTask.map((task) => task.id));
  const allTasks = Array.from(set, (id) =>
    combinedTask.find((task) => task.id === id)
  );

  // to get the total length of ImportantTasks (i.e (lists.important + importantTask))

  const impTaskInList = lists
    .flatMap((all) => all.tasks)
    .filter((task) => task.important);
  const combinedImpTask = importantTask.concat(impTaskInList);
  const setImp = new Set(combinedImpTask.map((task) => task.id));
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
      <h1 className="text-left sm:text-[1.2rem] dark:text-gray-300 px-6 py-5 pb-3 flex items-center justify-center font-semibold gap-3 ">
        <User />
      </h1>

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

      <div className=" text-left text-[1.2rem] px-6 py-2">
        <Mylist />
      </div>
    </>
  );
}

function SideBarContent({ to, children, icon, tasklen }) {
  return (
    <NavLink to={to}>
      <div className="text-[1.1rem] px-7 py-4 pt-4 flex items-center gap-3 lg:text-[1.05rem] ">
        <div className="text-xl pr-2">{icon}</div>
        {children}
        <h1 className="text-sm font-medium px-1.5 py-0.5 ml-2">
          {tasklen.length || ''}
        </h1>
      </div>
    </NavLink>
  );
}

export default SideBarElements;

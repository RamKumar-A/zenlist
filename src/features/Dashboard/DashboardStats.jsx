import { PiSigma } from 'react-icons/pi';
import {
  MdLabelImportantOutline,
  MdOutlinePlaylistAddCheck,
  MdOutlinePlaylistRemove,
} from 'react-icons/md';
import { useDashboardTask } from './DashboardContext';
function DashboardStats() {
  const { filterTasks } = useDashboardTask();

  const impTaskLen = filterTasks.filter((task) => task.important)?.length || 0;
  const finishedTaskLen =
    filterTasks.filter((task) => task.finished)?.length || 0;
  const unfinishedTaskLen =
    filterTasks.filter((task) => !task.finished)?.length || 0;

  const filterTasksData = [
    { title: 'Total Task', dataLength: filterTasks?.length, icon: <PiSigma /> },
    {
      title: 'Important',
      dataLength: impTaskLen,
      icon: <MdLabelImportantOutline />,
    },
    {
      title: 'Finished',
      dataLength: finishedTaskLen,
      icon: <MdOutlinePlaylistAddCheck />,
    },
    {
      title: 'Unfinished',
      dataLength: unfinishedTaskLen,
      icon: <MdOutlinePlaylistRemove />,
    },
  ];

  return (
    <section className=" grid grid-cols-2 gap-5 lg:grid-cols-4 py-4">
      {filterTasksData.map(({ title, icon, dataLength }) => (
        <article key={title}>
          <div className="w-full h-16 sm:h-24 bg-gray-100  p-2 text-center flex items-center gap-3 dark:bg-gray-950 rounded-md ">
            <div className=" p-2 sm:p-4 rounded-full  bg-blue-700 text-lg xl:text-2xl text-white">
              {icon}
            </div>
            <div className="text-left text-xs sm:text-sm xl:text-md ">
              <h1 className="dark:text-gray-300 pb-1">{title}</h1>
              <span className="dark:text-gray-300 font-semibold">
                {dataLength}
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default DashboardStats;

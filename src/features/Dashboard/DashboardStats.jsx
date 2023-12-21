import styled from 'styled-components';
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
    <section className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4  ">
      {filterTasksData.map(({ title, icon, dataLength }) => (
        <article key={title}>
          <StyledStats className="dark:bg-gray-900 ">
            <StatsIcon className="dark:bg-gray-700 text-lg xl:text-2xl">
              {icon}
            </StatsIcon>
            <div className="text-left">
              <h1 className="dark:text-gray-300 text-sm xl:text-xl">{title}</h1>
              <p className="dark:text-gray-300 font-semibold">{dataLength}</p>
            </div>
          </StyledStats>
        </article>
      ))}
    </section>
  );
}

const StyledStats = styled.div`
  width: 100%;
  height: 120px;
  background-color: #fff;
  border: 1px solid #0d0752;
  padding: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 0.5rem;
  border-radius: 0.5rem;
`;

const StatsIcon = styled.div`
  padding: 1rem;
  border-radius: 50%;
  background-color: #3b82f6;
  color: #fff;

  @media (max-width: 320px) {
    padding: 0.8rem;
  }
`;

export default DashboardStats;

import SidebarModal from '../../ui/SidebarModal';
import DashboardFilter from './DashboardFilter';

function DashboardHeader() {
  return (
    <header className=" grid grid-cols-1 lg:grid-cols-2 content-center items-center gap-4 ">
      <div className="relative px-5 bg-gray-100 dark:bg-gray-950 dark:text-gray-300 rounded-full flex items-center h-[8vh] justify-start lg:w-full ">
        <h1 className="text-xl sm:text-2xl font-semibold ">Dashboard</h1>
        <SidebarModal />
      </div>

      <div className="w-full flex flex-wrap xl:px-5 text-gray-100 justify-center lg:justify-end ">
        <DashboardFilter />
      </div>
    </header>
  );
}

export default DashboardHeader;

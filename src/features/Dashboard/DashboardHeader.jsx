import DashboardFilter from './DashboardFilter';

function DashboardHeader() {
  return (
    <header className="text-gray-100 grid grid-cols-1 lg:grid-cols-2 ">
      <div className="flex items-center sm:justify-start justify-center sm:px-5 ">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>
      <div className="my-6 flex items-center justify-around md:py-0 lg:my-0 lg:justify-end  xl:px-5 ">
        <DashboardFilter />
      </div>
    </header>
  );
}

export default DashboardHeader;

import DashBoardChart from './DashBoardChart';
import DashboardTask from './DashboardTask';

function DashboardMain() {
  return (
    <section className="h-[800px] lg:h-[500px] mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 ">
      <DashboardTask />
      <DashBoardChart />
    </section>
  );
}

export default DashboardMain;

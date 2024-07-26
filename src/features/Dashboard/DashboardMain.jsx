import DashboardChart from './DashBoardChart';
import DashboardTask from './DashboardTask';

function DashboardMain() {
  return (
    <section className="h-[800px] lg:h-[530px] grid gap-5 lg:grid-cols-2 ">
      <DashboardTask />
      <DashboardChart />
    </section>
  );
}

export default DashboardMain;

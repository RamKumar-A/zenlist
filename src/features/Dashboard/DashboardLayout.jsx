import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import DashboardStats from './DashboardStats';

function DashboardLayout() {
  return (
    <main className="dark:bg-gray-950 px-2 py-5 grid md:px-4 lg:py-3 ">
      <DashboardHeader />
      <DashboardStats />
      <DashboardMain />
    </main>
  );
}

export default DashboardLayout;

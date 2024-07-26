import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import DashboardStats from './DashboardStats';

function DashboardLayout() {
  return (
    <main className="dark:bg-blue-700 px-3 py-3  overscroll-y-scroll h-full ">
      <DashboardHeader />
      <DashboardStats />
      <DashboardMain />
    </main>
  );
}

export default DashboardLayout;

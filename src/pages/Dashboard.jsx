import { DashboardProvider } from '../context/DashboardContext';
import DashboardLayout from '../features/Dashboard/DashboardLayout';

function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardLayout />
    </DashboardProvider>
  );
}

export default Dashboard;

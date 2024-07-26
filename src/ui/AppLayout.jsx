import { Outlet } from 'react-router';
import SideBar from './SideBar';
import { UserProvider } from '../features/Users/UserContext';

function AppLayout() {
  return (
    <UserProvider>
      <div className="bg-blue-800 dark:bg-blue-400 h-[100vh] grid md:grid-cols-3 lg:grid-cols-7 xl:grid-cols-6 gap-0.5 ">
        {/* <div className="sticky h-full top-0"> */}
        <SideBar />
        {/* </div> */}
        <main className="bg-blue-700 h-full w-full md:col-span-2 lg:col-span-5 xl:col-span-5 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </UserProvider>
  );
}

export default AppLayout;

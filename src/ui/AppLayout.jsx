import { Outlet } from 'react-router';
// import Home from './Home';
import SideBar from './SideBar';
import Main from './Main';
import { UserProvider } from '../features/Users/UserContext';

function AppLayout() {
  return (
    <UserProvider>
      <div className="bg-stone-500 h-[100vh] grid md:grid-cols-3 lg:grid-cols-7  xl:grid-cols-6 ">
        <SideBar />
        <Main>
          <Outlet />
        </Main>
      </div>
    </UserProvider>
  );
}

export default AppLayout;

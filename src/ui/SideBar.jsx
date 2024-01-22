import { useState } from 'react';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import SideBarElements from './SideBarElements';
import SidebarModal from '../context/SidebarModal';

function SideBar() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <>
      <SidebarModal>
        <SidebarModal.Open opens="sidebar-open">
          <div
            className={` absolute top-2 md:hidden right-1 z-10 bg-gray-900 dark:bg-gray-100 dark:text-gray-900 text-gray-300 rounded-2xl `}
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <HiMiniBars3BottomLeft className=" text-2xl p-1" />
          </div>
        </SidebarModal.Open>

        <div
          className={`bg-gray-100 dark:bg-gray-950 text-gray-950 dark:text-gray-300 w-full  py-5 md:col-span-1 lg:col-span-2 xl:col-span-1 overflow-y-auto ${
            toggleSidebar ? '' : 'hidden'
          } md:block`}
        >
          <SideBarElements />
        </div>

        <SidebarModal.Window name="sidebar-open">
          <div
            className={`bg-gray-50 dark:bg-gray-950 text-stone-950 dark:text-gray-300 py-5`}
          >
            <SideBarElements />
          </div>
        </SidebarModal.Window>
      </SidebarModal>
    </>
  );
}

export default SideBar;

import SideBarElements from './SideBarElements';

function SideBar() {
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-950 text-gray-950 dark:text-gray-300 w-full  py-5 md:col-span-1 lg:col-span-2 xl:col-span-1 overflow-y-auto  hidden  md:block  `}
    >
      <SideBarElements />
    </div>
  );
}

export default SideBar;

import SidebarModal from './SidebarModal';

function Section({ children, title, isMyDay, listId }) {
  return (
    <section className="p-3 h-screen relative ">
      <header
        className={`${
          isMyDay
            ? 'w-full justify-center  '
            : 'bg-gray-100 dark:bg-gray-950 dark:text-gray-300 text-xl rounded-full sm:text-2xl xl:w-[40%] h-[8vh]'
        } relative flex items-center mb-2 `}
      >
        <h1
          className={`${
            isMyDay
              ? 'w-full lg:w-3/4 bg-gray-100 dark:bg-gray-950 dark:text-gray-300 text-xl rounded-full sm:text-2xl h-[8vh]   '
              : ' line-clamp-1'
          } grid grid-flow-col px-5 font-semibold w-full content-center `}
        >
          <span>{title}</span>
        </h1>
        <SidebarModal />
      </header>

      <div>{children}</div>
    </section>
  );
}

export default Section;

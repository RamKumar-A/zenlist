import AllTasks from '../features/Tasks/AllTasks';

function AllTasksPage() {
  return (
    <section className="">
      <header className="bg-gray-100 dark:bg-gray-950 dark:text-gray-300 text-xl  mx-5 my-5 px-5 py-3 rounded-full sm:text-2xl xl:w-[46%] ">
        <h1 className="px-5 font-semibold">All Tasks</h1>
      </header>
      <AllTasks />
    </section>
  );
}

export default AllTasksPage;

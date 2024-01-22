import TaskAddInput from '../ui/TaskAddInput';
import MydayTasks from '../features/Tasks/MydayTasks';
import { useUser } from '../features/Users/UserContext';

function getGreetings() {
  const time = new Date().getHours();
  return time >= 0 && time < 12
    ? 'Morning'
    : time >= 12 && time < 15
    ? 'Afternoon'
    : time >= 15 && 'Evening';
}

// function formatDate() {
//   const curDate = new Date();
//   const formattedDate = curDate.toDateString();
//   return {
//     day: formattedDate.slice(0, 3),
//     date: formattedDate.slice(8, 11),
//     month: formattedDate.slice(4, 7),
//   };
// }

function MyDayPage() {
  const session = getGreetings();
  // const { day, date, month } = formatDate();
  const { username } = useUser();
  return (
    <div className="grid h-[100vh] place-self-auto grid-rows-[auto_auto] dark:bg-gray-950 md:bg-gray-100 relative md:mx-2  md:px-5 lg:mx-20 xl:mx-40 p-2">
      <div>
        <header className="text-2xl bg-gray-200 dark:bg-gray-900 my-2 rounded-lg text-gray-800  dark:text-gray-200 py-4 px-4 font-bold sm:text-4xl md:py-5 lg:py-8">
          Good {session},
          <span className="text-gray-400 dark:text-gray-400 font-semibold capitalize">
            {' '}
            {username}
          </span>
        </header>
        {/* <div
          className="hidden text-center w-full h-20  bg-gray-200 text-gray-400 dark:bg-gray-900 dark:text-gray-200 lg:hidden gap-2
 md:h-28 md:flex-col md:w-1/4 items-center justify-center mb-5 mx-3 rounded-md shadow-lg shadow-gray-700 dark:shadow-gray-500"
        >
          <h1 className="text-xl leading-none dark:text-gray-400">{day}</h1>
          <h1 className="text-2xl text-gray-800 dark:text-gray-300 font-semibold leading-none ">
            {date}
          </h1>
          <h1 className="text-xl font-extralight  leading-none dark:text-gray-400">
            {month}
          </h1>
        </div> */}
      </div>

      <div className=" rounded-lg m-1">
        <div className="bg-gray-100 dark:bg-gray-950 w-full rounded-lg relative sm:h-[69dvh] min-[385px]:h-[86dvh] grid h-[78dvh] grid-rows-[1fr_auto]">
          <div className="w-full mt-auto overflow-y-auto h-full sm:h-full  mb-2">
            <MydayTasks />
          </div>
          <div className="taskAddInputDiv  sm:mt-3">
            <TaskAddInput />
            {/* top-1.5 sm:mt-3 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDayPage;

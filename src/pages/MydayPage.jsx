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

function formatDate() {
  const curDate = new Date();
  const formattedDate = curDate.toDateString();
  return {
    day: formattedDate.slice(0, 3),
    date: formattedDate.slice(8, 11),
    month: formattedDate.slice(4, 7),
  };
}

function MyDayPage() {
  const session = getGreetings();
  const { day, date, month } = formatDate();
  const { username } = useUser();
  return (
    <div className="h-full dark:bg-gray-950 relative  md:px-5 lg:mx-20 xl:mx-40 p-2  ">
      <header className="text-2xl  bg-gray-100 dark:bg-gray-800 my-2 rounded-lg text-gray-800  dark:text-gray-200 py-4 px-4 font-bold sm:text-4xl md:py-8">
        Good {session},
        <span className="text-gray-400 dark:text-gray-400 font-semibold">
          {' '}
          {username}
        </span>
      </header>
      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg">
        <div
          className="hidden text-center w-full h-20  bg-gray-200 text-gray-400 dark:bg-gray-900 dark:text-gray-200 md:flex gap-2
 md:h-28 md:flex-col md:w-1/4 items-center justify-center mb-5 mx-3 rounded-md shadow-lg shadow-gray-700 dark:shadow-gray-500"
        >
          <h1 className="text-xl leading-none dark:text-gray-400">{day}</h1>
          <h1 className="text-2xl text-gray-800 dark:text-gray-300 font-semibold leading-none ">
            {date}
          </h1>
          <h1 className="text-xl font-extralight  leading-none dark:text-gray-400">
            {month}
          </h1>
        </div>
        <div className="bg-gray-100 dark:bg-gray-950 w-full rounded-lg relative p-1">
          <div className="h-10 bg-blue-700 mx-2 my-3 top-1.5 rounded-full relative sm:h-14 sm:mt-3 sm:flex items-center justify-center ">
            <TaskAddInput />
          </div>
          <div className="w-full overflow-y-auto sm:h-[389px]">
            <MydayTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDayPage;
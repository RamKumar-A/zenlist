import MydayTasks from '../features/Tasks/MydayTasks';
import { useUser } from '../features/Users/UserContext';
import Section from '../ui/Section';

function getGreetings() {
  const time = new Date().getHours();
  return time >= 0 && time < 12
    ? 'Morning'
    : time >= 12 && time < 15
    ? 'Afternoon'
    : time >= 15 && 'Evening';
}

function MyDayPage() {
  const { username } = useUser();
  return (
    <Section
      isMyDay={true}
      title={
        <>
          <span>Good {getGreetings()}</span>
          <span className="text-gray-400 dark:text-gray-400 font-semibold capitalize max-sm:hidden ">
            , {username}
          </span>
        </>
      }
    >
      <MydayTasks />
    </Section>
  );
}

export default MyDayPage;

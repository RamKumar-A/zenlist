import { useUser } from '../features/Authentication/useUser';
import MydayTasks from '../features/Tasks/MydayTasks';
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
  const { user } = useUser();
  const title = () => {
    return (
      <>
        <span>Good {getGreetings()}</span>
        <span className="text-gray-400 dark:text-gray-400 font-semibold capitalize max-sm:hidden ">
          , {user.user_metadata.fullName}
        </span>
      </>
    );
  };
  return (
    <Section isMyDay={true} title={title()}>
      <MydayTasks />
    </Section>
  );
}

export default MyDayPage;

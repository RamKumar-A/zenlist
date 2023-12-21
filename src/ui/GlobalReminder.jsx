import { useDispatch, useSelector } from 'react-redux';
import { selectAllTask, setReminder } from '../features/Tasks/taskSlice';
import { useEffect } from 'react';
import { setReminderInList } from '../features/Lists/listSlice';
import toast from 'react-hot-toast';
import { HiBellAlert } from 'react-icons/hi2';

function GlobalReminder() {
  const allTask = useSelector(selectAllTask);
  const lists = useSelector((state) => state.lists.data);

  const newTaskInList = lists.flatMap((all) => all.tasks);
  const comninedTask = allTask.concat(newTaskInList);

  const set = new Set(comninedTask.map((task) => task.id));
  const allTasks = Array.from(set, (id) =>
    comninedTask.find((task) => task.id === id)
  );
  const dispatch = useDispatch();

  useEffect(
    function () {
      const checkReminder = setInterval(() => {
        const now = new Date();
        allTasks?.map((remind) => {
          const {
            reminder,
            remindDate,
            remindTime,
            dueDate,
            desc,
            listId,
            id,
          } = remind;
          const [day, month, year] = remindDate.split('/');
          const timeString = remindTime;
          const convertedDate = new Date(
            `${year}-${month}-${day} ${timeString}`
          );
          if (reminder && now >= convertedDate) {
            toast.error(`Reminder for ${desc} Due date on ${dueDate}`, {
              icon: <HiBellAlert className="text-red-600" />,
              position: 'top-right',
            });
            dispatch(setReminderInList({ listId: listId, taskId: id }));
            dispatch(setReminder({ listId: listId, taskId: id }));
          }
          return null;
        });
      }, 1000 * 10);

      return () => clearInterval(checkReminder);
    },
    [allTasks, dispatch]
  );
  return null;
}

export default GlobalReminder;

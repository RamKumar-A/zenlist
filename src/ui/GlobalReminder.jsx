import { useEffect, useState } from 'react';
import { useTask } from '../features/Tasks/useTask';
import { Alert, Snackbar } from '@mui/material';
import { format } from 'date-fns';
// import { updateTask } from '../services/apiTasks';

function GlobalReminder() {
  const { data: tasks } = useTask();
  const [matchedReminder, setMatchedReminder] = useState(false);

  useEffect(() => {
    // Function to check reminders and trigger notifications
    const checkReminders = () => {
      tasks?.forEach((reminder) => {
        const now = new Date();
        const reminderDT = new Date(reminder?.reminderDateTime);
        // Check if current time matches the reminder time (down to the minute)
        if (
          reminder.isReminder &&
          format(reminderDT, 'yyyy-MM-dd HH:mm') ===
            format(now, 'yyyy-MM-dd HH:mm')
        ) {
          // Trigger the notification
          setMatchedReminder(true);
          // Remove the triggered reminder from the array

          // OPTIONAL
          // if (reminderDT.getSeconds() === now.getSeconds()) {
          //   updateTask({
          //     id: reminder?.id,
          //     updates: { isReminder: false },
          //   });
          // }
        }
      });
    };

    // Set an interval to check reminders every 30 seconds
    const interval = setInterval(checkReminders, 30000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <Snackbar
      open={matchedReminder}
      autoHideDuration={6000}
      onClose={() => setMatchedReminder(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        sx={{
          width: { mobile: '100%', laptop: '35%' },
        }}
        severity="info"
        variant="filled"
        color="error"
        onClose={() => setMatchedReminder(false)}
      >
        This is a success Alert inside a Snackbar!
      </Alert>
    </Snackbar>
  );
}

export default GlobalReminder;

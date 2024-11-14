import { useState } from 'react';
import { Alert, Box, Snackbar, TextField } from '@mui/material';
import { useList } from '../features/Lists/useList';
import { useCreateTask } from '../features/Tasks/useCreateTask';
import { useLocation } from 'react-router';
import { useUser } from '../features/Authentication/useUser';

// const TIME_TO_ADD = 4 * 60 * 60 * 1000;

function TaskAddInput({ isToday = false, important = false }) {
  const location = useLocation();
  const { user } = useUser();
  const { addTask } = useCreateTask();
  const [value, setValue] = useState('');
  const [taskAdded, setTaskAdded] = useState(false);

  const { lists } = useList();
  let listId = 1;
  if (lists?.at(0)?.name === 'Personal') {
    listId = lists[0].id;
  }
  function addReminder() {
    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 5);
    return new Date(currentDate);
  }

  function addDueDate() {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    return isToday ? new Date() : new Date(currentDate);
  }

  function handleSubmit(e) {
    e.preventDefault();

    addTask(
      {
        description: value,
        isToday: isToday || important,
        isCompleted: false,
        isImportant: important,
        listId: location?.state?.listId || listId,
        dueDate: addDueDate(),
        reminderDateTime: addReminder(),
        isReminder: true,
        notes: '',
        userId: user.id,
      },
      {
        onSuccess: setTaskAdded(true),
      }
    );

    setValue('');
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Add Task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{
            height: '100%',
          }}
          variant="filled"
          required
          autoFocus
        />
      </Box>
      <Snackbar
        open={taskAdded}
        autoHideDuration={3000}
        onClose={() => setTaskAdded(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          sx={{
            width: { mobile: '100%', laptop: '25%' },
          }}
          severity="success"
          variant="filled"
        >
          Task Added Successfully
        </Alert>
      </Snackbar>
    </>
  );
}

export default TaskAddInput;

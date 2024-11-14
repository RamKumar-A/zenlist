import { useEffect, useState } from 'react';

import { Box, Button, Stack, Switch, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useUpdateTask } from '../features/Tasks/useUpdateTask';
import { addMinutes } from 'date-fns';

function Reminder({ details }) {
  const {
    id,
    isReminder: reminder,
    reminderDateTime: reminderDT,
  } = details || {};
  const { updateTask, isUpdating } = useUpdateTask();

  const [reminderDateTime, setReminderDateTime] = useState(
    addMinutes(new Date(), 5)
  );
  const [isReminder, setIsReminder] = useState(reminder || false);

  useEffect(() => {
    if (reminder !== undefined) {
      setIsReminder(reminder);
    }
  }, [details, reminderDateTime, reminder]);

  function handleReminder(e) {
    e.preventDefault();
    const checked = e.target.checked;
    setIsReminder(checked);
    updateTask({
      id: id,
      updates: { isReminder: checked },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateTask({
      id: id,
      updates: { reminderDateTime },
    });
  }

  return (
    <Stack
      direction="row"
      spacing={3}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '100%' }}
    >
      <Box sx={{ flex: { mobile: ' 1', tablet: 'none' } }}>
        <DateTimePicker
          disabled={isUpdating}
          value={new Date(reminderDT) || new Date()}
          onChange={(newValue) => setReminderDateTime(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              sx: {
                '& .MuiInputBase-root': {
                  height: { mobile: '2rem', tablet: '3rem' },
                  fontSize: { mobile: 13, tablet: 16 },
                },
              },
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Button
          variant="contained"
          type="submit"
          size="small"
          disabled={isUpdating}
        >
          <Typography
            textTransform={'capitalize'}
            fontSize={{ mobile: 12, tablet: 14 }}
          >
            Save
          </Typography>
        </Button>

        <Switch
          disabled={isUpdating}
          checked={isReminder}
          onChange={handleReminder}
        />
      </Box>
    </Stack>
  );
}

export default Reminder;

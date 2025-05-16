import { Box, Stack, Switch } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect } from 'react';

function Reminder({
  details,
  isUpdating,
  isReminder,
  setIsReminder,
  setReminderDateTime,
}) {
  const { reminderDateTime: reminderDT } = details || {};

  return (
    <Stack
      direction="row"
      spacing={3}
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Box sx={{ flex: { mobile: ' 1', tablet: 'none' } }}>
        <DateTimePicker
          disabled={isUpdating}
          value={new Date(reminderDT)}
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
          disablePast
        />
      </Box>
      <Switch
        disabled={isUpdating}
        checked={isReminder || new Date(reminderDT) > new Date()}
        onChange={(e) => {
          const checked = e.target.checked;
          setIsReminder(checked);
        }}
      />
    </Stack>
  );
}

export default Reminder;

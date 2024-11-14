import { useState } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useUpdateTask } from '../features/Tasks/useUpdateTask';
import { addDays } from 'date-fns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AddDueDate({ details }) {
  const { id, dueDate } = details || {};
  const { updateTask, isUpdating, isToday } = useUpdateTask();
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));

  function handleSubmit(e) {
    e.preventDefault();
    updateTask({
      id: id,
      updates: { dueDate: selectedDate },
    });
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={3}
      component="form"
      onSubmit={handleSubmit}
    >
      <DateTimePicker
        onChange={(date) => setSelectedDate(date)}
        value={new Date(dueDate)}
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
        disabled={isUpdating || isToday}
      />
      <Box>
        <Button
          size="small"
          variant="contained"
          type="submit"
          disabled={isUpdating || isToday}
        >
          <Typography
            whiteSpace="nowrap"
            textTransform={'capitalize'}
            fontSize={{ mobile: 12, tablet: 14 }}
          >
            Add dew Date
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
}

export default AddDueDate;

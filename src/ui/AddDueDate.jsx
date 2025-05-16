import { Stack } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AddDueDate({ details, isUpdating, isToday, setSelectedDate }) {
  const { dueDate } = details || {};

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
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
        disablePast
      />
    </Stack>
  );
}

export default AddDueDate;

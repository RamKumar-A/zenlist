import { Stack, Typography } from '@mui/material';

function EmptyTasks() {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <Typography
        fontWeight={600}
        textAlign="center"
        variant="h5"
        fontSize={'1.8rem'}
      >
        YOU HAVE NO TASKS
      </Typography>
      <Typography variant="p">Add Some Tasks To View</Typography>
    </Stack>
  );
}

export default EmptyTasks;

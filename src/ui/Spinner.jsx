import { CircularProgress, Stack } from '@mui/material';

function Spinner() {
  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Stack>
  );
}

export default Spinner;

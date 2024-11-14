import { Alert, Snackbar } from '@mui/material';

function DeleteToast({ open, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        sx={{
          width: { mobile: '100%', laptop: '35%' },
        }}
        severity="success"
        variant="filled"
        color="error"
      >
        Task deleted successfully
      </Alert>
    </Snackbar>
  );
}

export default DeleteToast;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function DeleteTask({
  disabled,
  task = 'this',
  open = false,
  onClose,
  handler,
}) {
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="mobile" fullWidth>
        <DialogTitle>Confirm Delete Task</DialogTitle>
        <DialogContent dividers>
          <DialogContentText color="text.default" fontSize={14}>
            Are you sure want to delete {task}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={disabled}>
            Cancel
          </Button>
          <Button
            onClick={() => handler()}
            disabled={disabled}
            variant="contained"
            color="error"
            disableElevation
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteTask;

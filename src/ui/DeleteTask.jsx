import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import DeleteToast from './DeleteToast';

function DeleteTask({
  disabled,
  task = 'this',
  openModal,
  onCloseModal,
  handler,
}) {
  const [deleted, setDeleted] = useState(false);
  return (
    <>
      <Dialog
        open={openModal}
        onClose={onCloseModal}
        maxWidth="mobile"
        fullWidth
      >
        <DialogTitle>Confirm Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText color="text.default">
            Are you sure want to delete {task}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal} disabled={disabled}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handler();
              setDeleted(true);
            }}
            disabled={disabled}
            variant="contained"
            color="error"
            disableElevation
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteToast open={deleted} onClose={() => setDeleted(false)} />
    </>
  );
}

export default DeleteTask;

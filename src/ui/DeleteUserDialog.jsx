import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function DeleteUserDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="tablet"
    >
      <DialogTitle>Delete User</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" disableElevation onClick={''}>
          {' '}
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserDialog;

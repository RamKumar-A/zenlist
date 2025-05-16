import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function DeleteUserDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="mobile"
    >
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent dividers>
        <DialogContentText color="contrastText" fontSize={14}>
          Are you sure want to delete account, it cannot be undone?
        </DialogContentText>
      </DialogContent>
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

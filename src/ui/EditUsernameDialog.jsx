import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useUpdateUser } from '../features/Authentication/useUpdateUser';

function EditUsernameDialog({ handleClose, open }) {
  const { isUpdating, updateUser } = useUpdateUser();
  const [value, setValue] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    updateUser({ fullName: value });
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
      fullWidth={true}
      maxWidth="tablet"
    >
      <DialogTitle>Edit User Name</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="User Name"
          value={value}
          size="large"
          fullWidth
          onChange={(e) => setValue(e.target.value)}
          required
          disabled={isUpdating}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" disableElevation type="submit">
          {' '}
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUsernameDialog;

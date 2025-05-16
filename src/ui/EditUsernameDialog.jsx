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
import { useUser } from '../features/Authentication/useUser';

function EditUsernameDialog({ handleClose, open }) {
  const { isUpdating, updateUser } = useUpdateUser();
  const { user } = useUser();
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
      maxWidth="mobile"
    >
      <DialogTitle>Edit User Name</DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="dense"
          label="User Name"
          // value={value}
          defaultValue={user.user_metadata?.fullName}
          size="small"
          fullWidth
          onChange={(e) => setValue(e.target.value)}
          required
          disabled={isUpdating}
          autoFocus
        />
      </DialogContent>
      <DialogActions sx={{ pt: 3 }}>
        <Button onClick={handleClose} size="small">
          Cancel
        </Button>
        <Button variant="contained" disableElevation type="submit" size="small">
          {' '}
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUsernameDialog;

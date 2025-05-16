import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useUpdateUser } from '../features/Authentication/useUpdateUser';
import { useUser } from '../features/Authentication/useUser';

function ResetPasswordDialog({ open, handleClose }) {
  const { isUpdating, updateUser, error } = useUpdateUser();
  const { user } = useUser();
  const [value, setValue] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    updateUser(
      {
        password: value,
        email: user.email,
        oldPassword: oldPassword,
      },
      {
        onSuccess: () => handleClose(),
      }
    );
    // handleClose();
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
      <DialogTitle>Reset User Password</DialogTitle>
      <DialogContent sx={{ display: 'grid', rowGap: 2 }} dividers>
        <TextField
          margin="dense"
          label="Current Password"
          value={oldPassword}
          size="small"
          fullWidth
          onChange={(e) => setOldPassword(e.target.value)}
          required
          disabled={isUpdating}
          // autoFocus
          sx={{ fontSize: 14 }}
        />
        <TextField
          margin="dense"
          label="New Password"
          value={value}
          size="small"
          fullWidth
          onChange={(e) => setValue(e.target.value)}
          required
          disabled={isUpdating}
          autoFocus

          // sx={{ fontSize: '12px' }}
        />
        {error && (
          <FormHelperText
            component="p"
            sx={{ color: '#f00', fontSize: '12px' }}
          >
            {error.message}
          </FormHelperText>
        )}
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

export default ResetPasswordDialog;

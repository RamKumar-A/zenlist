import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useModal } from '../../hooks/useModal';
import ResetPasswordDialog from '../../ui/ResetPasswordDialog';
import { MdOutlineLockReset } from 'react-icons/md';

function ResetPassword() {
  const resetPasswordDialog = useModal();
  return (
    <>
      <ListItem sx={{ width: '100%' }}>
        <ListItemButton onClick={resetPasswordDialog.onOpen}>
          <ListItemIcon>
            <Avatar>
              <MdOutlineLockReset />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Reset Password" />
        </ListItemButton>
      </ListItem>
      <ResetPasswordDialog
        open={resetPasswordDialog.isOpen}
        handleClose={resetPasswordDialog.onClose}
      />
    </>
  );
}

export default ResetPassword;

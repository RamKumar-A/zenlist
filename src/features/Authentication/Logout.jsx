import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useLogout } from './useLogout';
import { useModal } from '../../hooks/useModal';
import { MdOutlineLogout } from 'react-icons/md';

function Logout() {
  const { logout, isLoggingOut } = useLogout();
  const logoutDialog = useModal();
  return (
    <>
      <ListItem>
        <ListItemButton
          variant="contained"
          onClick={logoutDialog.onOpen}
          sx={{ width: '100%' }}
          disabled={isLoggingOut}
          disableElevation
        >
          <ListItemIcon>
            <Avatar>
              <MdOutlineLogout />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
      <Dialog
        open={logoutDialog.isOpen}
        onClose={logoutDialog.onClose}
        maxWidth="mobile"
        fullWidth
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent dividers>
          <DialogContentText color="text.primary" fontSize={14}>
            Are you sure want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pt: 3 }}>
          <Button disableElevation onClick={logoutDialog.onClose} size="small">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={logout}
            disabled={isLoggingOut}
            disableElevation
            color="error"
            size="small"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Logout;

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
          onClick={logoutDialog.openModal}
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
      <Dialog open={logoutDialog.isOpen} onClose={logoutDialog.closeModal}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText color="text.primary">
            Are you sure want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disableElevation onClick={logoutDialog.closeModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={logout}
            disabled={isLoggingOut}
            disableElevation
            color="error"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Logout;

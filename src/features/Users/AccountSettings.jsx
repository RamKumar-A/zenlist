import { MdOutlineManageAccounts } from 'react-icons/md';
import { useModal } from '../../hooks/useModal';
import { useState } from 'react';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useUser } from '../Authentication/useUser';
import EditUsername from './EditUsername';
import ResetPassword from './ResetPassword';
import DeleteUser from './DeleteUser';

function AccountSettings() {
  const accountSettingDialog = useModal();
  return (
    <>
      <ListItem>
        <ListItemButton
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => {
            accountSettingDialog.onOpen();
          }}
          disableElevation
        >
          <ListItemIcon>
            <Avatar>
              <MdOutlineManageAccounts />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Account Settings" />
        </ListItemButton>
      </ListItem>
      <AccountSettingsDialog
        open={accountSettingDialog.isOpen}
        handleClose={accountSettingDialog.onClose}
      />
    </>
  );
}

function AccountSettingsDialog({ open, handleClose }) {
  const { user } = useUser();
  const { fullName, email } = user.user_metadata;
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="tablet" fullWidth>
      <DialogTitle fontSize="1.5em" textAlign="center">
        Account Settings
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          color="text.primary"
          textAlign="center"
          fontSize="1rem"
          textTransform="capitalize"
        >
          {fullName}
        </DialogContentText>
        <DialogContentText
          color="text.primary"
          textAlign="center"
          fontSize="0.8rem"
          fontWeight={100}
        >
          ({email})
        </DialogContentText>
      </DialogContent>
      <List>
        <EditUsername />
        <ResetPassword />
        <DeleteUser />
      </List>
    </Dialog>
  );
}

export default AccountSettings;

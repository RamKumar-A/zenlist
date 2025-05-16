import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { HiOutlineTrash } from 'react-icons/hi2';
import DeleteUserDialog from '../../ui/DeleteUserDialog';
import { useModal } from '../../hooks/useModal';

function DeleteUser() {
  const deleteDialog = useModal();
  return (
    <>
      <ListItem>
        <ListItemButton sx={{ color: '#ff0000' }} onClick={deleteDialog.onOpen}>
          <ListItemIcon>
            <Avatar sx={{ bgcolor: '#ff0000', color: 'text.secondary' }}>
              <HiOutlineTrash />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Delete Account" />
        </ListItemButton>
      </ListItem>
      <DeleteUserDialog
        open={deleteDialog.isOpen}
        handleClose={deleteDialog.onClose}
      />
    </>
  );
}

export default DeleteUser;

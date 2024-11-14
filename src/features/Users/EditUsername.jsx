import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useModal } from '../../hooks/useModal';
import EditUsernameDialog from '../../ui/EditUsernameDialog';

function EditUsername() {
  const editDialog = useModal();
  return (
    <>
      <ListItem>
        <ListItemButton onClick={editDialog.openModal}>
          <ListItemIcon>
            <Avatar>
              <HiOutlinePencilSquare />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Edit User Name" />
        </ListItemButton>
      </ListItem>
      <EditUsernameDialog
        open={editDialog.isOpen}
        handleClose={editDialog.closeModal}
      />
    </>
  );
}

export default EditUsername;

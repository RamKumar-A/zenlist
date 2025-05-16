import {
  Dialog,
  DialogTitle,
  IconButton,
  List,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { HiOutlineCog8Tooth } from 'react-icons/hi2';

import { useUser } from '../Authentication/useUser';
import { useModal } from '../../hooks/useModal';

import Logout from '../Authentication/Logout';
import AccountSettings from './AccountSettings';
import Theme from './Theme';

function User() {
  const { user } = useUser();
  const mainModal = useModal();
  const username = user.user_metadata.fullName.split(' ')[0];
  return (
    <Stack
      component="div"
      direction="row"
      alignItems="center"
      sx={{ position: 'relative' }}
    >
      <Tooltip title={user.user_metadata.fullName}>
        <Typography
          variant="h6"
          sx={{ color: 'text.primary' }}
          className="capitalize flex-1 w-fit overflow-hidden"
        >
          {username}
        </Typography>
      </Tooltip>
      <IconButton sx={{ color: 'text.primary' }} onClick={mainModal.onOpen}>
        <HiOutlineCog8Tooth size={30} />
      </IconButton>
      <Dialog
        open={mainModal.isOpen}
        onClose={mainModal.onClose}
        fullWidth
        maxWidth="mobile"
      >
        <DialogTitle>Settings</DialogTitle>
        <List>
          <AccountSettings />
          <Theme />
          <Logout />
        </List>
      </Dialog>
    </Stack>
  );
}

export default User;

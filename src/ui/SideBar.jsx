import { Paper } from '@mui/material';
import SideBarElements from './SideBarElements';

function SideBar() {
  return (
    <Paper
      sx={{
        padding: ' 1rem',
        height: '100%',
        bgcolor: 'background.paper',
        overflow: 'auto',
      }}
    >
      <SideBarElements />
    </Paper>
  );
}

export default SideBar;

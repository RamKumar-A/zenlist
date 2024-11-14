import { Box, Grid2 } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import DashboardStats from './DashboardStats';

function DashboardLayout() {
  return (
    <Box className="space-y-5 h-full overflow-auto ">
      <Box>
        <DashboardHeader />
      </Box>
      <Grid2 container spacing={2}>
        <DashboardStats />
      </Grid2>
      <DashboardMain />
    </Box>
  );
}

export default DashboardLayout;

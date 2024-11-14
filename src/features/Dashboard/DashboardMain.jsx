import { Grid2 } from '@mui/material';
import DashboardChart from './DashBoardChart';
import DashboardTask from './DashboardTask';

function DashboardMain() {
  return (
    <Grid2 sx={{ p: 0.5 }} spacing={2.5} className="w-full" container>
      <Grid2 size={{ mobile: 12, laptop: 6 }}>
        <DashboardTask />
      </Grid2>
      <Grid2 size={{ mobile: 12, laptop: 6 }}>
        <DashboardChart />
      </Grid2>
    </Grid2>
  );
}

export default DashboardMain;

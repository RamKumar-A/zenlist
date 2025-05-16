import { Box, Grid2 } from '@mui/material';
import DashboardStats from './DashboardStats';
import Section from '../../ui/Section';
import DashboardPieChart from './DashboardPieChart';
import DashboardBarChart from './DashboardBarChart';
import DashboardTask from './DashboardTask';

function DashboardLayout() {
  return (
    <Box className="space-y-5 h-full overflow-auto ">
      <Section title="Dashboard">
        <Grid2 sx={{ p: 0.5 }} spacing={2.5} className="w-full" container>
          <DashboardStats />
          <Grid2 size={{ mobile: 12, laptop: 6 }}>
            <DashboardPieChart />
          </Grid2>
          <Grid2 size={{ mobile: 12, laptop: 6 }}>
            <DashboardBarChart />
          </Grid2>
          <Grid2 size={12}>
            <DashboardTask />
          </Grid2>
        </Grid2>
      </Section>
    </Box>
  );
}

export default DashboardLayout;

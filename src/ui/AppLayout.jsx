import { Outlet } from 'react-router';
import SideBar from './SideBar';
import { Grid2, Paper } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import GlobalReminder from './GlobalReminder';
import { DetailsProvider } from '../context/DetailsContext';

function AppLayout() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DetailsProvider>
        <Grid2
          container
          sx={{ width: '100%', bgcolor: 'background.default' }}
          component="section"
        >
          <Grid2
            size={{ tablet: 4, laptop: 3, desktop: 2.25 }}
            sx={{
              height: '100vh',
              p: '0.5rem',
              display: { mobile: 'none', tablet: 'block' },
            }}
            component="aside"
          >
            <SideBar />
          </Grid2>
          <Grid2
            size="grow"
            sx={{ height: '100vh', px: '0.5rem' }}
            component="section"
          >
            <Paper
              component="main"
              sx={{
                width: '100%',
                bgcolor: 'background.default',
                height: '100%',
                p: { mobile: '0', tablet: '0.5rem' },
              }}
              elevation={0}
            >
              <Outlet />
            </Paper>
          </Grid2>
          <GlobalReminder />
        </Grid2>
      </DetailsProvider>
    </LocalizationProvider>
  );
}

export default AppLayout;

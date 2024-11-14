import { Box, Stack, Typography } from '@mui/material';
import SidebarModal from '../../ui/SidebarModal';
import DashboardFilter from './DashboardFilter';

function DashboardHeader() {
  return (
    <Stack
      direction={{ laptop: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        py: { mobile: 1, laptop: 0 },
      }}
      gap={2}
    >
      <Box
        component="header"
        sx={{
          bgcolor: 'background.paper',
          height: { mobile: '8vh' },
          display: 'flex',
          flex: '1',
          alignItems: 'center',
          position: 'relative',
          p: 0.5,
          width: '100%',
          justifyContent: 'space-between',
          borderRadius: 7.5,
        }}
      >
        <Typography
          component="h1"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            px: 2,
          }}
          textAlign={'left'}
          fontSize={{ mobile: 24, tablet: 26 }}
          fontWeight={600}
        >
          Dashboard
        </Typography>
        <SidebarModal />
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          px: 1.5,
          flex: '1',
          py: { mobile: 2, tablet: 1 },
          alignSelf: 'center',
          height: { tablet: '8vh' },
          borderRadius: { mobile: 2, tablet: 7.5 },
        }}
      >
        <DashboardFilter />
      </Box>
    </Stack>
  );
}

export default DashboardHeader;

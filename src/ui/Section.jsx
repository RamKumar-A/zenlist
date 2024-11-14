import { Box, Stack, Typography } from '@mui/material';
import SidebarModal from './SidebarModal';

function Section({ children, title, isMyDay }) {
  return (
    <Stack
      alignItems={{
        laptop: isMyDay ? 'center' : 'flex-start',
      }}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        py: { mobile: 1, laptop: 0 },
      }}
      spacing={1.5}
    >
      <Box
        component="header"
        sx={{
          width: isMyDay
            ? { mobile: '100%', laptop: '70%' }
            : { desktop: '40%' },
          bgcolor: 'background.paper',

          height: { mobile: '2.8rem' },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          p: 0.5,
          borderRadius: 15,
        }}
      >
        <Typography
          component="h1"
          sx={{
            width: isMyDay ? { mobile: '100%', laptop: '100%' } : '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            px: 2,
          }}
          textAlign={'left'}
          fontSize={{ mobile: 24, tablet: 26 }}
          fontWeight={600}
        >
          {title}
        </Typography>
        <SidebarModal />
      </Box>

      <Box
        component="section"
        sx={{
          width: '100%',
          flex: 1,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}

export default Section;

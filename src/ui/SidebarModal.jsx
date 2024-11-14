import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import SideBarElements from './SideBarElements';
import { Box, Drawer, IconButton } from '@mui/material';

function SidebarModal() {
  const [open, setOpen] = useState(false);

  function toggleDrawer(newOpen) {
    setOpen(newOpen);
  }

  return (
    <Box className="md:hidden">
      <IconButton
        variant="contained"
        sx={{ bgcolor: 'primary.main', color: 'text.secondary' }}
        onClick={() => toggleDrawer(true)}
      >
        <HiMiniBars3BottomRight className="" size={20} />
      </IconButton>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <AnimatePresence initial={false}>
          <MotionBox className="w-[80vw] relative ">
            <Box className="overflow-y-auto h-full ">
              <SideBarElements />
            </Box>
          </MotionBox>
        </AnimatePresence>
      </Drawer>
    </Box>
  );
}

const MotionBox = motion(Box);

export default SidebarModal;

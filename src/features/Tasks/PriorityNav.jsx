import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { HiChevronRight, HiHashtag } from 'react-icons/hi2';

import { useTask } from './useTask';

const navDatas = ['Low', 'Medium', 'High'];

function PriorityNav() {
  const [togglePriority, setTogglePriority] = useState(false);

  const { data } = useTask();
  function getLength(priority) {
    const tasksLength = data?.filter(
      (d) => d.priority === priority?.toLowerCase()
    )?.length;
    return tasksLength;
  }

  return (
    <Box>
      <ListItem disablePadding sx={{ px: 1, py: 1, my: 1 }}>
        <ListItemIcon sx={{ fontSize: 16, width: 'fit-content' }}>
          <Avatar sx={{ color: 'text.primary', bgcolor: 'secondary.light' }}>
            <HiHashtag size={18} />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={<Typography>Priorities</Typography>} />

        <IconButton
          size="small"
          sx={{}}
          onClick={() => setTogglePriority(!togglePriority)}
        >
          <HiChevronRight
            size={18}
            className={`${
              togglePriority ? 'rotate-90' : 'rotate-0'
            } transition-transform duration-200`}
          />
        </IconButton>
      </ListItem>

      <Collapse in={togglePriority}>
        <AnimatePresence>
          {togglePriority && (
            <List sx={{ width: '100%', px: 2 }}>
              <motion.div
                className="pb-5 px-2 overflow-x-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="animate"
                exit="hidden"
              >
                {navDatas.map((priority, i) => (
                  <motion.div
                    className="line-clamp-1 "
                    variants={childVariants}
                    key={i + priority}
                  >
                    <NavLink to={`/priority/${priority}`}>
                      <ListItem disablePadding sx={{ px: 1, py: 1, my: 1 }}>
                        <ListItemText
                          primary={<Typography>{priority}</Typography>}
                        />
                        <Typography sx={{ whiteSpace: 'nowrap' }} fontSize={10}>
                          {getLength(priority)}
                        </Typography>
                      </ListItem>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </List>
          )}
        </AnimatePresence>
      </Collapse>
    </Box>
  );
}

const containerVariants = {
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.5,
    transition: {
      staggerChildren: 0.1,
      when: 'afterChildren',
    },
  },
};

const childVariants = {
  animate: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

export default PriorityNav;

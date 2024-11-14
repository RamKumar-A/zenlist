import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegRectangleList } from 'react-icons/fa6';
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
import { HiChevronRight, HiPlus } from 'react-icons/hi2';

import { useModal } from '../../hooks/useModal';
import { useList } from './useList';
import { useTask } from '../Tasks/useTask';
import CreateListDialog from './CreateListDialog';

function Mylist() {
  const [toggleList, setToggleList] = useState(false);

  const listDialog = useModal();

  const { lists } = useList();
  const { data } = useTask();
  function getLength(listId) {
    const tasksLength = data?.filter((d) => d.listId === listId)?.length;
    return tasksLength;
  }

  return (
    <Box>
      <ListItem disablePadding sx={{ px: 1, py: 1, my: 1 }}>
        <ListItemIcon sx={{ fontSize: 16, width: 'fit-content' }}>
          <Avatar sx={{ color: 'text.primary', bgcolor: 'secondary.light' }}>
            <FaRegRectangleList size={18} />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={<Typography>My List</Typography>} />
        {toggleList ? (
          <IconButton
            size="small"
            sx={{
              px: 1.5,
            }}
            onClick={listDialog.openModal}
          >
            <HiPlus size={16} />
          </IconButton>
        ) : (
          <Typography
            sx={{ px: 1.5 }}
            fontWeight={700}
            variant="span"
            fontSize={10}
            className=""
          >
            {lists?.length}
          </Typography>
        )}
        <IconButton
          size="small"
          sx={{}}
          onClick={() => setToggleList(!toggleList)}
        >
          <HiChevronRight
            size={18}
            className={`${
              toggleList ? 'rotate-90' : 'rotate-0'
            } transition-transform duration-200`}
          />
        </IconButton>
      </ListItem>
      <CreateListDialog
        open={listDialog.isOpen}
        onClose={listDialog.closeModal}
      />

      <Collapse in={toggleList}>
        <AnimatePresence>
          {toggleList && (
            <List sx={{ width: '100%', px: 2 }}>
              <motion.div
                className="pb-5 px-2 overflow-x-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="animate"
                exit="hidden"
              >
                {lists.map((list, i) => (
                  <motion.div
                    className="line-clamp-1 "
                    variants={childVariants}
                    key={i + list?.name}
                  >
                    <NavLink
                      to={`/mylist/${list?.name}`}
                      state={{ listName: list?.name, listId: list?.id }}
                    >
                      <ListItem disablePadding sx={{ px: 1, py: 1, my: 1 }}>
                        <ListItemText
                          primary={<Typography>{list?.name}</Typography>}
                        />
                        <Typography sx={{ whiteSpace: 'nowrap' }} fontSize={10}>
                          {getLength(list?.id)}
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

export default Mylist;

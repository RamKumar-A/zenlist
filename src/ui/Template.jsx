import { Box, IconButton, List, Modal, Paper, Stack } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';
import { useModal } from '../hooks/useModal';

import TaskDetails from '../features/Tasks/TaskDetails';
import EmptyTasks from './EmptyTasks';
import TaskAddInput from './TaskAddInput';
import TaskItems from './TaskItems';

function Template({ isAllTask, isImpTask, isTodayTask, tasks, priority }) {
  const detailModal = useModal();

  return (
    <Stack
      component="div"
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <Paper
        component="div"
        sx={{
          width: { mobile: '100%', desktop: '50%' },
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          borderRadius: 3,
        }}
      >
        <List
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflowY: 'auto',
            flex: 1,
            maxHeight: 'calc(100vh - 3.5rem)',
          }}
          className="space-y-2"
        >
          <AnimatePresence initial={false}>
            {tasks?.map((task, i) => (
              <TaskItems
                task={task}
                key={`${task?.id}`}
                openModal={detailModal.onOpen}
              />
            ))}
          </AnimatePresence>
          {tasks?.length <= 0 && <EmptyTasks />}
        </List>
        <Paper
          variant="outlined"
          sx={{
            height: '3.5rem',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            position: 'relative',
            borderColor: 'secondary.light',
          }}
        >
          <TaskAddInput
            isToday={isTodayTask || isAllTask}
            important={isImpTask}
            priority={priority}
          />
        </Paper>
      </Paper>
      <AnimatePresence>
        {!isTodayTask && tasks?.length !== 0 && (
          <MotionPaper
            className="hidden xl:block xl:w-1/2 sm:h-[86vh] rounded-md overflow-y-auto origin-left"
            component="div"
            elevation={6}
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            sx={{ borderRadius: 2 }}
          >
            <TaskDetails />
          </MotionPaper>
        )}
      </AnimatePresence>

      <Modal
        className={
          (isTodayTask ? '' : 'xl:hidden') + ' flex items-center justify-center'
        }
        open={detailModal.isOpen}
        onClose={detailModal.onClose}
      >
        <Box
          sx={{
            position: 'relative',
            width: {
              mobile: '95%',
              tablet: '65%',
              desktop: '40%',
            },
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              maxHeight: '90vh',
              overflow: 'auto',
              borderRadius: 2,
            }}
          >
            <TaskDetails closeModal={detailModal.onClose} />
          </Paper>

          <IconButton
            size="small"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: '50',
              transform: {
                mobile: 'translate(25%,-50%)',
                desktop: 'translate(50%,-50%)',
              },
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
            onClick={detailModal.onClose}
          >
            <HiXMark />
          </IconButton>
        </Box>
      </Modal>
    </Stack>
  );
}

const MotionPaper = motion.create(Paper);

export default Template;

import { AnimatePresence, motion } from 'framer-motion';

import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiHashtag, HiOutlineXMark } from 'react-icons/hi2';

import EmptyTasks from '../../ui/EmptyTasks';
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteTask from '../../ui/DeleteTask';
import { useModal } from '../../hooks/useModal';
import { useUpdateTask } from '../Tasks/useUpdateTask';
import { useDeleteTask } from '../Tasks/useDeleteTask';
import { useDashboardTask } from '../../context/DashboardContext';
import { isOverdue } from '../../helpers/isOverdue';

function DashboardTask() {
  const { filterTask: tasks } = useDashboardTask();

  const { updateTask, isUpdating } = useUpdateTask();
  const { deleteTask, isDeleting } = useDeleteTask();

  function handleCompleted(list) {
    updateTask({
      id: list?.id,
      updates: { isCompleted: !list?.isCompleted },
    });
  }

  function handleImportant(list) {
    updateTask({
      id: list?.id,
      updates: { isImportant: !list?.isImportant },
    });
  }

  function handleDelete(list) {
    deleteTask(list?.id);
  }

  const deleteDialog = useModal();
  const isDisabled = isUpdating || isDeleting;

  return (
    <Stack
      sx={{
        bgcolor: 'background.paper',
        p: 1.5,
        borderRadius: 3,
        boxShadow: 4,
      }}
      className="w-full space-y-3 h-[70vh]"
    >
      <Typography variant="h5">Tasks</Typography>
      {tasks?.length !== 0 ? (
        <Box component="ul" className=" space-y-3 overflow-y-auto">
          <AnimatePresence>
            {tasks?.map((task) => (
              <MotionListItem
                component="li"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1, opacity: task?.isCompleted ? 0.4 : 1 }}
                exit={{ scale: 0 }}
                className={`h-12 relative cursor-pointer space-x-1 origin-right ${
                  task?.isCompleted && 'brightness-50'
                }
                ${isOverdue(task) && !task?.isCompleted && ' brightness-50'}`}
                sx={{ bgcolor: 'secondary.main', borderRadius: 2 }}
                key={'dashboard' + task?.id}
              >
                <Tooltip
                  title={task?.isCompleted ? 'unmark' : 'mark as finished'}
                  arrow
                >
                  <IconButton
                    size="medium"
                    sx={{
                      '&.MuiIconButton-root:hover': {
                        color: '#3cff00',
                      },
                      pointerEvents:
                        isOverdue(task) && !task?.isCompleted ? 'none' : 'auto',
                    }}
                    onClick={() => handleCompleted(task)}
                    disabled={isUpdating || isDeleting}
                  >
                    {task?.isCompleted ? (
                      <BsCheckCircleFill
                        className="text-green-600 "
                        size={17}
                      />
                    ) : (
                      <BsCircle className="" size={17} />
                    )}
                  </IconButton>
                </Tooltip>

                <TaskDescription task={task} />
                <TaskAction
                  task={task}
                  handleImportant={handleImportant}
                  handleDelete={handleDelete}
                  isDisabled={isDisabled}
                  deleteDialog={deleteDialog}
                />
              </MotionListItem>
            ))}
          </AnimatePresence>
        </Box>
      ) : (
        <EmptyTasks />
      )}
    </Stack>
  );
}

const MotionListItem = motion(ListItem);
const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

function TaskDescription({ task }) {
  return (
    <ListItemText
      primary={
        <Typography
          variant="span"
          sx={{
            textDecoration: task?.isCompleted ? 'line-through' : 'normal',
          }}
          fontSize={18}
          fontWeight={500}
        >
          {task?.description}
        </Typography>
      }
    />
  );
}

function TaskAction({
  task,
  handleImportant,
  handleDelete,
  deleteDialog,
  isDisabled,
}) {
  return (
    <Stack spacing={0.5} direction="row">
      <Box>
        <Tooltip
          title={task?.isImportant ? 'unmark' : 'mark as important'}
          arrow
        >
          <IconButton
            size="small"
            sx={(theme) => ({
              '&.MuiIconButton-root': {
                color: task?.isImportant
                  ? '#ff5500'
                  : theme.palette.text.primary,
              },
              pointerEvents:
                isOverdue(task) && !task?.isCompleted ? 'none' : 'auto',
            })}
            onClick={() => handleImportant(task)}
            disabled={isDisabled || task?.isCompleted}
          >
            <HiHashtag size={17} />
          </IconButton>
        </Tooltip>
      </Box>

      <MotionBox className="" onClick={deleteDialog.openModal}>
        <Tooltip title="Delete" arrow>
          <MotionIconButton
            size="small"
            whileHover={{
              backgroundColor: '#ff0000',
              rotate: 360,
            }}
            sx={(theme) => ({
              '&.MuiIconButton-root': {
                color: theme.palette.text.primary,
              },
              '&.MuiIconButton-root:hover': {
                color: theme.palette.text.secondary,
              },
            })}
            disabled={isDisabled}
          >
            <HiOutlineXMark className="" size={16} />
          </MotionIconButton>
        </Tooltip>
      </MotionBox>
      <DeleteTask
        openModal={deleteDialog.isOpen}
        onCloseModal={deleteDialog.closeModal}
        handler={() => handleDelete(task)}
        disabled={isDisabled}
      />
    </Stack>
  );
}

export default DashboardTask;

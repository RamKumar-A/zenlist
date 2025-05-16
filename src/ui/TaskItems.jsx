import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { FaCodeBranch } from 'react-icons/fa6';
import { HiBellAlert, HiOutlineXMark } from 'react-icons/hi2';
import DeleteTask from './DeleteTask';
import { useModal } from '../hooks/useModal';
import { useUpdateTask } from '../features/Tasks/useUpdateTask';
import { useDeleteTask } from '../features/Tasks/useDeleteTask';
import { useDetails } from '../context/DetailsContext';

import { isOverdue } from '../helpers/isOverdue';
import { MdLabelImportant, MdLabelImportantOutline } from 'react-icons/md';
import { getPriorityColor, getStatusColor, hex2rgba } from '../helpers/helpers';
import toast from 'react-hot-toast';

const MotionListItem = motion.create(ListItem);
const MotionBox = motion.create(Box);
const MotionIconButton = motion.create(IconButton);

function TaskItems({ task, openModal }) {
  const deleteDialog = useModal();
  const { updateTask, isUpdating } = useUpdateTask();
  const { deleteTask, isDeleting } = useDeleteTask();
  const { handleDetails } = useDetails();

  function handleCompleted(task) {
    updateTask(
      { id: task?.id, updates: { isCompleted: !task?.isCompleted } },
      {
        onSuccess: () => toast.success('task updated'),
      }
    );
  }

  function handleImportant(task) {
    updateTask(
      { id: task?.id, updates: { isImportant: !task?.isImportant } },
      {
        onSuccess: () => toast.success('task updated'),
      }
    );
  }

  function handleDelete(task) {
    deleteTask(task?.id, {
      onSuccess: () => toast.success('task deleted'),
    });
  }

  const overdue = isOverdue(task?.dueDate);
  const isDisabled = isUpdating || isDeleting;
  const statusColor = getStatusColor(
    isOverdue(task?.dueDate) ? 'overdue' : task?.isCompleted ? 'completed' : ''
  );
  return (
    <>
      <MotionListItem
        onClick={() => handleDetails(task)}
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: 1,
        }}
        // className='cursor-auto'
        exit={{ scale: 0 }}
        sx={{
          position: 'relative',
          cursor: overdue && !task?.isCompleted ? 'auto' : 'pointer',
          transformOrigin: 'right',
          height: '4rem',
          bgcolor: hex2rgba(statusColor, 0.05) || 'secondary.main',
          borderRadius: 2,
          borderLeft: {
            mobile: `3px solid ${getPriorityColor(task?.priority)}`,
            tablet: `5px solid ${getPriorityColor(task?.priority)}`,
          },
        }}
        disabled={isDisabled}
      >
        <Tooltip
          title={task?.isCompleted ? 'unmark' : 'mark as completed'}
          arrow
        >
          <IconButton
            size="medium"
            sx={{
              '&.MuiIconButton-root:hover': {
                color: '#3cff00',
              },
              pointerEvents: overdue && !task?.isCompleted ? 'none' : 'auto',
              opacity: overdue && !task?.isCompleted ? '0.2' : '1',
            }}
            onClick={() => handleCompleted(task)}
            disabled={isDisabled}
          >
            {task?.isCompleted ? (
              <BsCheckCircleFill color="#0f0" size={17} />
            ) : (
              <BsCircle className="" size={17} />
            )}
          </IconButton>
        </Tooltip>
        <TaskDescription
          handleDetails={handleDetails}
          task={task}
          openModal={openModal}
        />

        <TaskAction
          task={task}
          handleDelete={handleDelete}
          isDisabled={isDisabled}
          handleImportant={handleImportant}
          deleteDialog={deleteDialog}
        />
      </MotionListItem>
      <DeleteTask
        open={deleteDialog.isOpen}
        onClose={deleteDialog.onClose}
        handler={() => handleDelete(task)}
        disabled={isDisabled}
      />
    </>
  );
}

function TaskDescription({ handleDetails, openModal, task }) {
  const overdue = isOverdue(task?.dueDate);
  return (
    <ListItemText
      className="overflow-hidden"
      onClick={() => {
        openModal();
        handleDetails(task);
      }}
      sx={{
        opacity: overdue && !task?.isCompleted ? '0.5' : '1',
      }}
      primary={
        <Typography
          variant="span"
          sx={{
            textDecoration: task?.isCompleted ? 'line-through' : 'normal',
          }}
          fontSize={{ mobile: 15, tablet: 16 }}
          fontWeight={400}
        >
          {task?.description}
        </Typography>
      }
      secondary={
        <Stack
          component="span"
          direction="row"
          justifyContent="flex-start"
          spacing={{ mobile: 3, laptop: 1 }}
        >
          {task?.isReminder && (
            <motion.span
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <HiBellAlert className="text-red-500" size={8} />
            </motion.span>
          )}
          {task?.subtasks.length > 0 && (
            <motion.span
              className=" font-extralight flex items-center gap-1 text-gray-800 "
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaCodeBranch size={8} />
              <Typography variant="span" component="span" fontSize={12}>
                <span>
                  {
                    task?.subtasks.filter((task) => task?.finished === true)
                      ?.length
                  }
                </span>{' '}
                / <span>{task?.subtasks.length}</span>
              </Typography>
            </motion.span>
          )}
        </Stack>
      }
    />
  );
}

function TaskAction({ task, handleImportant, isDisabled, deleteDialog }) {
  const overdue = isOverdue(task?.dueDate);
  return (
    <Stack spacing={0.5} direction="row">
      <Box
        sx={{
          pointerEvents:
            (overdue && !task?.isCompleted) || task?.isCompleted
              ? 'none'
              : 'auto',
        }}
      >
        <Tooltip
          title={task?.isImportant ? 'unmark' : 'mark as important'}
          arrow
        >
          <IconButton
            size="small"
            sx={(theme) => ({
              '&.MuiIconButton-root': {
                color: task?.isImportant
                  ? '#0AFF00'
                  : theme.palette.text.primary,
              },
              opacity: overdue && !task?.isCompleted ? '0.2' : '1',
            })}
            onClick={(e) => {
              e.stopPropagation();
              handleImportant(task);
            }}
            disabled={isDisabled}
          >
            {task?.isImportant ? (
              <MdLabelImportant />
            ) : (
              <MdLabelImportantOutline size={16} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <MotionBox className="" onClick={deleteDialog.onOpen}>
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
    </Stack>
  );
}
export default TaskItems;

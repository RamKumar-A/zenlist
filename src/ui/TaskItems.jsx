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
import { HiBellAlert, HiHashtag, HiOutlineXMark } from 'react-icons/hi2';
import DeleteTask from './DeleteTask';
import { useModal } from '../hooks/useModal';
import { useUpdateTask } from '../features/Tasks/useUpdateTask';
import { useDeleteTask } from '../features/Tasks/useDeleteTask';
import { useDetails } from '../context/DetailsContext';

import { isOverdue } from '../helpers/isOverdue';

const MotionListItem = motion(ListItem);
const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

function TaskItems({ list, openModal }) {
  const deleteModal = useModal();
  const { updateTask, isUpdating } = useUpdateTask();
  const { deleteTask, isDeleting } = useDeleteTask();
  const { handleDetails } = useDetails();

  function handleCompleted(list) {
    updateTask({ id: list?.id, updates: { isCompleted: !list?.isCompleted } });
  }

  function handleImportant(list) {
    updateTask({ id: list?.id, updates: { isImportant: !list?.isImportant } });
  }

  function handleDelete(list) {
    deleteTask(list?.id);
  }

  const overdue = isOverdue(list);
  const isDisabled = isUpdating || isDeleting;

  return (
    <>
      <MotionListItem
        onClick={() => handleDetails(list)}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 1, opacity: list?.isCompleted ? 0.4 : 1 }}
        exit={{ scale: 0 }}
        className={`h-16 relative cursor-pointer space-x-1 origin-right ${
          list?.isCompleted && 'brightness-50'
        } 
        ${overdue && !list?.isCompleted && ' brightness-50'}
      `}
        sx={{ bgcolor: 'secondary.main', borderRadius: 2 }}
        disabled={isDisabled}
      >
        <Tooltip
          title={list?.isCompleted ? 'unmark' : 'mark as completed'}
          arrow
        >
          <IconButton
            size="medium"
            sx={{
              '&.MuiIconButton-root:hover': {
                color: '#3cff00',
              },
              pointerEvents: overdue && !list?.isCompleted ? 'none' : 'auto',
            }}
            onClick={() => handleCompleted(list)}
            disabled={isDisabled}
          >
            {list?.isCompleted ? (
              <BsCheckCircleFill className="text-green-600 " size={17} />
            ) : (
              <BsCircle className="" size={17} />
            )}
          </IconButton>
        </Tooltip>
        <TaskDescription
          handleDetails={handleDetails}
          list={list}
          openModal={openModal}
        />

        <TaskAction
          list={list}
          handleDelete={handleDelete}
          isDisabled={isDisabled}
          handleImportant={handleImportant}
          deleteModal={deleteModal}
        />
      </MotionListItem>
      <DeleteTask
        openModal={deleteModal.isOpen}
        onCloseModal={deleteModal.closeModal}
        handler={() => handleDelete(list)}
        disabled={isDisabled}
      />
    </>
  );
}

function TaskDescription({ handleDetails, openModal, list }) {
  return (
    <ListItemText
      className="overflow-hidden"
      onClick={() => {
        openModal();
        handleDetails(list);
      }}
      primary={
        <Typography
          variant="span"
          sx={{
            textDecoration: list?.isCompleted ? 'line-through' : 'normal',
          }}
          fontSize={{ mobile: 15, tablet: 16 }}
          fontWeight={400}
        >
          {list?.description}
        </Typography>
      }
      secondary={
        <Stack
          component="span"
          direction="row"
          justifyContent="flex-start"
          spacing={{ mobile: 3, laptop: 0 }}
        >
          {list?.isReminder && (
            <motion.span
              className="hidden lg:flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <HiBellAlert className="text-red-700" size={10} />
            </motion.span>
          )}
          {list?.subtasks.length > 0 && (
            <motion.span
              className=" font-extralight flex items-center gap-1 text-gray-800 "
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaCodeBranch size={8} />
              <Typography fontSize={12}>
                <span>
                  {
                    list?.subtasks.filter((task) => task?.finished === true)
                      ?.length
                  }
                </span>{' '}
                / <span>{list?.subtasks.length}</span>
              </Typography>
            </motion.span>
          )}
        </Stack>
      }
    />
  );
}

function TaskAction({ list, handleImportant, isDisabled, deleteModal }) {
  const overdue = isOverdue(list);
  return (
    <Stack spacing={0.5} direction="row">
      <Box
        sx={{
          pointerEvents:
            (overdue && !list?.isCompleted) || list?.isCompleted
              ? 'none'
              : 'auto',
        }}
      >
        <Tooltip
          title={list?.isImportant ? 'unmark' : 'mark as important'}
          arrow
        >
          <IconButton
            size="small"
            sx={(theme) => ({
              '&.MuiIconButton-root': {
                color: list?.isImportant
                  ? '#ff5500'
                  : theme.palette.text.primary,
              },
            })}
            onClick={(e) => {
              e.stopPropagation();
              handleImportant(list);
            }}
            disabled={isDisabled}
          >
            <HiHashtag size={17} />
          </IconButton>
        </Tooltip>
      </Box>

      <MotionBox className="" onClick={deleteModal.openModal}>
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
      {/*
      // moved to top
       <DeleteTask
        openModal={deleteModal.isOpen}
        onCloseModal={deleteModal.closeModal}
        handler={() => handleDelete(list)}
        disabled={isDisabled}
      /> */}
    </Stack>
  );
}
export default TaskItems;

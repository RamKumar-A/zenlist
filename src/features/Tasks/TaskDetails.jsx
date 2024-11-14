import { useParams } from 'react-router';

import {
  Box,
  IconButton,
  List,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useModal } from '../../hooks/useModal';
import { useUpdateTask } from './useUpdateTask';
import { useDeleteTask } from './useDeleteTask';

import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiHashtag, HiMiniPencil, HiTrash } from 'react-icons/hi2';

import AddDueDate from '../../ui/AddDueDate';

import NotesInput from '../../ui/NotesInput';
import SubtaskTemplate from '../../ui/SubtaskTemplate';
import SubtaskInput from '../../ui/SubtaskInput';
import DeleteTask from '../../ui/DeleteTask';

import Reminder from '../../ui/Reminder';
import { useDetails } from '../../context/DetailsContext';
import { useEffect, useState } from 'react';
import { useTask } from './useTask';
import { isOverdue } from '../../helpers/isOverdue';

function TaskDetails({ closeModal }) {
  const { details } = useDetails();
  const params = useParams();
  const deleteDialog = useModal();
  const notesDialog = useModal();
  const { data: tasks } = useTask();
  const { updateTask, isUpdating } = useUpdateTask();
  const { deleteTask, isDeletingTask } = useDeleteTask();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const d = tasks.find((d) => d.id === details?.id);
    setDetail(d);
  }, [tasks, details]);

  function handleFinished() {
    updateTask({
      id: detail?.id,
      updates: { isCompleted: !details?.isCompleted },
    });
  }

  function handleDelete() {
    deleteTask(detail?.id);
    deleteDialog.closeModal();
    closeModal(false);
  }

  const overdue = isOverdue(detail || {});

  return (
    <>
      <Box
        sx={{ width: '100%', p: 2.5, position: 'relative', borderRadius: 2 }}
        className={`space-y-4  ${
          (details?.isCompleted ||
            isUpdating ||
            isDeletingTask ||
            !details?.description ||
            overdue) &&
          'opacity-70 pointer-events-none'
        } 
      `}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className=""
        >
          <Typography
            fontSize={'0.7rem'}
            fontWeight={300}
            sx={{ opacity: '0.6' }}
          >
            Mylist &#12297;{params?.list || 'Personal'}
          </Typography>
          <Stack className="" direction="row">
            <IconButton
              onClick={handleFinished}
              className={`cursor-pointer ${
                details?.isCompleted && 'pointer-events-auto visible  '
              } `}
              sx={{
                '&.MuiIconButton-root:hover': {
                  color: '#3cff00',
                },
              }}
            >
              {details?.isCompleted ? (
                <BsCheckCircleFill size={14} />
              ) : (
                <BsCircle size={14} />
              )}
            </IconButton>
            <Tooltip title="Delete" arrow>
              <IconButton
                className={`cursor-pointer ${
                  (detail?.isCompleted || overdue) &&
                  'pointer-events-auto visible '
                } `}
                sx={{
                  '&.MuiIconButton-root:hover': {
                    color: '#fff',
                    backgroundColor: '#ff0f00',
                  },
                }}
                onClick={deleteDialog.openModal}
              >
                <HiTrash size={14} />
              </IconButton>
            </Tooltip>

            {/* <DeleteToast open={deleted} onClose={() => setDeleted(false)} /> */}
          </Stack>
        </Stack>
        <Typography
          fontSize={{ mobile: 20, laptop: 27 }}
          fontWeight={600}
          variant="h2"
        >
          <span>{detail?.description || 'Click the task to view'} </span>
          {detail?.isImportant && (
            <IconButton
              sx={{
                '&.MuiIconButton-root': {
                  color: '#ff5500',
                },
              }}
              className="pointer-events-none"
              size="small"
            >
              <HiHashtag />
            </IconButton>
          )}
        </Typography>
        <Box className="space-y-3">
          <Reminder details={detail} />
          <AddDueDate details={detail} />
        </Box>
        {/* Notes */}
        <Box className="space-y-3">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography fontSize={18} fontWeight={500}>
              Notes
            </Typography>
            <IconButton
              className=""
              color="primary"
              onClick={notesDialog.openModal}
            >
              <HiMiniPencil size={14} />
            </IconButton>
          </Stack>
          {detail?.notes && (
            <Typography
              fontSize={14}
              fontWeight={500}
              variant="span"
              className="border py-0.5 px-2 line-clamp-1 capitalize rounded"
            >
              {detail?.notes}
            </Typography>
          )}

          <NotesInput
            open={notesDialog.isOpen}
            onClose={notesDialog.closeModal}
            details={detail}
          />
        </Box>

        {/* Subtasks */}
        <Box className="space-y-3">
          <Typography fontSize={18} fontWeight={500}>
            Subtasks{' '}
            <span className="text-xs lowercase font-normal ">(max 3)</span>
          </Typography>
          {detail?.subtasks?.length > 0 && (
            <List component="ul" className="space-y-1 w-3/4">
              {detail?.subtasks.map((st) => (
                <SubtaskTemplate st={st} key={st.id} />
              ))}
            </List>
          )}
          <SubtaskInput details={detail} />
        </Box>
      </Box>
      <DeleteTask
        openModal={deleteDialog.isOpen}
        onCloseModal={deleteDialog.closeModal}
        handler={handleDelete}
      />
    </>
  );
}

export default TaskDetails;

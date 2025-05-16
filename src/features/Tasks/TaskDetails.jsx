import { useParams } from 'react-router';

import {
  Box,
  Button,
  IconButton,
  List,
  Stack,
  TextareaAutosize,
  Tooltip,
  Typography,
} from '@mui/material';
import { useModal } from '../../hooks/useModal';
import { useUpdateTask } from './useUpdateTask';
import { useDeleteTask } from './useDeleteTask';

import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiHashtag, HiPlusCircle, HiTrash } from 'react-icons/hi2';

import AddDueDate from '../../ui/AddDueDate';

import SubtaskTemplate from '../../ui/SubtaskTemplate';
import SubtaskInput from '../../ui/SubtaskInput';
import DeleteTask from '../../ui/DeleteTask';

import Reminder from '../../ui/Reminder';
import { useDetails } from '../../context/DetailsContext';
import { useEffect, useState } from 'react';
import { useTask } from './useTask';
import { isOverdue } from '../../helpers/isOverdue';
import { addDays, addMinutes } from 'date-fns';
import toast from 'react-hot-toast';
import { MdLabelImportant } from 'react-icons/md';
import { getPriorityColor } from '../../helpers/helpers';
import SelectPriority from '../../ui/SelectPriority';

function TaskDetails({ closeModal }) {
  const params = useParams();
  const { data: tasks } = useTask();
  const { details } = useDetails();
  const [detail, setDetail] = useState(null);

  const deleteDialog = useModal();
  const priorityDialog = useModal();

  const [reminderDateTime, setReminderDateTime] = useState(
    addMinutes(new Date(), 5)
  );
  const [isReminder, setIsReminder] = useState(details?.isReminder || false);
  const [notes, setNotes] = useState(detail?.notes);
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));

  const { deleteTask, isDeletingTask } = useDeleteTask();
  const { updateTask, isUpdating, isToday } = useUpdateTask();

  useEffect(() => {
    const d = tasks.find((d) => d.id === details?.id);
    setDetail(d);
  }, [tasks, details]);

  useEffect(() => {
    if (detail?.isReminder !== undefined) {
      setIsReminder(detail?.isReminder);
    }
    if (new Date(reminderDateTime) < new Date()) {
      setIsReminder(false);
    }
  }, [details, reminderDateTime, detail?.isReminder]);

  function handleFinished() {
    updateTask({
      id: detail?.id,
      updates: { isCompleted: !detail?.isCompleted },
    });
  }

  function handleDelete() {
    deleteTask(detail?.id, {
      onSuccess: () => toast.success('task deleted'),
    });
    deleteDialog.onClose();
    closeModal(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    updateTask(
      {
        id: detail?.id,
        updates: {
          notes,
          isReminder: isReminder,
          reminderDateTime,
          dueDate: selectedDate,
        },
      },
      {
        onSuccess: () => {
          toast.success();
        },
      }
    );
  }

  const overdue = isOverdue(detail?.dueDate || null);
  return (
    <>
      <Box
        sx={{ width: '100%', p: 2.5, position: 'relative', borderRadius: 2 }}
        className={`space-y-4  ${
          (detail?.isCompleted ||
            isUpdating ||
            isDeletingTask ||
            !detail?.description ||
            overdue) &&
          'opacity-70 pointer-events-none'
        } 
      `}
      >
        <Box>
          {/* <Box> */}
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
                  detail?.isCompleted && 'pointer-events-auto visible  '
                } `}
                sx={{
                  '&.MuiIconButton-root:hover': {
                    color: '#3cff00',
                  },
                }}
              >
                {detail?.isCompleted ? (
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
                  onClick={deleteDialog.onOpen}
                >
                  <HiTrash size={14} />
                </IconButton>
              </Tooltip>

              {/* <DeleteToast open={deleted} onClose={() => setDeleted(false)} /> */}
            </Stack>
          </Stack>
          <Box
            sx={{ fontSize: 14, color: getPriorityColor(detail?.priority) }}
            className=" mt-3 cursor-pointer"
          >
            <Button
              startIcon={<HiHashtag />}
              endIcon={<HiPlusCircle className="" />}
              onClick={() => priorityDialog.onOpen()}
              sx={{
                fontSize: 14,
                color: getPriorityColor(detail?.priority),
                textTransform: 'capitalize',
              }}
              variant="outlined"
              color={getPriorityColor(detail?.priority)}
              size="small"
            >
              {detail?.priority}
            </Button>
          </Box>
          <Box component="form" onSubmit={handleSubmit} className="space-y-2">
            <Typography
              fontSize={{ mobile: 20, laptop: 27 }}
              fontWeight={600}
              variant="h2"
              py={2}
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
                  <MdLabelImportant />
                </IconButton>
              )}
            </Typography>
            <Box className="space-y-3">
              <Reminder
                details={detail}
                updateTask={updateTask}
                isReminder={isReminder}
                isUpdating={isUpdating}
                setIsReminder={setIsReminder}
                setReminderDateTime={setReminderDateTime}
                reminderDateTime={reminderDateTime}
              />
              <AddDueDate
                updateTask={updateTask}
                details={detail}
                isToday={isToday}
                isUpdating={isUpdating}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </Box>

            {/* Notes */}
            <Box className="space-y-3">
              <Typography fontSize={18} fontWeight={500} py={2}>
                Notes
              </Typography>

              <TextareaAutosize
                id={detail?.id}
                style={{
                  resize: 'none',
                }}
                className="border border-gray-600/50 w-full p-1 text-sm outline-none "
                onChange={(e) => setNotes(e.target.value)}
                defaultValue={detail?.notes}
                placeholder="Insert your notes here"
                disabled={isUpdating}
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth>
              Save
            </Button>
          </Box>
          {/* Subtasks */}
          <Box
            className="space-y-3  border border-gray-500"
            sx={{
              margin: '0.75rem 0',
              py: '0.5rem',
              px: '0.5rem',
            }}
          >
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
      </Box>
      <DeleteTask
        open={deleteDialog.isOpen}
        onClose={deleteDialog.onClose}
        handler={handleDelete}
      />
      <SelectPriority
        detail={detail}
        open={priorityDialog.isOpen}
        onClose={priorityDialog.onClose}
      />
    </>
  );
}

export default TaskDetails;

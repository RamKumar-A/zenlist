import { AnimatePresence, motion } from 'framer-motion';

import { HiArrowDown, HiOutlineXMark } from 'react-icons/hi2';

import EmptyTasks from '../../ui/EmptyTasks';
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteTask from '../../ui/DeleteTask';
import { useModal } from '../../hooks/useModal';
import { useDeleteTask } from '../Tasks/useDeleteTask';
import { isOverdue } from '../../helpers/isOverdue';
import { useTask } from '../Tasks/useTask';
import { useState } from 'react';
import { addDays, format, isToday, isTomorrow } from 'date-fns';
import {
  getPriorityColor,
  getStatusColor,
  hex2rgba,
} from '../../helpers/helpers';

const filterData = ['all', 'today', 'tomorrow', 'upcoming'];

function DashboardTask() {
  const { data } = useTask();
  const [filter, setFilter] = useState(filterData.at(0));

  const { deleteTask, isDeleting } = useDeleteTask();
  function handleDelete(list) {
    deleteTask(list?.id);
  }

  const tasks = data.filter((task) => {
    const taskDueDate = new Date(task?.dueDate);
    switch (filter) {
      case 'today':
        return isToday(taskDueDate);
      case 'tomorrow':
        return isTomorrow(taskDueDate);
      case 'upcoming':
        return taskDueDate > addDays(new Date(), 1);
      default:
        return true;
    }
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (value) => {
    setFilter(value);
    handleClose();
  };

  return (
    <>
      <Stack
        sx={{
          bgcolor: 'background.paper',
          p: { mobile: 1, tablet: 3 },
          borderRadius: 3,
        }}
        className="w-full space-y-3 h-full min-h-[70vh]"
      >
        <Stack
          className=""
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" fontWeight={500} fontSize={18}>
            Recent Tasks
          </Typography>

          <Stack direction="row" alignItems="center" gap={2}>
            <Typography>Filter</Typography>
            <Button
              variant="outlined"
              size="small"
              endIcon={<HiArrowDown size={12} />}
              sx={{
                fontSize: 10,
              }}
              onClick={handleClick}
            >
              {filter}
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {filterData.map((filt, i) => (
                <MenuItem
                  dense
                  divider
                  sx={{ textTransform: 'capitalize', fontSize: 12 }}
                  key={filt + i}
                  onClick={() => handleFilter(filt)}
                >
                  {filt}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Stack>
        <Divider sx={{ bgcolor: 'secondary.light' }} />
        {tasks?.length > 0 ? (
          <Box component="ul" className=" space-y-3 overflow-y-auto">
            <Grid2
              container
              component="li"
              width={'100%'}
              className={`p-3 relative  space-x-1 
                `}
              sx={{ borderRadius: 2 }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid2 size={{ mobile: 8, tablet: 6, laptop: 4 }}>
                <Typography
                  component="span"
                  fontSize={{ mobile: 12, tablet: 14 }}
                  fontWeight={600}
                >
                  Title
                </Typography>
              </Grid2>
              <Grid2
                size={2}
                sx={{ display: { mobile: 'none', tablet: 'block' } }}
              >
                <Typography
                  component="span"
                  fontSize={{ mobile: 12, tablet: 14 }}
                  fontWeight={600}
                >
                  Status
                </Typography>
              </Grid2>
              <Grid2 size={2}>
                <Typography
                  component="span"
                  fontSize={{ mobile: 12, tablet: 14 }}
                  fontWeight={600}
                >
                  Priority
                </Typography>
              </Grid2>
              <Grid2
                size={2}
                sx={{ display: { mobile: 'none', laptop: 'block' } }}
              >
                <Typography
                  component="span"
                  fontSize={{ mobile: 12, tablet: 14 }}
                  fontWeight={600}
                >
                  Created On
                </Typography>
              </Grid2>
              <Grid2 size={1}></Grid2>
            </Grid2>
            <AnimatePresence>
              {tasks?.map((task) => (
                <TaskItems
                  task={task}
                  key={'dashboard' + task?.id}
                  isDeleting={isDeleting}
                  handleDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </Box>
        ) : (
          <EmptyTasks />
        )}
      </Stack>
    </>
  );
}

const MotionIconButton = motion.create(IconButton);

function TaskItems({ task, isDeleting, handleDelete }) {
  const deleteDialog = useModal();
  const statusColor = getStatusColor(
    isOverdue(task?.dueDate)
      ? 'overdue'
      : task?.isCompleted
      ? 'completed'
      : 'pending'
  );
  return (
    <>
      <Grid2
        container
        component="li"
        initial={{ scale: 0, opacity: 1 }}
        width={'100%'}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={`p-3 relative space-x-1 origin-right 
  `}
        sx={{
          bgcolor: {
            mobile: hex2rgba(statusColor, 0.2),
            tablet: 'secondary.main',
          },
          borderRadius: 2,
        }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid2 size={{ mobile: 8, tablet: 6, laptop: 4 }}>
          <Typography
            variant="span"
            sx={{
              textDecoration: task?.isCompleted ? 'line-through' : 'normal',
            }}
            fontSize={{ mobile: 14, tablet: 14 }}
            className="line-clamp-1"
          >
            {task?.description}
          </Typography>
        </Grid2>

        <Grid2 size={2} sx={{ display: { mobile: 'none', tablet: 'block' } }}>
          <Typography
            fontSize={{ mobile: 12, tablet: 12 }}
            component="span"
            border={`1px solid ${hex2rgba(statusColor, 0.3)}`}
            px={1}
            py={0.125}
            color={statusColor}
            bgcolor={hex2rgba(statusColor, 0.1)}
            borderRadius="2px"
            textTransform="capitalize"
          >
            {isOverdue(task?.dueDate)
              ? 'Overdue'
              : task?.isCompleted
              ? 'Completed'
              : 'Pending'}
          </Typography>
        </Grid2>
        <Grid2 size={2}>
          <Typography
            fontSize={{ mobile: 12, tablet: 12 }}
            component="span"
            border={`1px solid ${hex2rgba(
              getPriorityColor(task?.priority),
              0.3
            )}`}
            px={1}
            py={0.125}
            color={getPriorityColor(task?.priority)}
            bgcolor={hex2rgba(getPriorityColor(task?.priority), 0.1)}
            borderRadius="2px"
            textTransform="capitalize"
            className=""
          >
            <Typography
              sx={{
                display: { tablet: 'none' },
              }}
              component="span"
              fontSize={{ mobile: 12, tablet: 12 }}
            >
              {task?.priority?.split('')?.at(0)}
            </Typography>
            <Typography
              fontSize={{ mobile: 12, tablet: 12 }}
              sx={{
                display: { mobile: 'none', tablet: 'inline-block' },
              }}
              component="span"
            >
              {task?.priority}
            </Typography>
          </Typography>
        </Grid2>
        <Grid2 size={2} sx={{ display: { mobile: 'none', laptop: 'block' } }}>
          <Typography fontSize={12}>
            {format(task?.created_at, 'dd MMM yyyy')}
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Box className="" onClick={deleteDialog.onOpen}>
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
                disabled={isDeleting}
              >
                <HiOutlineXMark className="" size={16} />
              </MotionIconButton>
            </Tooltip>
          </Box>
        </Grid2>
      </Grid2>
      <DeleteTask
        open={deleteDialog.isOpen}
        onClose={deleteDialog.onClose}
        handler={() => handleDelete(task)}
      />
    </>
  );
}

export default DashboardTask;

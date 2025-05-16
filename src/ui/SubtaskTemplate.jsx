import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { HiOutlineXMark } from 'react-icons/hi2';

import { motion } from 'framer-motion';
import { IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { useUpdateSubtask } from '../features/Tasks/useUpdateSubtask';
import { useDeleteSubtask } from '../features/Tasks/useDeleteSubtask';

function SubtaskTemplate({ st }) {
  const { updateSubTask, isUpdatingSubtask } = useUpdateSubtask();
  const { deleteSubtask, isDeletingSubtask } = useDeleteSubtask();
  function handleDeleteSubTask() {
    deleteSubtask(st?.id);
  }

  function handleFinishedSubTask() {
    updateSubTask({
      id: st?.id,
      updates: {
        isCompleted: !st?.isCompleted,
      },
    });
  }

  return (
    <ListItem
      sx={{ bgcolor: 'secondary.light' }}
      component="li"
      className="h-8 rounded-md p-0.5"
    >
      <IconButton
        className="cursor-pointer"
        disabled={isUpdatingSubtask || isDeletingSubtask}
        onClick={handleFinishedSubTask}
      >
        {st?.isCompleted ? (
          <BsCheckCircleFill className="text-green-500" size={15} />
        ) : (
          <BsCircle className="" size={15} />
        )}
      </IconButton>
      <ListItemText
        primary={<Typography fontSize={15}>{st?.title}</Typography>}
        className=" w-full"
      />
      <MotionIconButton
        disabled={isUpdatingSubtask || isDeletingSubtask}
        className="rounded-full cursor-pointer p-1"
        onClick={handleDeleteSubTask}
        whileHover={{
          backgroundColor: '#ff0000',
          color: '#fff',
          rotate: 180,
        }}
        transition={{ duration: 0.2 }}
        size="small"
      >
        <HiOutlineXMark size={14} />
      </MotionIconButton>
    </ListItem>
  );
}

const MotionIconButton = motion.create(IconButton);

export default SubtaskTemplate;

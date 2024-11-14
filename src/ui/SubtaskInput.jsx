import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useCreateSubtask } from '../features/Tasks/useCreateSubtask';

function SubtaskInput({ details }) {
  const { addSubtask, isAddingSubtask } = useCreateSubtask();
  const { subtasks, id } = details || {};
  const [subtask, setSubtask] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addSubtask({
      isCompleted: false,
      title: subtask,
      taskId: id,
    });

    setSubtask('');
  }

  return (
    <Box
      component="form"
      sx={{ width: { mobile: '100%', laptop: '65%' } }}
      onSubmit={handleSubmit}
    >
      <TextField
        value={subtask}
        onChange={(e) => setSubtask(e.target.value)}
        fullWidth
        label="Add subtask"
        disabled={subtasks?.length >= 3 || isAddingSubtask}
        size="small"
        variant="outlined"
        sx={{
          '& .MuiInputBase-root': {
            height: '2rem',
            fontSize: 13,
          },
          pointerEvents:
            subtasks?.length >= 3 || isAddingSubtask ? 'none' : 'auto',
        }}
      />
    </Box>
  );
}

export default SubtaskInput;

import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useUpdateTask } from '../features/Tasks/useUpdateTask';

function NotesInput({ details, onClose, open }) {
  const [notes, setNotes] = useState('');
  const { id } = details || {};
  const { updateTask, isUpdating } = useUpdateTask();

  function handleSubmit(e) {
    e.preventDefault();
    updateTask({
      id,
      updates: {
        notes,
      },
    });
  }

  return (
    <Dialog
      fullWidth
      maxWidth="tablet"
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
      onClose={onClose}
      open={open}
    >
      <DialogTitle>Add Notes</DialogTitle>
      <DialogContent>
        <TextField
          className=""
          onChange={(e) => setNotes(e.target.value)}
          label="Add Notes"
          variant="outlined"
          disabled={isUpdating}
          required
          autoFocus
          margin="dense"
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotesInput;

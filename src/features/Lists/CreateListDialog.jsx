import { useState } from 'react';
import { useCreateList } from './useCreateList';
import { useUser } from '../Authentication/useUser';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

function CreateListDialog({ open, onClose }) {
  const [inputValue, setInputValue] = useState('');
  const { addList, isAddingList } = useCreateList();
  const { user } = useUser();

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addList({ name: inputValue, userId: user.id });
    setInputValue('');
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
      fullWidth={true}
      maxWidth="tablet"
    >
      <DialogTitle textAlign="center">Add New List</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Enter list name"
          onChange={handleChange}
          value={inputValue}
          size="large"
          required
          disabled={isAddingList}
          autoFocus
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateListDialog;

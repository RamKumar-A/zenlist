import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import { useUpdateTask } from '../features/Tasks/useUpdateTask';

function SelectPriority({ open, onClose, detail }) {
  const [value, setValue] = useState(detail?.priority || 'low');
  const { updateTask, isUpdating } = useUpdateTask();
  function handlePriority(e) {
    updateTask(
      {
        id: detail?.id,
        updates: {
          priority: value,
          isImportant: value === 'high' || detail?.isImportant,
        },
      },
      {
        onSuccess: onClose,
      }
    );
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Priority</DialogTitle>
      <DialogContent
        dividers
        sx={{
          display: 'flex',
          alignItems: '',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <DialogContentText color="contrastText">
          Select your priority
        </DialogContentText>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="low"
            defaultValue={detail?.priority}
            name="radio-buttons-group"
            row
            onChange={(e) => setValue(e.target.value)}
          >
            <FormControlLabel
              value="low"
              control={
                <Radio
                  sx={{
                    color: '#00f',
                    '&.Mui-checked': {
                      color: '#00f',
                    },
                  }}
                />
              }
              label="Low"
            />
            <FormControlLabel
              value="medium"
              control={
                <Radio
                  sx={{
                    color: '#ff9100',
                    '&.Mui-checked': {
                      color: '#ff9100',
                    },
                  }}
                />
              }
              label="Medium"
            />
            <FormControlLabel
              value="high"
              control={
                <Radio
                  sx={{
                    color: '#f00',
                    '&.Mui-checked': {
                      color: '#f00',
                    },
                  }}
                />
              }
              label="High"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button disabled={isUpdating}>Cancel</Button>
        <Button onClick={handlePriority} disabled={isUpdating}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SelectPriority;

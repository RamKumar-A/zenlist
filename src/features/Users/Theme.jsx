import { useState } from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { useModal } from '../../hooks/useModal';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
} from '@mui/material';
import { MdOutlineInvertColors } from 'react-icons/md';

function Theme() {
  const themeDialog = useModal();
  const { mode, setTheme } = useDarkMode();
  const [radioValue, setRadioValue] = useState(mode);

  return (
    <>
      <ListItem>
        <ListItemButton
          variant="contained"
          onClick={themeDialog.onOpen}
          sx={{ width: '100%' }}
          disableElevation
        >
          <ListItemIcon>
            <Avatar>
              <MdOutlineInvertColors />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </ListItemButton>
      </ListItem>
      <Dialog open={themeDialog.isOpen} onClose={themeDialog.onClose}>
        <DialogTitle>Select Theme</DialogTitle>
        <DialogContent dividers>
          <RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            row
            value={radioValue}
            onChange={(event) => {
              setTheme(event.target.value);
              setRadioValue(event.target.value);
            }}
            sx={{ color: 'text.primary' }}
          >
            <FormControlLabel
              value="system"
              control={<Radio />}
              label="System"
            />
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Theme;

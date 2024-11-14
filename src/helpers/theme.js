import { createTheme } from '@mui/material';
// import '@fontsource/nunito';

const getDesignTokens = (mode) => ({
  palette: {
    ...(mode === 'light'
      ? {
          secondary: {
            main: '#f5f5f5',
            light: '#d6d8dd',
          },
          background: {
            default: '#0075c6',
            paper: '#fafafa',
          },
          text: {
            primary: '#000',
            secondary: '#fff',
          },
          common: {
            text: { primary: '#000' },
          },
        }
      : {
          primary: {
            main: '#0047ff',
            contrastText: '#fff',
          },
          secondary: {
            light: '#606060',
            main: '#3c3c3c',
          },
          background: {
            default: '#0075c6',
            paper: '#181c1d',
          },
          text: {
            primary: '#fff',
            secondary: '#fff',
          },
          common: {
            text: { primary: '#000' },
          },
        }),
  },
  typography: {
    fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif', // Change this to your desired font
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            // color: '#000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#434343',
            },
            '&:hover fieldset': {
              borderColor: '#64b5f6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#42a5f5',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#1976d2',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#42a5f5',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          '&:hover': {
            color: theme.palette.primary.light,
          },
        }),
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));

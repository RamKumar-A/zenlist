// fullname, password, email
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSignup } from './useSignup';
import { useLogin } from './useLogin';
import { useCreateList } from '../Lists/useCreateList';
import Spinner from '../../ui/Spinner';

function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { signup, isSignupSuccess, isSigupPending } = useSignup();
  const { login } = useLogin();
  const { addList } = useCreateList();

  function handleSubmit(e) {
    e.preventDefault();
    signup(
      { fullName, email, password },
      {
        onSuccess: (user, credentials) => {
          addList({ name: 'Personal', userId: user.user.id });

          const { email, password } = credentials;
          login({ email, password });
        },
      }
    );
  }

  if (isSigupPending) {
    return <Spinner />;
  }

  if (isSignupSuccess) {
    return (
      <Snackbar
        open={isSignupSuccess}
        autoHideDuration={6000}
        message="Account successfully created! Please verify the new account from the user's email address"
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    );
  }
  return (
    <Stack
      sx={{
        height: '100vh',
        bgcolor: 'primary.main',
        p: 1,
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        sx={{
          width: {
            mobile: '100%',
            tablet: '50%',
            laptop: '40%',
            desktop: '30%',
          },
          bgcolor: 'white',
          boxShadow: 6,
          borderRadius: '10px',
        }}
        className="space-y-5 p-5"
      >
        <Box className="w-full flex items-center justify-start">
          <img src="/logo.png" alt="Logo" className="w-12 rounded" />
        </Box>
        <Box sx={{ textAlign: 'left', py: 2 }}>
          <Typography
            variant="h3"
            fontSize={{ mobile: '1.5rem', laptop: '2.25rem' }}
            fontWeight={600}
          >
            Get started
          </Typography>
          <Typography variant="p" fontSize={{ mobile: '0.85rem' }}>
            Welcome to Zenlist - Let's create your account
          </Typography>
        </Box>
        <Box className="space-y-5">
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Fullname"
              size="small"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              size="small"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              size="small"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box className="p-3 self-center w-full">
              <Button type="submit" sx={{ width: '100%' }} variant="contained">
                Sign Up
              </Button>
            </Box>
          </Stack>
          <Typography textAlign="center">
            Already have an account?{' '}
            <NavLink to="/login" className="text-blue-600 underline">
              Log in
            </NavLink>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default SignupForm;

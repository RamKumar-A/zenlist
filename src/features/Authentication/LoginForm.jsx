import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLogin } from './useLogin';
import Spinner from '../../ui/Spinner';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLogging } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return null;
    login({ email, password });
  }
  if (isLogging) {
    return <Spinner />;
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
        <Box className="w-12 flex items-center justify-center">
          <img
            src="../../android-chrome-512x512.png"
            alt="Logo"
            className="w-full rounded"
          />
        </Box>
        <Box sx={{ textAlign: 'left', py: 2 }}>
          <Typography
            variant="h3"
            fontSize={{ mobile: '1.5rem', laptop: '2.25rem' }}
            fontWeight={600}
          >
            Log in
          </Typography>
          <Typography variant="p" fontSize={{ mobile: '0.85rem' }}>
            Welcome to Zenlist - please put in your login credentials
          </Typography>
        </Box>
        <Box className="space-y-5">
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              size="small"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              size="small"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Box>
              <Button>Forget Password?</Button>
            </Box> */}
            <Box className="p-3 self-center w-full">
              <Button type="submit" sx={{ width: '100%' }} variant="contained">
                Log in
              </Button>
            </Box>
          </Stack>
          <Typography textAlign="center">
            Don't have an account?{' '}
            <NavLink to="/signup" className="text-blue-600 underline">
              Sign up
            </NavLink>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default LoginForm;

import { useNavigate } from 'react-router';
import { useUser } from '../features/Authentication/useUser';
import { useEffect } from 'react';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const { isUserPending, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated && !isUserPending) navigate('/login');
    },
    [isAuthenticated, isUserPending, navigate]
  );

  if (isUserPending) return <Spinner />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

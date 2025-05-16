import { Navigate } from 'react-router';
import { useUser } from '../features/Authentication/useUser';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const { isUserPending, isAuthenticated } = useUser();

  if (isUserPending) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;

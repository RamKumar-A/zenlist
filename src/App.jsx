// import { Suspense ,lazy} from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { DarkModeProvider } from './context/DarkModeContext';
import AppLayout from './ui/AppLayout';

import MyDayPage from './pages/MydayPage';
import ImportantTasksPage from './pages/ImportantTasksPage';
import AllTasksPage from './pages/AllTasksPage';
import Dashboard from './pages/Dashboard';
import ListsPage from './pages/ListsPage';
import Error from './ui/Error';
import SignupForm from './features/Authentication/SignupForm';
import LoginForm from './features/Authentication/LoginForm';
import ProtectedRoute from './ui/ProtectedRoute';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/mydaytasks" />,
      },
      {
        element: <MyDayPage />,
        path: '/mydaytasks',
      },
      {
        element: <ImportantTasksPage />,
        path: '/importanttasks',
      },
      {
        element: <AllTasksPage />,
        path: '/alltasks',
      },
      {
        element: <Dashboard />,
        path: '/dashboard',
        errorElement: <Error />,
      },
      {
        element: <ListsPage />,
        path: '/mylist/:list',
        errorElement: <Error />,
      },
    ],
  },
  {
    element: <SignupForm />,
    path: '/signup',
  },
  {
    element: <LoginForm />,
    path: '/login',
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;

// import { Suspense ,lazy} from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import { Toaster } from 'react-hot-toast';
import PriorityPage from './pages/PriorityPage';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate replace to="/mydaytasks" />,
      // },
      {
        index: true,
        element: <Dashboard />,
        path: '/',
        errorElement: <Error />,
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
        element: <ListsPage />,
        path: '/mylist/:list',
        errorElement: <Error />,
      },
      {
        element: <PriorityPage />,
        path: '/priority/:priorityTag',
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
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              border: '1px solid #000',
              color: '#000',
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;

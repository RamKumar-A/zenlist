// import { Suspense ,lazy} from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import { DarkModeProvider } from './context/DarkModeContext';
import AppLayout from './ui/AppLayout';

import MyDayPage from './pages/MydayPage';
import ImportantTasksPage from './pages/ImportantTasksPage';
import AllTasksPage from './pages/AllTasksPage';
import Dashboard from './pages/Dashboard';
import ListsPage from './pages/ListsPage';
import Error from './ui/Error';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <MyDayPage />,
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
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '15px' }}
          toastOptions={{
            success: {
              duration: 2000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: { duration: 1500 },
            style: {
              fontSize: '0.95rem',
              padding: '0.95rem',
            },
          }}
        />
      </DarkModeProvider>
    </>
  );
}

export default App;

// Suspense :React component allows to wait for something before rendering, used with React.lazy for code splitting

/* <Suspense fallBack={<Spinner/>}> */

/* </Suspense> */

// for Lazy loading //lazy loading used for loading the data only when it is actually needed

// import Spinner from './ui/Spinner';

// const MyDayPage = lazy(() => import('./pages/MydayPage'));
// const ImportantTasksPage = lazy(() => import('./pages/ImportantTasksPage'));
// const AllTasksPage = lazy(() => import('./pages/AllTasksPage'));
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const ListsPage = lazy(() => import('./pages/ListsPage'));
// const Error = lazy(() => import('./ui/Error'));

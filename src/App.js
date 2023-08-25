import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ErrorPage from './pages/Error/Error';
import Overview from './components/Overview/Overview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Overview />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

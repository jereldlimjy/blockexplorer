import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ErrorPage from './pages/Error/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

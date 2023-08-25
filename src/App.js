import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ErrorPage from './pages/Error/Error';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

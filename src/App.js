import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ErrorPage from './pages/Error/Error';
import Home from './pages/Home/Home';
import Transactions from './pages/Transactions/Transactions';
import Transaction from './pages/Transaction/Transaction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/txs/:blockNum',
        element: <Transactions />
      },
      {
        path: '/tx/:txHash',
        element: <Transaction />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

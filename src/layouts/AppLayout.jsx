import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-8 mt-8">
        <Outlet />
      </div>
    </div>
  );
}

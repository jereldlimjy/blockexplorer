import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function AppLayout() {
  return <div>
    <Navbar />
    <div className="px-8 mt-8 sm:px-16">
      <Outlet />
    </div>
  </div>;
}
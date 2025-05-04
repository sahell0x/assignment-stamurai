import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
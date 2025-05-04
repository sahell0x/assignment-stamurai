import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare,CheckCircle2 } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
  ];
  
  return (
    <div className="hidden md:flex flex-col w-64 bg-white shadow-sm">
      <div className="flex h-16 items-center px-6 border-b border-gray-100">
        <div className="flex items-center">
          <CheckCircle2 className="h-8 w-8 text-blue-500" />
          <span className="ml-2 text-lg font-semibold">Taskly</span>
        </div>
      </div>
      
      <nav className="mt-6 px-4 flex-1">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50 font-medium' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    
    </div>
  );
};

export default Sidebar;
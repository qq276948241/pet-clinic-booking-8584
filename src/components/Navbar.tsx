import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, ClipboardList, PawPrint } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-primary-100 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">爱宠医院</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              className={`nav-link flex items-center gap-2 ${
                isActive('/') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>首页</span>
            </NavLink>
            <NavLink
              to="/booking"
              className={`nav-link flex items-center gap-2 ${
                isActive('/booking') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>预约挂号</span>
            </NavLink>
            <NavLink
              to="/my-appointments"
              className={`nav-link flex items-center gap-2 ${
                isActive('/my-appointments') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>我的预约</span>
            </NavLink>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <NavLink
              to="/"
              className={`nav-link flex flex-col items-center gap-1 px-3 py-2 ${
                isActive('/') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">首页</span>
            </NavLink>
            <NavLink
              to="/booking"
              className={`nav-link flex flex-col items-center gap-1 px-3 py-2 ${
                isActive('/booking') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs">预约</span>
            </NavLink>
            <NavLink
              to="/my-appointments"
              className={`nav-link flex flex-col items-center gap-1 px-3 py-2 ${
                isActive('/my-appointments') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span className="text-xs">我的</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

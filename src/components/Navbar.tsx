import { NavLink } from 'react-router-dom';
import { Home, CalendarDays, ClipboardList, PawPrint } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-primary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">爱心宠物医院</h1>
              <p className="text-xs text-gray-500">专业·关爱·守护</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">首页</span>
            </NavLink>

            <NavLink
              to="/booking"
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <CalendarDays className="w-4 h-4" />
              <span className="hidden sm:inline">预约挂号</span>
            </NavLink>

            <NavLink
              to="/my-appointments"
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">我的预约</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

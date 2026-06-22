import { NavLink, Link } from 'react-router-dom';
import { Home, CalendarCheck, ClipboardList, PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <PawPrint className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">爱宠医院</span>
          </Link>
          
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  'nav-link flex items-center gap-2',
                  isActive ? 'nav-link-active' : 'nav-link-inactive'
                )
              }
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">首页</span>
            </NavLink>
            
            <NavLink
              to="/booking"
              className={({ isActive }) =>
                cn(
                  'nav-link flex items-center gap-2',
                  isActive ? 'nav-link-active' : 'nav-link-inactive'
                )
              }
            >
              <CalendarCheck className="w-5 h-5" />
              <span className="hidden sm:inline">预约挂号</span>
            </NavLink>
            
            <NavLink
              to="/my-appointments"
              className={({ isActive }) =>
                cn(
                  'nav-link flex items-center gap-2',
                  isActive ? 'nav-link-active' : 'nav-link-inactive'
                )
              }
            >
              <ClipboardList className="w-5 h-5" />
              <span className="hidden sm:inline">我的预约</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

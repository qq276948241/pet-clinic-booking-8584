import { NavLink, Link } from 'react-router-dom';
import { PawPrint, CalendarCheck, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const navItems = [
    { to: '/', label: '首页', icon: PawPrint },
    { to: '/appointment', label: '预约挂号', icon: CalendarDays },
    { to: '/my-appointments', label: '我的预约', icon: CalendarCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
              <PawPrint size={22} />
            </div>
            <span className="text-lg font-bold text-gray-800">萌宠医院</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'nav-link flex items-center gap-2 text-sm',
                    isActive && 'nav-link-active'
                  )
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

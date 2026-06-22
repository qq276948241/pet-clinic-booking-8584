import { NavLink, Link } from 'react-router-dom';
import { Stethoscope, CalendarCheck, Clock } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { path: '/', label: '首页', icon: Stethoscope },
    { path: '/booking', label: '预约挂号', icon: CalendarCheck },
    { path: '/my-appointments', label: '我的预约', icon: Clock },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">爱宠医院</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
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

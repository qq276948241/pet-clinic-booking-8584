import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Appointment from '@/pages/Appointment';
import MyAppointments from '@/pages/MyAppointments';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Routes>
      </div>
    </Router>
  );
}

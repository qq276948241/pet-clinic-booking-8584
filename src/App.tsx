import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Booking from "@/pages/Booking";
import MyAppointments from "@/pages/MyAppointments";
import Navbar from "@/components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-100 py-6 mt-12">
          <div className="container text-center text-sm text-gray-500">
            <p>© 2024 爱宠医院 版权所有 | 专业、贴心、值得信赖</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Booking from "@/pages/Booking";
import MyAppointments from "@/pages/MyAppointments";
import Navbar from "@/components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary-50/30">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

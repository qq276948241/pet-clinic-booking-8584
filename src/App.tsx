import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Booking from "@/pages/Booking";
import MyAppointments from "@/pages/MyAppointments";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

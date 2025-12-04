// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HRLogin from "./pages/HRLogin";
import HRSignup from "./pages/HRSignup";
import ResumeSummarizer from "./pages/ResumeSummarizer";

function App() {
  return (
    <div className="min-h-screen bg-[#F4E9D8] text-gray-900">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hr-login" element={<HRLogin />} />
        <Route path="/hr-signup" element={<HRSignup />} />
        <Route path="/summarizer" element={<ResumeSummarizer />} />
      </Routes>
    </div>
  );
}

export default App;

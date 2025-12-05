// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HRLogin from "./pages/HRLogin";
import HRSignup from "./pages/HRSignup";
import ResumeSummarizer from "./pages/ResumeSummarizer";
import HRDashboard from "./pages/HRDashboard";
import CreateJob from "./pages/CreateJob";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import HRApplicants from "./pages/HRApplicants";

function App() {
  return (
    <div className="min-h-screen bg-[#F4E9D8] text-gray-900">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* HR */}
        <Route path="/hr-login" element={<HRLogin />} />
        <Route path="/hr-signup" element={<HRSignup />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/hr-applicants/:jobId" element={<HRApplicants />} />

        {/* APPLICANT */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />

        {/* Summarizer */}
        <Route path="/summarizer" element={<ResumeSummarizer />} />
      </Routes>
    </div>
  );
}
export default App;

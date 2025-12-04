// src/pages/Welcome.jsx
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F4E9D8]">
      <h1 className="text-4xl font-bold text-[#3F3A32] mb-6">CareerConnect</h1>
      <p className="text-lg mb-8 text-[#3F3A32]">Are you an Applicant or HR Manager?</p>
      
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-[#BDE4C8] text-[#3F3A32] rounded-xl font-semibold hover:opacity-80 transition"
        >
          Applicant
        </button>

        <button
          onClick={() => navigate("/hr-login")}
          className="px-6 py-3 bg-[#C8E4BD] text-[#3F3A32] rounded-xl font-semibold hover:opacity-80 transition"
        >
          HR Manager
        </button>
      </div>
    </div>
  );
}

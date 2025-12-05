// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/jobs"); // redirect applicant to jobs page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F4E9D8]">
      <div className="w-80 p-8 bg-white/60 backdrop-blur rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#3F3A32] mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-xl focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-xl focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#BDE4C8] text-[#3F3A32] rounded-xl font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#3F3A32] underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

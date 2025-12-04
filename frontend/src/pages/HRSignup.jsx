// src/pages/HRSignup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function HRSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save HR info in Firebase DB
      await set(ref(db, "hrUsers/" + user.uid), {
        name,
        email,
        company,
        createdAt: new Date().toISOString(),
        verified: false, // mark as unverified initially
      });

      alert("Your account has been created. Please wait for verification.");
      navigate("/hr-login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold text-[#3F3A32] mb-6">HR Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Work Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#BDE4C8] text-[#3F3A32] rounded-xl font-semibold hover:opacity-80 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

// src/pages/Jobs.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jobsRef = ref(db, "jobs/");
    onValue(jobsRef, (snap) => {
      const data = snap.val() || {};
      setJobs(
        Object.entries(data).map(([id, job]) => ({
          id,
          ...job,
        }))
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F2] p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-[#3F3A32]">Available Jobs</h1>
          <p className="text-sm text-gray-600 mt-1">Browse open roles and apply with your profile</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="p-3 bg-[#BDE4C8] rounded-full hover:opacity-80 transition shadow-md"
            title="Go to Profile"
          >
            <FiUser size={22} className="text-[#3F3A32]" />
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-[#3F3A32]">{job.title}</h2>
                <p className="text-sm text-gray-500">{job.location || "Remote/Onsite"}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Openings</div>
                <div className="text-lg font-bold text-[#3F3A32]">{job.positions || 1}</div>
              </div>
            </div>

            <p className="mt-3 text-gray-700 line-clamp-4">{job.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(job.keywords || "")
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean)
                .slice(0, 6)
                .map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-[#F2F0E8] rounded-full border text-gray-700"
                  >
                    {kw}
                  </span>
                ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => navigate(`/profile?apply=${job.id}`)}
                className="px-5 py-2 bg-[#BDE4C8] text-[#3F3A32] font-semibold rounded-xl hover:opacity-80 transition shadow"
              >
                Apply
              </button>

              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="px-4 py-2 border rounded-xl text-sm"
                disabled
                title="View details (coming soon)"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

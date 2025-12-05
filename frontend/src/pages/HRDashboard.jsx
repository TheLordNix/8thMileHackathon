// src/pages/HRDashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2, FiEdit, FiUsers } from "react-icons/fi";

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jobsRef = ref(db, "jobs/");
    onValue(jobsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setJobs(Object.entries(data).map(([id, job]) => ({ id, ...job })));
    });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this job posting?")) return;
    await remove(ref(db, "jobs/" + id));
  };

  return (
    <div className="min-h-screen p-8 bg-[#F4E9D8]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3F3A32]">HR Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Manage job postings and view applicants</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/create-job")}
            className="flex items-center gap-2 px-4 py-2 bg-[#BDE4C8] rounded-lg shadow"
          >
            <FiPlus /> Create Job Posting
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl p-6 shadow border border-[#E6DCC3]">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-[#3F3A32]">{job.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{job.location || "Remote/Onsite"} • {job.jobType}</p>
                <p className="mt-3 text-gray-700 text-sm line-clamp-3">{job.description}</p>

                <div className="mt-3 flex gap-2 flex-wrap">
                  {(job.keywords || "")
                    .split(",")
                    .map(k => k.trim())
                    .filter(Boolean)
                    .slice(0, 8)
                    .map((kw, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-[#F8F6F1] rounded-full text-gray-700">{kw}</span>
                    ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="text-sm text-gray-500">Openings</div>
                <div className="text-lg font-bold text-[#3F3A32]">{job.positions || 1}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate(`/create-job?id=${job.id}`)}
                className="px-3 py-2 bg-[#FFF6EA] rounded-lg flex items-center gap-2"
              >
                <FiEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(job.id)}
                className="px-3 py-2 bg-[#FFECEC] rounded-lg flex items-center gap-2 text-red-700"
              >
                <FiTrash2 /> Delete
              </button>

              <button
                onClick={() => navigate(`/hr-applicants/${job.id}`)}
                className="ml-auto px-3 py-2 bg-[#E8F8EE] rounded-lg flex items-center gap-2"
              >
                <FiUsers /> View Applicants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

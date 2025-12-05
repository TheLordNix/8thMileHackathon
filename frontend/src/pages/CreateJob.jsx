// src/pages/CreateJob.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { ref, set, get } from "firebase/database";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CreateJob() {
  const [params] = useSearchParams();
  const editId = params.get("id");

  // more professional fields
  const [title, setTitle] = useState("");
  const [positions, setPositions] = useState(1);
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("Remote");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (editId) {
      const jobRef = ref(db, "jobs/" + editId);
      get(jobRef).then((snap) => {
        if (snap.exists()) {
          const job = snap.val();

          // Verify ownership
          if (auth.currentUser && job.hrId && job.hrId !== auth.currentUser.uid) {
            alert("You are not authorized to edit this job.");
            navigate("/hr-dashboard");
            return;
          }

          setTitle(job.title || "");
          setPositions(job.positions || 1);
          setKeywords(job.keywords || "");
          setDescription(job.description || "");
          setExperience(job.experience || "");
          setJobType(job.jobType || "Remote");
          setLocation(job.location || "");
          setSalaryRange(job.salaryRange || "");
          setResponsibilities(job.responsibilities || "");
          setRequirements(job.requirements || "");
        }
      });
    }
  }, [editId, navigate]);

  const saveJob = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("You must be logged in to create a job.");
      return;
    }

    const id = editId || Date.now().toString();

    // If editing, we should preserve the original hrId, but for simplicity in this structure
    // we can re-assert it or fetch it. Since we verified ownership above, we can just use currentUser.uid
    // However, to be safe and support the case where we might not have fetched it yet (if logic changes),
    // let's just write it.

    await set(ref(db, "jobs/" + id), {
      title,
      positions,
      keywords,
      description,
      experience,
      jobType,
      location,
      salaryRange,
      responsibilities,
      requirements,
      createdAt: new Date().toISOString(),
      hrId: auth.currentUser.uid, // Add HR ID
    });

    navigate("/hr-dashboard");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E6DCC3]">
        <h1 className="text-2xl font-bold mb-4 text-[#3F3A32]">
          {editId ? "Edit Job Posting" : "Create Job Posting"}
        </h1>

        <form onSubmit={saveJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            className="col-span-1 md:col-span-2 p-3 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Open Positions"
            className="p-3 border rounded-lg"
            value={positions}
            onChange={(e) => setPositions(e.target.value)}
            required
            min={1}
          />

          <select
            className="p-3 border rounded-lg"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option>Remote</option>
            <option>Onsite</option>
            <option>Hybrid</option>
          </select>

          <input
            type="text"
            placeholder="Location (city, country)"
            className="p-3 border rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="text"
            placeholder="Salary Range (e.g. 10k-20k)"
            className="p-3 border rounded-lg md:col-span-2"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
          />

          <input
            type="text"
            placeholder="Keywords (comma separated)"
            className="col-span-1 md:col-span-2 p-3 border rounded-lg"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            required
          />

          <textarea
            placeholder="Short Description"
            rows="4"
            className="col-span-1 md:col-span-2 p-3 border rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <textarea
            placeholder="Responsibilities (bullet lines separated by ; )"
            rows="3"
            className="p-3 border rounded-lg"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
          />

          <textarea
            placeholder="Requirements (bullet lines separated by ; )"
            rows="3"
            className="p-3 border rounded-lg"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />

          <input
            type="text"
            placeholder="Experience (e.g. 3+ years in Backend)"
            className="p-3 border rounded-lg"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <div className="col-span-1 md:col-span-2 flex gap-3 mt-3">
            <button className="px-6 py-3 bg-[#BDE4C8] rounded-xl font-semibold">Save Job</button>
            <button
              type="button"
              onClick={() => navigate("/hr-dashboard")}
              className="px-6 py-3 border rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

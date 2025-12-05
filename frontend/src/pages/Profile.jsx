// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, set, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSearchParams } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [params] = useSearchParams();
  const applyJobId = params.get("apply");

  const [education, setEducation] = useState("");
  const [work, setWork] = useState("");
  const [projects, setProjects] = useState("");
  const [certs, setCerts] = useState("");
  const [achievements, setAchievements] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const resumeRef = ref(db, "users/" + user.uid + "/resume");
      const snap = await get(resumeRef);
      if (snap.exists()) {
        const r = snap.val();
        setEducation(r.education || "");
        setWork(r.work || "");
        setProjects(r.projects || "");
        setCerts(r.certs || "");
        setAchievements(r.achievements || "");
      }
    };
    load();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return alert("Not logged in");
    setSaving(true);
    try {
      const resumeText =
        "Education:\n" + education +
        "\n\nWork Experience:\n" + work +
        "\n\nProjects:\n" + projects +
        "\n\nCertifications:\n" + certs +
        "\n\nAchievements:\n" + achievements;

      await set(ref(db, "users/" + user.uid + "/resume"), {
        education,
        work,
        projects,
        certs,
        achievements,
      });

      if (applyJobId) {
        await set(ref(db, `jobs/${applyJobId}/applicants/${user.uid}`), {
          resumeText,
          appliedAt: new Date().toISOString(),
        });
        alert("Applied successfully!");
      } else {
        alert("Profile saved successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow border border-[#E6DCC3]">
        <h1 className="text-2xl font-bold mb-4 text-[#3F3A32]">Your Profile</h1>
        <p className="text-sm text-gray-600 mb-4">Fill in sections and save. Use Save + Apply when you arrived via an Apply button.</p>

        <div className="space-y-4">
          <label className="text-sm font-medium">Education</label>
          <textarea value={education} onChange={(e) => setEducation(e.target.value)} rows="4" className="w-full p-3 border rounded-lg" />

          <label className="text-sm font-medium">Work Experience</label>
          <textarea value={work} onChange={(e) => setWork(e.target.value)} rows="4" className="w-full p-3 border rounded-lg" />

          <label className="text-sm font-medium">Projects</label>
          <textarea value={projects} onChange={(e) => setProjects(e.target.value)} rows="4" className="w-full p-3 border rounded-lg" />

          <label className="text-sm font-medium">Certifications</label>
          <textarea value={certs} onChange={(e) => setCerts(e.target.value)} rows="3" className="w-full p-3 border rounded-lg" />

          <label className="text-sm font-medium">Achievements</label>
          <textarea value={achievements} onChange={(e) => setAchievements(e.target.value)} rows="3" className="w-full p-3 border rounded-lg" />

          <div className="flex gap-3 mt-4">
            <button onClick={saveProfile} disabled={saving} className="px-6 py-3 bg-[#BDE4C8] rounded-xl font-semibold">
              {applyJobId ? "Save & Apply" : "Save Profile"}
            </button>

            <button onClick={() => { /* option: navigate back */ }} className="px-6 py-3 border rounded-xl">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

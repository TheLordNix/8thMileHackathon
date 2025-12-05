import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, get, set } from 'firebase/database';
import { useParams } from 'react-router-dom';

export default function HRApplicants() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const jobSnap = await get(ref(db, 'jobs/' + jobId));
      const jobData = jobSnap.val();
      setJob(jobData);

      const appsSnap = await get(ref(db, `jobs/${jobId}/applicants`));
      const apps = appsSnap.val() || {};

      const formatted = await Promise.all(
        Object.entries(apps).map(async ([uid, a]) => {
          const profileSnap = await get(ref(db, 'users/' + uid + '/resume'));
          const profile = profileSnap.val() || {};
          return {
            uid,
            resumeText: a.resumeText || '',
            appliedAt: a.appliedAt || '—',
            summary: a.summary || '',
            score: a.score ?? null,
            profile,
          };
        })
      );

      setApplicants(formatted);
    };
    load();
  }, [jobId]);

  const generateScore = async (applicant) => {
    if (!job) return alert('Job not loaded');
    setLoading(true);
    try {
      // ✅ FIXED: Use correct port 3001
      const res = await fetch('http://localhost:3001/ai/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: applicant.resumeText,
          jobKeywords: job.keywords || ''
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log('Score response:', data);

      // ✅ Update Firebase with both score and summary
      await set(ref(db, `jobs/${jobId}/applicants/${applicant.uid}/score`), data.score);
      await set(ref(db, `jobs/${jobId}/applicants/${applicant.uid}/summary`), data.summary);

      // ✅ Update local state to show score immediately
      setApplicants(prev =>
        prev.map(p =>
          p.uid === applicant.uid
            ? { ...p, score: data.score, summary: data.summary }
            : p
        )
      );

      alert(`Score: ${data.score}/100`);
    } catch (err) {
      console.error('Error generating score:', err);
      alert('Error generating score: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-[#F4EDE3]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3F3A32] mb-4">Applicants for: {job?.title || 'Loading...'}</h1>
        <p className="text-sm text-gray-600 mb-6">{job?.description}</p>

        <div className="space-y-6">
          {applicants.length === 0 && <div className="text-gray-600">No applicants yet.</div>}

          {applicants.map(a => (
            <div key={a.uid} className="bg-white rounded-2xl p-6 border border-[#EDE0C9] shadow">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#3F3A32]">Applicant: {a.uid}</h2>
                  <p className="text-sm text-gray-600 mt-1">Applied: {a.appliedAt}</p>
                </div>

                <div className="text-right">
                  {a.score !== null ? (
                    <div className="text-2xl font-bold text-green-700">{a.score} / 100</div>
                  ) : (
                    <div className="text-sm text-gray-600">Not scored</div>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700">Profile</h3>
                  <p className="text-sm whitespace-pre-wrap mt-2 text-gray-700">{a.profile.education}</p>
                  <p className="text-sm whitespace-pre-wrap mt-2 text-gray-700">{a.profile.work}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700">Resume Full Text</h3>
                  <p className="text-sm whitespace-pre-wrap mt-2 text-gray-700">{a.resumeText}</p>
                </div>
              </div>

              {a.summary && (
                <div className="mt-4 bg-[#FBFBF8] p-3 rounded-lg border text-sm">
                  <strong>Summary:</strong>
                  <div className="mt-2 whitespace-pre-wrap">{a.summary}</div>
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => generateScore(a)}
                  className="px-4 py-2 bg-[#BDE4C8] rounded-xl shadow disabled:opacity-50 font-semibold"
                  disabled={loading}
                >
                  {a.score !== null ? 'Regenerate Score' : 'Generate Score'}
                </button>

                <a
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(a.resumeText)}`}
                  download={`resume-${a.uid}.txt`}
                  className="px-4 py-2 border rounded-xl text-sm"
                >
                  Download Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
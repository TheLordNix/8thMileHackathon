// src/pages/ResumeSummarizer.jsx
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from "../firebase";
import { ref, set } from "firebase/database";

export default function ResumeSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setSummary(null);

    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in to submit.');
        return;
      }

      setLoading(true);
      // call your backend summarizer (adjust URL/port as needed)
      const res = await fetch('http://localhost:3001/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      setSummary(data.summary);

      // save to firebase under user
      await set(ref(db, "users/" + user.uid + "/summary"), {
        summary: data.summary,
        updatedAt: new Date().toISOString()
      });

      alert("Summary saved to your profile.");
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-12 bg-[#F4E9D8] text-[#3F3A32]">
      <div className="w-full max-w-3xl p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Resume / Project Summarizer</h1>
        <p className="mb-4 text-sm">Paste project descriptions, experience, or resume text below. AI will summarize into concise bullets.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Paste project descriptions (example: Developed ... used React, Node)..."
            className="w-full p-3 border rounded-lg resize-y"
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#BDE4C8] text-[#3F3A32] rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Summarizing...' : 'Summarize & Save'}
            </button>

            <button
              type="button"
              onClick={() => {
                setText('');
                setSummary(null);
                setError('');
              }}
              className="px-4 py-2 border rounded-xl text-sm"
            >
              Clear
            </button>
          </div>
        </form>

        {error && <div className="mt-4 p-3 bg-red-100 text-red-600 rounded">{error}</div>}

        {summary && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="font-semibold mb-2">✓ AI Summary</h2>
            <div className="whitespace-pre-wrap text-sm">{summary}</div>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-600">
          Note: summaries are generated via AI and saved to your account's Realtime Database.
        </div>
      </div>
    </div>
  );
}

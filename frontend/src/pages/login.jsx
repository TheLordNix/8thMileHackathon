export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold text-[#3F3A32] mb-6">Login As</h2>

      <div className="flex gap-6">
        <a
          href="/hr"
          className="px-6 py-3 bg-[#BDE4C8] text-[#3F3A32] rounded-xl font-semibold hover:opacity-80 transition"
        >
          HR
        </a>

        <a
          href="/applicant"
          className="px-6 py-3 bg-[#BDE4C8] text-[#3F3A32] rounded-xl font-semibold hover:opacity-80 transition"
        >
          Applicant
        </a>
      </div>
    </div>
  );
}

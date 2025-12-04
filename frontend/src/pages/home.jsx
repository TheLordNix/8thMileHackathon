export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-[#3F3A32]">CareerConnect</h1>
      <p className="text-lg mt-2 text-gray-600">Find the perfect match between Applicants & HRs</p>

      <a
        href="/login"
        className="mt-6 px-6 py-3 bg-[#BDE4C8] text-[#3F3A32] rounded-xl font-semibold hover:opacity-80 transition"
      >
        Get Started
      </a>
    </div>
  );
}

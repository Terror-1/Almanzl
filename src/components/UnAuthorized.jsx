import { Link } from "react-router-dom";

export default function UnAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-bold mb-4 text-black">403</h1>
      <h2 className="text-2xl font-semibold mb-6">Unauthorized</h2>
      <p className="text-gray-600 mb-8">
        Sorry, the page you're not authorized to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#232f3e] text-white rounded-sm hover:bg-black transition"
      >
        Go to Home
      </Link>
    </div>
  );
}

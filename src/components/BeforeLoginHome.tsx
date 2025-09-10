import { Link } from "react-router-dom";
import { FaHome, FaBriefcase, FaRegQuestionCircle } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
export default function BeforeLoginHome() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/src/assets/logo.png" alt="Logo" className="w-15" />
        <span className="font-semibold text-lg">Professional Search</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex flex-col items-center text-sm hover:text-gray-600">
          <FaHome className="text-xl" />
          Home
        </Link>
        <Link to="/find-job" className="flex flex-col items-center text-sm hover:text-gray-600">
          <FaBriefcase className="text-xl" />
          Find Job
        </Link>
        <Link to="/post-job" className="flex flex-col items-center text-sm hover:text-gray-600">
          <MdPostAdd className="text-xl" />
          Post Job
        </Link>
        <Link to="/help" className="flex flex-col items-center text-sm hover:text-gray-600">
          <FaRegQuestionCircle className="text-xl" />
          Help
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-4 py-1 border rounded-md hover:bg-gray-100"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-1 rounded-md bg-black text-white hover:bg-gray-800"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

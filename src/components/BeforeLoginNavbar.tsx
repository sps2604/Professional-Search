import { useNavigate } from "react-router-dom";
import { FaHome, FaBriefcase, FaRegQuestionCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";

export default function BeforeLoginNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/src/assets/logo.png" alt="Logo"className="h-12 w-auto object-contain"/>
        <button 
          onClick={() => navigate("/")}
          className="font-semibold text-lg hover:text-blue-600 transition-colors"
        >
          Professional Search
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center text-sm hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
        >
          <FaHome className="text-xl mb-1" />
          Home
        </button>

        {/* Browse Jobs Button (for guests) */}
        <button
          onClick={() => navigate("/browse-jobs")}
          className="flex flex-col items-center text-sm hover:text-green-600 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50"
        >
          <FaBriefcase className="text-xl mb-1" />
          Browse Jobs
        </button>

        {/* Post Job Button (redirects to login) */}
        <button
          onClick={() => navigate("/login")}
          className="flex flex-col items-center text-sm hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50"
        >
          <MdPostAdd className="text-xl mb-1" />
          Post Job
        </button>

        {/* Help Button */}
        <button
          onClick={() => navigate("/help")}
          className="flex flex-col items-center text-sm hover:text-orange-600 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50"
        >
          <FaRegQuestionCircle className="text-xl mb-1" />
          Help
        </button>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 ml-4 border-l border-gray-300 pl-4">
          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            <FaSignInAlt className="text-sm" />
            <span className="text-sm font-medium">Login</span>
          </button>

          {/* Register Button */}
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            <FaUserPlus className="text-sm" />
            <span className="text-sm font-medium">Sign Up</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
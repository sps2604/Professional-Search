import { Briefcase, PlusSquare, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      {/* Left Logo */}
      <div className="text-xl font-bold flex items-center gap-2">
        <img src="/cropped_circle_image.png" alt="logo" className="w-14 h-14" />
        Professional Search
      </div>

      {/* Center Menu */}
      <ul className="flex flex-1 justify-center gap-16 text-gray-700 font-medium">
        <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
          <Briefcase size={18} /> Find a Job
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
          <PlusSquare size={18} /> Post a Job
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
          <HelpCircle size={18} /> Help
        </li>
      </ul>

      {/* Right Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="border px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

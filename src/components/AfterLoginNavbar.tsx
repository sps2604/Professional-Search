// src/components/AfterLoginNavbar.tsx
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaRegQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";

// ✅ Correct relative imports based on your structure
import { useUser } from "../context/UserContext";
import { supabase } from "../lib/supabaseClient";

export default function AfterLoginNavbar() {
  const { profile } = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // redirect to login/home
  };

  const handleDropdownToggle = () => setOpen(!open);

  // Navigation handlers
  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false); // close dropdown if open
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/src/assets/logo.png"
          alt="Logo"
          className="h-12 w-auto object-contain"
        />
        <button
          onClick={() => handleNav("/home2")}
          className="font-bold text-xl hover:text-blue-600 transition-colors duration-200"
        >
          Professional Search
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-10">
        <button
          onClick={() => handleNav("/home2")}
          className="flex flex-col items-center text-xs hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50"
        >
          <FaHome className="text-2xl mb-1" />
          Home
        </button>
        <button
          onClick={() => handleNav("/find-job")}
          className="flex flex-col items-center text-xs hover:text-green-600 p-2 rounded-lg hover:bg-green-50"
        >
          <FaBriefcase className="text-2xl mb-1" />
          Jobs
        </button>
        <button
          onClick={() => handleNav("/post-job")}
          className="flex flex-col items-center text-xs hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50"
        >
          <MdPostAdd className="text-2xl mb-1" />
          Post
        </button>
        <button
          onClick={() => handleNav("/help")}
          className="flex flex-col items-center text-xs hover:text-orange-600 p-2 rounded-lg hover:bg-orange-50"
        >
          <FaRegQuestionCircle className="text-2xl mb-1" />
          Help
        </button>
        <button
          onClick={() => handleNav("/notifications")}
          className="flex flex-col items-center text-xs hover:text-red-600 p-2 rounded-lg hover:bg-red-50 relative"
        >
          <IoMdNotificationsOutline className="text-2xl mb-1" />
          Alerts
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex flex-col items-center text-xs hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50"
          >
            <FaUser className="text-2xl mb-1" />
            <span>{profile?.first_name || "Me"}</span>
          </button>

          {open && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border z-50 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">
                    {profile?.first_name} {profile?.last_name || ""}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {profile?.email || "user@example.com"}
                  </p>
                </div>
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => handleNav("/profile")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav("/settings")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Settings
                    </button>
                  </li>
                  <li className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
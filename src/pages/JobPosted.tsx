import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AfterLoginNavbar from "../components/AfterLoginNavbar";

export default function JobPosted() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#e6f3f3]">
      {/* ✅ Navbar */}
      <AfterLoginNavbar />

      {/* ✅ Main Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-sm w-full">
          {/* ✅ Check Icon */}
          <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />

          {/* ✅ Message */}
          <h2 className="text-lg font-medium mb-6">Your Job is Posted</h2>

          {/* ✅ Button */}
          <button
            onClick={() => navigate("/home2")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            GO to Home Page
          </button>
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Professional Search
            </h3>
            <p className="mb-4">
              Your one-stop platform for freelancers, full-time jobs, and
              internships. Connect talent with opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Post Job
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Find Job
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Contact Us
            </h3>
            <p>Kharadi, Pune, India</p>
            <p>+91 989898 66172</p>
            <p>hr@professionalsearch.in</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import AfterLoginNavbar from "../components/BeforeLoginNavbar";
import Footer from "../components/footer";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <AfterLoginNavbar />

      <main className="flex-1 px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Need Help?</h1>
          <h2 className="text-xl text-gray-600 mt-2">You are in the right place.</h2>
          <p className="text-gray-500 mt-2">
            Pick a category to find advice and answers from the Professional Search team.
          </p>
        </div>

        {/* Cards */}
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/how-to/apply-job")}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
          >
            <i className="fas fa-search-plus text-3xl text-blue-500 mb-4"></i>
            <p className="font-medium">Apply for Job</p>
          </button>

          <button
            onClick={() => navigate("/how-to/post-job")}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
          >
            <i className="fas fa-user-plus text-3xl text-green-500 mb-4"></i>
            <p className="font-medium">Post a Job</p>
          </button>

          <button
            onClick={() => navigate("/how-to/search-professionals")}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
          >
            <i className="fas fa-users text-3xl text-purple-500 mb-4"></i>
            <p className="font-medium">Search Professionals</p>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
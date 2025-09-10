import Hero from "../components/hero";
import Stats from "../components/stats";
import PopularSearches from "../components/popular_searches";
import ChoosePath from "../components/choosepath";
import Domains from "../components/domain";
import FeaturedProfiles from "../components/featured_profile";
import Navbar from "../components/BeforeLoginNavbar";
import Footer from "../components/footer";   // ✅ Import Footer
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { profile } = useUser(); // check if user is logged in

  const handlePostJob = () => {
    if (!profile) {
      // If not logged in, redirect to login page
      navigate("/");
    } else {
      // If logged in, go to Post Job page
      navigate("/post-job");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Hero />
      <Stats />
      <PopularSearches />
      <ChoosePath />
      <Domains />
      <FeaturedProfiles />

      {/* Add Post Job Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePostJob}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Post a Job
        </button>
      </div>

      <Footer />   {/* ✅ Added Footer */}
    </div>
  );
}

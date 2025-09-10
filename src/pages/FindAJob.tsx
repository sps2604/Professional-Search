import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import Footer from "../components/footer";
import FilterSidebar from "../components/FilterSidebar";
import graphicDesigner from "../assets/graphic_designer.jpg";
import digitalMarketing from "../assets/digital_marketing.png";
import telecallers from "../assets/telecallers.png";
import videoEditors from "../assets/video_editors.png";
import javaDevelopers from "../assets/java_developers.png";
import interns from "../assets/intern.png";
import dataEntry from "../assets/data_entry.png";
import remoteWorkers from "../assets/remote_workers.png";

export default function FindJobPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (search.trim() === "") return; // Prevent empty search
    navigate(`/browse-job?search=${encodeURIComponent(search.trim())}`);
  };

  // Handle Enter key press
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const categories = [
    { name: "Graphics Designer", img: graphicDesigner },
    { name: "Digital Marketing", img: digitalMarketing },
    { name: "Telecallers", img: telecallers },
    { name: "Video Editors", img: videoEditors },
    { name: "Java Developers", img: javaDevelopers },
    { name: "Interns", img: interns },
    { name: "Data Entry", img: dataEntry },
    { name: "Remote Workers", img: remoteWorkers },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <AfterLoginNavbar />

      {/* Main Content */}
      <main className="flex flex-1 bg-gray-50">
        {/* Filters Section */}
        <aside className="w-1/4 p-4 border-r bg-white shadow-sm">
          <FilterSidebar />
        </aside>

        {/* Job Search Section */}
        <section className="flex-1 p-6">
          {/* Search Section */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">
              Find Your Next Job or Freelance Project
            </h1>
            <p className="text-gray-600">✨ Instantly!</p>
            <div className="flex justify-center mt-4">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="border border-gray-300 rounded-l-lg px-4 py-2 w-1/2"
              />
              <button
                onClick={handleSearchSubmit}
                disabled={search.trim() === ""}
                className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                Search
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Browse by Category</h2>
            <p className="text-gray-500 mb-4">
              Find the perfect talent for your project
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-md text-center cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/browse-job?category=${encodeURIComponent(category.name)}`
                    )
                  }
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
                  />
                  <p>{category.name}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                onClick={() => navigate("/browse-job")}
              >
                Load More
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

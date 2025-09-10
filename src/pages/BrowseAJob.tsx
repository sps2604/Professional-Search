import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/FilterSidebar";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import Footer from "../components/footer";
import { supabase } from "../lib/supabaseClient";

interface Job {
  id: number;
  profession: string;
  description: string;
  location: string;
  salary: string;
  experience: string | null;
  job_type: string[];
  created_at: string;
  Companies: {
    name: string;
    email: string;
    contact_no: string;
    website_url: string;
  } | null;
}

export default function BrowseJob() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // Set search term from URL query params
  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "";

    if (searchQuery) setSearch(searchQuery);
    else if (categoryQuery) setSearch(categoryQuery);
  }, [searchParams]);

  // Fetch jobs from Supabase
  const fetchJobs = async (searchText: string) => {
    setLoading(true);

    let query = supabase
      .from("job_posts")
      .select(
        `
        id, profession, description, location, salary, experience, job_type, created_at,
        Companies!job_posts_company_id_fkey (
          name, email, contact_no, website_url
        )
      `
      )
      .order("created_at", { ascending: false })
      .limit(20);

    if (searchText.trim() !== "") {
      query = query.ilike("profession", `%${searchText}%`); // Fixed interpolation
    }

    const { data, error } = await query;

    if (error) {
      console.error("❌ Error fetching jobs:", error);
      setJobs([]);
    } else {
      const normalized = (data || []).map((job: any) => ({
        ...job,
        Companies: job.Companies ?? null,
      }));
      setJobs(normalized as Job[]);
    }

    setLoading(false);
  };

  // Debounce search to avoid firing on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchJobs(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  // Manual search trigger
  const handleSearch = () => fetchJobs(search);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AfterLoginNavbar />

      <div className="flex flex-1 bg-gray-100 p-6 gap-6">
        <FiltersSidebar />

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">
            Find Your Next Job or Freelance Project
          </h1>
          <p className="mb-4 text-lg">✨ Instantly!</p>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 w-[500px] mb-6">
            <input
              type="text"
              placeholder="Search Jobs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 outline-none px-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          <h2 className="text-lg mb-4">
            {search ? `Search Results for "${search}"` : "All Jobs"}
          </h2>

          {/* Job Results */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Job Results</h2>
            {loading ? (
              <p>Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p className="text-gray-500">No jobs found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{job.profession}</h3>
                      <p className="text-sm text-gray-600">{job.Companies?.name}</p>
                      <p className="text-sm text-gray-600">{job.location}</p>
                      <p className="text-sm text-gray-600">{job.salary}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(job.created_at).toDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {job.job_type?.map((type, i) => (
                        <span
                          key={i}
                          className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                      <div className="flex gap-2 mt-2">
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                          Details
                        </button>
                        <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

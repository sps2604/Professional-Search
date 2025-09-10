"use client";
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";  // <-- Added for navigation

interface JobFormData {
  company_name: string;
  profession: string;
  description: string;
  location: string;
  job_type: string[];
  salary: string;
  experience: string;
  email: string;
  contact: string;
  website: string;
}

const JobPostForm: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    company_name: "",
    profession: "",
    description: "",
    location: "",
    job_type: [],
    salary: "",
    experience: "",
    email: "",
    contact: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <-- Hook to redirect

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => {
        let jobTypes = [...prev.job_type];
        if (checked) jobTypes.push(value);
        else jobTypes = jobTypes.filter((item) => item !== value);
        return { ...prev, job_type: jobTypes };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.company_name || formData.company_name.length < 2) {
      toast.error("Company Name must be at least 2 characters long");
      return false;
    }
    if (!formData.profession) {
      toast.error("Please select a Profession");
      return false;
    }
    if (!formData.description || formData.description.length < 10) {
      toast.error("Description should be at least 10 characters long");
      return false;
    }
    if (formData.job_type.length === 0) {
      toast.error("Select at least one Job Type");
      return false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid Email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 1. Check if company exists
      const { data: companyData, error: companyFetchError } = await supabase
        .from("Companies")
        .select("id")
        .eq("name", formData.company_name)
        .single();

      if (companyFetchError && companyFetchError.code !== "PGRST116") {
        throw companyFetchError;
      }

      let companyId = companyData?.id;

      // 2. If company does not exist, insert it
      if (!companyId) {
        const { data: newCompany, error: insertCompanyError } = await supabase
          .from("Companies")
          .insert([{
            name: formData.company_name,
            email: formData.email,
            contact: formData.contact,
            website: formData.website
          }])
          .select("id")
          .single();

        if (insertCompanyError) throw insertCompanyError;
        companyId = newCompany.id;
      }

      // 3. Insert job post with company_id
      const { error: insertJobError } = await supabase.from("Job_Posts").insert([{
        profession: formData.profession,
        description: formData.description,
        location: formData.location,
        job_type: formData.job_type,
        salary: formData.salary,
        experience: formData.experience,
        company_id: companyId,
      }]);

      if (insertJobError) throw insertJobError;

      toast.success("Job posted successfully!");

      // Clear form
      setFormData({
        company_name: "",
        profession: "",
        description: "",
        location: "",
        job_type: [],
        salary: "",
        experience: "",
        email: "",
        contact: "",
        website: "",
      });

      // Redirect to home after a short delay (to let toast show)
      setTimeout(() => navigate("/home2"), 1500);


    } catch (err: any) {
      toast.error("Failed to post job: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4 mt-6"
      >
        <h2 className="text-2xl font-bold text-center">Post Your Job</h2>

        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          required
        />

        <label htmlFor="profession" className="block font-semibold mb-1">
          Profession
        </label>
        <select
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Profession</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="block font-semibold mb-1">Job Type</label>
          <div className="grid grid-cols-2 gap-2">
            {["Full-time", "Internship", "Part-time", "Freelance", "Remote"].map(
              (type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="job_type"
                    value={type}
                    checked={formData.job_type.includes(type)}
                    onChange={handleChange}
                  />
                  {type}
                </label>
              )
            )}
          </div>
        </div>

        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </>
  );
};

export default JobPostForm;

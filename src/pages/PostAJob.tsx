"use client";
import React from "react";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import JobPostForm from "../components/JobPostForm";
import Footer from "../components/footer"; // Using Footer Component

const PostJobPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <AfterLoginNavbar />

      {/* Main Section */}
      <main className="flex flex-1 justify-center items-start py-8">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Let's Post Your Job
          </h2>
          <JobPostForm /> {/* Using Reusable Form Component */}
        </div>
      </main>

      {/* Footer */}
      <Footer /> {/* Using Footer Component */}
    </div>
  );
};

export default PostJobPage;

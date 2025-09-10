"use client";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Search for Verified & Skilled Professionals Near You
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full max-w-4xl mx-auto bg-white border border-gray-200 shadow-md rounded-full px-4 py-3 hover:shadow-lg transition">
          {/* Profession Input */}
          <input
            type="text"
            placeholder="What professional do you need?"
            className="flex-grow px-4 py-3 text-lg text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
          />

          {/* Location Dropdown */}
          <select
            className="px-4 py-3 text-lg text-gray-700 bg-transparent border-l border-gray-200 focus:outline-none"
          >
            <option value="">Select Location</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="pune">Pune</option>
          </select>

          {/* Experience Dropdown */}
          <select
            className="px-4 py-3 text-lg text-gray-700 bg-transparent border-l border-gray-200 focus:outline-none"
          >
            <option value="">Select Experience</option>
            <option value="fresher">Fresher</option>
            <option value="1-3">1 - 3 Years</option>
            <option value="3-5">3 - 5 Years</option>
            <option value="5+">5+ Years</option>
          </select>

          {/* Search Button */}
          <button className="ml-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition">
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <p className="mt-6 text-gray-500">
          Popular searches:{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Web Developer
          </span>
          ,{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Graphic Designer
          </span>
          ,{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Content Writer
          </span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
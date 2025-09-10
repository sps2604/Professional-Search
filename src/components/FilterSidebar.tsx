import React, { useState } from "react";

export default function FilterSidebar() {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [payRange, setPayRange] = useState([0, 100000]);

  const jobTypes = ["Full Time", "Part Time", "Freelance", "Internship"];
  const locations = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Remote"];

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-xl font-semibold border-b pb-2">Filters</h2>

      {/* Job Type */}
      <div>
        <h3 className="font-medium mb-2">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedJobTypes.includes(type)}
                onChange={() => toggleJobType(type)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-medium mb-2">Location</h3>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All Locations</option>
          {locations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Pay Range */}
      <div>
        <h3 className="font-medium mb-2">Pay Range</h3>
        <input
          type="range"
          min="0"
          max="100000"
          step="5000"
          value={payRange[1]}
          onChange={(e) => setPayRange([0, Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm text-gray-600">
          Up to ₹{payRange[1].toLocaleString()}
        </p>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
}

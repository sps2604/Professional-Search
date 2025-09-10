import React from "react";

type Props = {
  formData: { [key: string]: string };
  onChange: (field: string, value: string) => void;
};

export default function PersonalDetailsForm({ formData, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { label: "Name", field: "name" },
        { label: "Profession", field: "profession" },
        { label: "Logo URL", field: "logo_url" },
        { label: "Experience", field: "experience" },
        { label: "Languages", field: "languages" },
        { label: "Skills", field: "skills" },
        { label: "Address", field: "address" },
        { label: "Summary", field: "summary" },
      ].map(({ label, field }) => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">{label}</label>
          <input
            type="text"
            value={formData[field] || ""}
            onChange={(e) => onChange(field, e.target.value)}
            className="mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>
      ))}
    </div>
  );
}

interface Props {
  formData: any;
  onChange: (field: string, value: string) => void;
}

export default function AccountsLinksForm({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      {[
        "linkedin",
        "instagram",
        "facebook",
        "youtube",
        "twitter",
        "github",
        "website",
        "google_my_business",
      ].map((field) => (
        <div key={field}>
          <label className="block text-gray-700 mb-1 capitalize">{field.replace(/_/g, " ")}</label>
          <input
            type="text"
            value={formData[field]}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}

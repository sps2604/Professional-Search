interface Props {
  formData: any;
  onChange: (field: string, value: string) => void;
}

export default function ContactDetailsForm({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-1">Mobile</label>
        <input
          type="text"
          value={formData.mobile}
          onChange={(e) => onChange("mobile", e.target.value)}
          className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">WhatsApp</label>
        <input
          type="text"
          value={formData.whatsapp}
          onChange={(e) => onChange("whatsapp", e.target.value)}
          className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

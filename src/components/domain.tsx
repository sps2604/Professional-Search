export default function ProfessionalDomains() {
  const domains = [
    {
      title: "IT & Technology",
      desc: "Developers, Designers, Data Analysts, Cybersecurity Experts",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Education & Training",
      desc: "Tutors, Trainers, Career Counselors, Academic Experts",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Healthcare & Wellness",
      desc: "Doctors, Nurses, Therapists, Fitness Coaches",
      color: "bg-pink-50 border-pink-200",
    },
    {
      title: "Security & Safety",
      desc: "Bodyguards, Event Security, Cybersecurity Professionals",
      color: "bg-yellow-50 border-yellow-200",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">
          Popular Professional Domains
        </h2>

        {/* Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {domains.map((item, i) => (
            <div
              key={i}
              className={`p-6 border rounded-2xl shadow-sm hover:shadow-md transition ${item.color}`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}

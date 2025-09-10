export default function PopularSearches() {
  const searches = [
    "Web Developer",
    "Graphic Designer",
    "Digital Marketer",
    "Data Analyst",
    "Content Writer",
    "UI/UX Designer",
    "Consultant",
    "Photographer",
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Popular Searches
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {searches.map((item, i) => (
            <button
              key={i}
              className="px-4 py-2 bg-white rounded-full shadow hover:bg-blue-50 text-gray-700 border border-gray-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

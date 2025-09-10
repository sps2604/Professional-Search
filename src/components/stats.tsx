export default function Stats() {
  const data = [
    { number: "10K+", label: "Professionals" },
    { number: "5K+", label: "Jobs Posted" },
    { number: "1K+", label: "Companies" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-8">
        {data.map((item, i) => (
          <div key={i} className="p-4">
            <h2 className="text-3xl font-bold text-blue-600">{item.number}</h2>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// src/components/featuredprofiles.tsx
export default function FeaturedProfiles() {
  const profiles = [
    {
      name: "Aarav Sharma",
      role: "Full Stack Developer",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      name: "Priya Mehta",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Rahul Verma",
      role: "Digital Marketer",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Profiles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-gray-600">{profile.role}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Briefcase, Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function ChoosePath() {
  const navigate = useNavigate();


  const paths: {
    title: string;
    desc: string;
    btnText: string;
    btnColor: string;
    icon: React.ReactElement;
    route: string;
  }[] = [
    {
      title: "Professionals",
      desc: "Create your profile, showcase skills, and connect with recruiters & employers for freelance, part-time, or full-time opportunities.",
      btnText: "Start Now",
      btnColor: "bg-blue-600 hover:bg-blue-700",
      icon: <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />,
      route: "/professionals",
    },
    {
      title: "Recruiters & Employers",
      desc: "Post job opportunities and find skilled professionals across multiple domains with verified profiles and quick hiring tools.",
      btnText: "Post a Job",
      btnColor: "bg-yellow-500 hover:bg-yellow-600",
      icon: <Building2 className="w-12 h-12 text-yellow-500 mx-auto mb-4" />,
      route: "/post-job",
    },
    {
      title: "General Users",
      desc: "Search and explore professionals across different fields for services, projects, or collaborations with ease.",
      btnText: "Start Now",
      btnColor: "bg-green-600 hover:bg-green-700",
      icon: <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />,
      route: "/general-users",
    },
  ];

  return (
    <>
   

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paths.map((item, i) => (
              <div
                key={i}
                className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {item.icon}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{item.desc}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate(item.route)}
                    className={`px-5 py-2 text-white rounded-lg font-medium transition ${item.btnColor}`}
                  >
                    {item.btnText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
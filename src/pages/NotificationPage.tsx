import React, { useState } from "react";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import { Bell, CheckCircle2, MessageSquare, Briefcase } from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const notifications = [
    {
      id: 1,
      type: "Job",
      title: "New Job Match: Senior React Developer",
      description:
        "A new job posting matches your profile and search criteria. This remote position offers excellent benefits and growth opportunities.",
      company: "TechCorp Inc.",
      time: "2 minutes ago",
      salary: "$120k - $150k",
      action: "View Job",
    },
    {
      id: 2,
      type: "Application",
      title: "Application Status Update",
      description:
        "Your application for Frontend Engineer at StartupXYZ has been reviewed and moved to the interview stage.",
      time: "1 hour ago",
      action: "Schedule Interview",
    },
    {
      id: 3,
      type: "Message",
      title: "New Message from Sarah Johnson",
      description:
        "HR Manager at CloudTech has sent you a message regarding your recent application.",
      time: "3 hours ago",
      action: "Read Message",
    },
    {
      id: 4,
      type: "Job",
      title: "Job Alert: 3 New Positions",
      description:
        "New job postings matching your saved search 'Full Stack Developer in San Francisco' are now available.",
      time: "6 hours ago",
      action: "View Jobs",
    },
    {
      id: 5,
      type: "Application",
      title: "Application Deadline Reminder",
      description:
        "The application deadline for Product Manager at InnovateNow is approaching in 2 days.",
      time: "1 day ago",
      action: "Complete Application",
    },
  ];

  const filtered =
    activeTab === "All"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <AfterLoginNavbar />

      {/* Page Content */}
      <main className="flex-1 p-6">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            Notifications
          </h1>
          <p className="text-gray-600">
            Stay updated with your job search activity and new opportunities.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          {["All", "Jobs", "Applications", "Messages"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-3 font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-start"
            >
              <div className="flex gap-3">
                {/* Icon depending on type */}
                <div className="mt-1">
                  {n.type === "Job" && (
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  )}
                  {n.type === "Application" && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {n.type === "Message" && (
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{n.title}</h2>
                  <p className="text-gray-600 text-sm">{n.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              </div>
              <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {n.action}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Professional Search
            </h3>
            <p className="mb-4">
              Your one-stop platform for freelancers, full-time jobs, and
              internships. Connect talent with opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Post Job
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Find Job
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Contact Us
            </h3>
            <p>Kharadi, Pune, India</p>
            <p>+91 989898 66172</p>
            <p>hr@professionalsearch.in</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
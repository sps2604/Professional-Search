import { FaUser, FaAddressBook, FaLink } from "react-icons/fa";
import type { ReactNode } from "react";
interface Props {
  activeTab: "personal" | "contact" | "links";
  setActiveTab: (tab: "personal" | "contact" | "links") => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: Props) {
  const tabs: { key: "personal" | "contact" | "links"; label: string; icon: ReactNode }[] = [
    { key: "personal", label: "Personal", icon: <FaUser /> },
    { key: "contact", label: "Contact", icon: <FaAddressBook /> },
    { key: "links", label: "Accounts", icon: <FaLink /> },
  ];

  const currentIndex = tabs.findIndex((t) => t.key === activeTab);

  const goNext = () => {
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1].key);
  };

  const goPrev = () => {
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1].key);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            currentIndex === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400 text-gray-800"
          }`}
        >
          Previous
        </button>

        <button
          onClick={goNext}
          disabled={currentIndex === tabs.length - 1}
          className={`px-4 py-2 rounded-lg ${
            currentIndex === tabs.length - 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

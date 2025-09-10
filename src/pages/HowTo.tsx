import { useParams, useNavigate } from "react-router-dom";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import Footer from "../components/footer";

export default function HowTo() {
  // Explicit type for useParams to avoid implicit 'any'
  const { topic } = useParams<{ topic?: string }>();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (topic) {
      case "apply-job":
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">How to Apply for a Job?</h1>
            <p className="mb-8 text-gray-600">
              Follow these steps to land your next opportunity.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <StepCard
                step="1"
                title="Search & Filter Jobs"
                icon="fas fa-search"
                text="Use advanced filters to find jobs by location, salary, and more."
              />
              <StepCard
                step="2"
                title="Complete Your Application"
                icon="fas fa-file-alt"
                text="Upload resume, write cover letters, and review job requirements."
              />
              <StepCard
                step="3"
                title="Submit & Track Applications"
                icon="fas fa-paper-plane"
                text="Track your application status and get notified of updates."
              />
            </div>
            <button
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              onClick={() => navigate("/find-job")}
            >
              Start Applying Now
            </button>
          </>
        );

      case "post-job":
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">How to Post a Job?</h1>
            <p className="mb-8 text-gray-600">
              Follow these steps to post your first job and attract top talent.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <StepCard
                step="1"
                title="Create Detailed Job Posting"
                icon="fas fa-edit"
                text="Write compelling job descriptions with clear instructions."
              />
              <StepCard
                step="2"
                title="Set Up Company Profile"
                icon="fas fa-users"
                text="Showcase your workplace culture and attract top candidates."
              />
              <StepCard
                step="3"
                title="Review & Manage Applications"
                icon="fas fa-eye"
                text="Screen applications and schedule interviews efficiently."
              />
            </div>
            <button
              className="mt-8 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              onClick={() => navigate("/post-job")}
            >
              Post Your First Job
            </button>
          </>
        );

      case "search-professionals":
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">Search Professionals</h1>
            <p className="mb-8 text-gray-600">
              Find skilled professionals in your domain.
            </p>
            {/* You can add StepCards here later */}
          </>
        );

      default:
        return <h2 className="text-center text-xl">Invalid Topic</h2>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AfterLoginNavbar />
      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

// --- StepCard Component with proper types ---
type StepCardProps = {
  step: string;
  title: string;
  icon: string;
  text: string;
};

function StepCard({ step, title, icon, text }: StepCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 text-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
        <i className={`${icon} text-xl text-blue-600`}></i>
      </div>
      <h3 className="text-lg font-bold">Step {step}</h3>
      <h4 className="font-medium mt-2">{title}</h4>
      <p className="text-gray-500 mt-2">{text}</p>
    </div>
  );
}

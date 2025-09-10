import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import { Download, ArrowLeft, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
interface UserProfile {
  name: string;
  profession: string;
  logo_url: string;
  experience: number;
  languages: string;
  skills: string;
  address: string;
  summary: string;
  mobile: string;
  whatsapp: string;
  email: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  youtube: string;
  twitter: string;
  github: string;
  website: string;
  google_my_business: string;
}

export default function ProfileCard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          setError("Failed to get user");
          return;
        }

        if (!user) {
          navigate("/login");
          return;
        }

        const { data: userProfileData, error: userProfileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (userProfileError) {
          setError("Error fetching profile: " + userProfileError.message);
        } else {
          setUserProfile(userProfileData as UserProfile);
        }
      } catch (err) {
        setError("Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDownload = async (format: 'pdf' | 'png') => {
    if (!cardRef.current || !userProfile) return;
    
    setDownloading(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        height: cardRef.current.scrollHeight,
        width: cardRef.current.scrollWidth,
      });

      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `${userProfile.name}-profile-card.png`;
        link.href = canvas.toDataURL();
        link.click();
      } else if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width / 2, canvas.height / 2]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save(`${userProfile.name}-profile-card.pdf`);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/public-profile/${userProfile?.name}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userProfile?.name}'s Profile`,
          text: `Check out ${userProfile?.name}'s professional profile`,
          url: profileUrl,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback to copy to clipboard
      try {
        await navigator.clipboard.writeText(profileUrl);
        alert('Profile link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center text-lg">Loading profile card...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center text-red-500 text-lg">{error}</p>
    </div>
  );

  if (!userProfile) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center text-lg">No profile found</p>
    </div>
  );

  return (
    <>
      <AfterLoginNavbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* Header with actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Share2 size={16} />
              Share
            </button>
            <button
              onClick={() => handleDownload('png')}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Download size={16} />
              {downloading ? 'Downloading...' : 'PNG'}
            </button>
            <button
              onClick={() => handleDownload('pdf')}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <Download size={16} />
              {downloading ? 'Downloading...' : 'PDF'}
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div 
          ref={cardRef}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto"
          style={{ minHeight: '600px' }}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              {userProfile.logo_url ? (
                <img
                  src={userProfile.logo_url}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg mx-auto">
                  <span className="text-white text-4xl font-bold">
                    {userProfile.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{userProfile.name}</h1>
            <p className="text-xl text-gray-600 mb-2">{userProfile.profession}</p>
            <div className="inline-block bg-white rounded-full px-4 py-1 shadow-sm">
              <span className="text-sm font-medium text-gray-700">
                {userProfile.experience} years experience
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Contact Information</h2>
            <div className="space-y-3">
              {userProfile.mobile && (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-blue-500">📞</span>
                  <span className="font-medium">{userProfile.mobile}</span>
                </div>
              )}
              {userProfile.email && (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-red-500">📧</span>
                  <span className="font-medium">{userProfile.email}</span>
                </div>
              )}
              {userProfile.address && (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-green-500">📍</span>
                  <span className="font-medium text-center">{userProfile.address}</span>
                </div>
              )}
              {userProfile.website && (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-purple-500">🌐</span>
                  <span className="font-medium">{userProfile.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {userProfile.skills && (
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Core Skills</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {userProfile.skills.split(',').slice(0, 8).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          {userProfile.summary && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">About Me</h2>
              <p className="text-gray-700 leading-relaxed text-center text-sm">
                {userProfile.summary.length > 200 
                  ? userProfile.summary.substring(0, 200) + "..."
                  : userProfile.summary
                }
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              Professional Profile Card
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import { 
  Eye, 
  Download, 
  Share2, 
  Copy, 
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  X
} from "lucide-react";

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

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
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

        // Fetch from user_profiles table only
        const { data: userProfileData, error: userProfileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (userProfileError) {
          if (userProfileError.code === 'PGRST116') {
            // No profile found - redirect to create profile
            setError("Profile not found. Please create your profile first.");
            setTimeout(() => navigate("/create-profile"), 2000);
          } else {
            setError("Error fetching profile: " + userProfileError.message);
          }
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

  const handleViewCard = () => {
    navigate("/profile-card");
  };

  const handleDownloadCard = () => {
    // This will trigger the download functionality
    // You can implement PDF generation or image capture here
    const element = document.createElement('a');
    element.href = `/api/download-card/${userProfile?.name}`; // You'll need to create this endpoint
    element.download = `${userProfile?.name}-card.pdf`;
    element.click();
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    const profileUrl = `${window.location.origin}/public-profile/${userProfile?.name}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      alert("Profile link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleWhatsAppShare = () => {
    const profileUrl = `${window.location.origin}/public-profile/${userProfile?.name}`;
    const message = `Check out my professional profile: ${profileUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSocialShare = (platform: string) => {
    const profileUrl = `${window.location.origin}/public-profile/${userProfile?.name}`;
    const text = `Check out my professional profile`;
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(profileUrl)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center text-lg">Loading profile...</p>
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

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header with Action Buttons */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              {userProfile.logo_url ? (
                <img
                  src={userProfile.logo_url}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-2xl">
                    {userProfile.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                <p className="text-gray-600">{userProfile.profession}</p>
                <p className="text-sm text-gray-500">{userProfile.experience} years experience</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleViewCard}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Eye size={16} />
                View Card
              </button>
              <button
                onClick={handleDownloadCard}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download size={16} />
                Download Card
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Share2 size={16} />
                Share Card
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.mobile && <p>📞 Mobile: {userProfile.mobile}</p>}
            {userProfile.whatsapp && <p>💬 WhatsApp: {userProfile.whatsapp}</p>}
            {userProfile.email && <p>📧 Email: {userProfile.email}</p>}
            {userProfile.address && <p>📍 Address: {userProfile.address}</p>}
            {userProfile.website && <p>🌐 Website: {userProfile.website}</p>}
          </div>
        </div>

        {/* About Me */}
        {userProfile.summary && (
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">{userProfile.summary}</p>
          </div>
        )}

        {/* Skills */}
        {userProfile.skills && (
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Core Skills</h2>
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.split(',').map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {userProfile.languages && (
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <p className="text-gray-700">{userProfile.languages}</p>
          </div>
        )}

        {/* Social Links */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Social Media & Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {userProfile.linkedin && (
              <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:underline">
                🔗 LinkedIn
              </a>
            )}
            {userProfile.instagram && (
              <a href={userProfile.instagram} target="_blank" rel="noopener noreferrer"
                 className="text-pink-600 hover:underline">
                📸 Instagram
              </a>
            )}
            {userProfile.facebook && (
              <a href={userProfile.facebook} target="_blank" rel="noopener noreferrer"
                 className="text-blue-800 hover:underline">
                📘 Facebook
              </a>
            )}
            {userProfile.youtube && (
              <a href={userProfile.youtube} target="_blank" rel="noopener noreferrer"
                 className="text-red-600 hover:underline">
                ▶️ YouTube
              </a>
            )}
            {userProfile.twitter && (
              <a href={userProfile.twitter} target="_blank" rel="noopener noreferrer"
                 className="text-blue-400 hover:underline">
                🐦 Twitter
              </a>
            )}
            {userProfile.github && (
              <a href={userProfile.github} target="_blank" rel="noopener noreferrer"
                 className="text-gray-800 hover:underline">
                💻 GitHub
              </a>
            )}
            {userProfile.google_my_business && (
              <a href={userProfile.google_my_business} target="_blank" rel="noopener noreferrer"
                 className="text-green-600 hover:underline">
                📍 Google My Business
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share Profile</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                <Copy size={20} className="text-gray-600" />
                <span>Copy Link</span>
              </button>
              
              <button
                onClick={handleWhatsAppShare}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                <MessageCircle size={20} className="text-green-600" />
                <span>WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                <Facebook size={20} className="text-blue-600" />
                <span>Facebook</span>
              </button>
              
              <button
                onClick={() => handleSocialShare('twitter')}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                <Twitter size={20} className="text-blue-400" />
                <span>Twitter</span>
              </button>
              
              <button
                onClick={() => handleSocialShare('linkedin')}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                <Linkedin size={20} className="text-blue-700" />
                <span>LinkedIn</span>
              </button>
              
              <button
                onClick={() => handleSocialShare('email')}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                <Mail size={20} className="text-gray-600" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
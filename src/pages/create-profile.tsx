import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import { FaUser, FaAddressBook, FaLink, FaUpload, FaTimes } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

type Tab = "personal" | "contact" | "links";

export default function CreateProfile() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [uploadMode, setUploadMode] = useState<"url" | "upload">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    logo_url: "",
    experience: "",
    languages: "",
    skills: "",
    address: "",
    summary: "",
    mobile: "",
    whatsapp: "",
    email: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
    twitter: "",
    github: "",
    website: "",
    google_my_business: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected file
  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    // Clear the file input
    const fileInput = document.getElementById('profile-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Upload file to Supabase Storage - FIXED VERSION
  const uploadProfileImage = async (userId: string): Promise<string | null> => {
    if (!selectedFile) return null;

    try {
      console.log('Starting upload for user:', userId);
      
      // Create unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;

      console.log('Uploading to path:', filePath);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('profiles')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      console.log('Public URL generated:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const goNext = () => {
    if (activeTab === "personal") setActiveTab("contact");
    else if (activeTab === "contact") setActiveTab("links");
  };

  const goPrevious = () => {
    if (activeTab === "links") setActiveTab("contact");
    else if (activeTab === "contact") setActiveTab("personal");
  };

  // FIXED handleSubmit function with proper error handling
  const handleSubmit = async () => {
    try {
      console.log('Starting form submission...');
      setUploading(true);

      // Get the logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User fetch error:", userError);
        alert("You must be logged in to create a profile.");
        return;
      }

      console.log('User authenticated:', user.id);

      // Fixed: Handle empty string and null cases properly
      let profileImageUrl: string | null = formData.logo_url.trim() || null;

      // If user uploaded a file, upload it first
      if (uploadMode === "upload" && selectedFile) {
        console.log('Upload mode: file upload');
        try {
          const uploadedUrl = await uploadProfileImage(user.id);
          if (uploadedUrl) {
            profileImageUrl = uploadedUrl;
            console.log('Image uploaded successfully:', uploadedUrl);
          } else {
            console.error('Upload returned null');
            alert("Failed to upload profile image. Please try again.");
            return;
          }
        } catch (error) {
          console.error("Upload error:", error);
          alert(`Failed to upload profile image: ${error instanceof Error ? error.message : 'Unknown error'}`);
          return;
        }
      } else if (uploadMode === "upload" && !selectedFile) {
        // If in upload mode but no file selected, set to null
        profileImageUrl = null;
        console.log('Upload mode but no file selected');
      } else {
        console.log('URL mode:', profileImageUrl);
      }

      console.log('Saving profile to database...');
      
      // Insert into user_profiles with user.id
      const { error } = await supabase.from("user_profiles").insert([
        {
          user_id: user.id,
          name: formData.name,
          profession: formData.profession,
          logo_url: profileImageUrl, // This can now be string or null
          experience: formData.experience
            ? parseInt(formData.experience)
            : null,
          languages: formData.languages,
          skills: formData.skills,
          address: formData.address,
          summary: formData.summary,
          mobile: formData.mobile,
          whatsapp: formData.whatsapp,
          email: formData.email,
          linkedin: formData.linkedin,
          instagram: formData.instagram,
          facebook: formData.facebook,
          youtube: formData.youtube,
          twitter: formData.twitter,
          github: formData.github,
          website: formData.website,
          google_my_business: formData.google_my_business,
        },
      ]);

      if (error) {
        console.error("Database insert error:", error);
        alert(`Failed to save profile: ${error.message}`);
      } else {
        console.log('Profile saved successfully');
        alert("Profile created successfully!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert(`An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      console.log('Setting uploading to false');
      setUploading(false);
    }
  };

  const tabClass = (tab: Tab) =>
    `flex items-center gap-2 px-6 py-2 rounded-t-xl cursor-pointer transition-all font-medium
     ${activeTab === tab ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <AfterLoginNavbar />

      {/* Tabs */}
      <div className="flex justify-center mt-6 space-x-2">
        <div className={tabClass("personal")} onClick={() => setActiveTab("personal")}>
          <FaUser /> Personal
        </div>
        <div className={tabClass("contact")} onClick={() => setActiveTab("contact")}>
          <FaAddressBook /> Contact
        </div>
        <div className={tabClass("links")} onClick={() => setActiveTab("links")}>
          <FaLink /> Links
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-xl max-w-2xl mx-auto mt-8 rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Create Professional Profile
        </h2>

        {/* Personal Details */}
        {activeTab === "personal" && (
          <div className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Name:</label>
              <input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter full name or business name"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Profession / Services:</label>
              <input
                value={formData.profession}
                onChange={(e) => handleChange("profession", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="e.g. Digital Marketing, Photography"
              />
            </div>

            {/* Profile Image Upload Section */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">Profile Photo:</label>
              
              {/* Upload Mode Toggle */}
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadMode("upload")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    uploadMode === "upload" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <FaUpload className="inline mr-2" />
                  Upload Photo
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode("url")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    uploadMode === "url" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <FaLink className="inline mr-2" />
                  Use URL
                </button>
              </div>

              {/* Upload Mode */}
              {uploadMode === "upload" && (
                <div className="space-y-4">
                  {!selectedFile ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <label htmlFor="profile-image" className="cursor-pointer">
                        <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload profile photo</p>
                        <p className="text-sm text-gray-400">JPEG, PNG, WebP (Max 5MB)</p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-xl border-4 border-white shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeSelectedFile}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FaTimes size={12} />
                      </button>
                      <p className="text-sm text-gray-600 mt-2">{selectedFile.name}</p>
                    </div>
                  )}
                </div>
              )}

              {/* URL Mode */}
              {uploadMode === "url" && (
                <input
                  value={formData.logo_url}
                  onChange={(e) => handleChange("logo_url", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter image URL"
                />
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Experience (Years):</label>
              <input
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="e.g. 5"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Languages Known:</label>
              <input
                value={formData.languages}
                onChange={(e) => handleChange("languages", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="e.g. English, Hindi"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Skills:</label>
              <input
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="e.g. Web Development, Graphic Design"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Address:</label>
              <input
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter your full address"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Professional Summary:</label>
              <textarea
                value={formData.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm h-28 focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Brief about you, your background and goals"
              />
            </div>
          </div>
        )}

        {/* Contact Details */}
        {activeTab === "contact" && (
          <div className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Mobile:</label>
              <input
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter contact number"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">WhatsApp:</label>
              <input
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter active WhatsApp number"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Email:</label>
              <input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter professional or business email"
              />
            </div>
          </div>
        )}

        {/* Accounts & Links */}
        {activeTab === "links" && (
          <div className="space-y-5">
            {[
              ["linkedin", "LinkedIn"],
              ["instagram", "Instagram"],
              ["facebook", "Facebook"],
              ["youtube", "YouTube"],
              ["twitter", "Twitter"],
              ["github", "GitHub"],
              ["website", "Website / Portfolio"],
              ["google_my_business", "Google My Business Link"],
            ].map(([field, label], index) => (
              <div key={index}>
                <label className="block font-semibold text-gray-700 mb-1">{label}:</label>
                <input
                  value={(formData as any)[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder={`Enter ${label} link`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          {activeTab !== "personal" && (
            <button
              onClick={goPrevious}
              disabled={uploading}
              className="border border-gray-400 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
            >
              Previous
            </button>
          )}

          {activeTab !== "links" ? (
            <button
              onClick={goNext}
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-700 transition ml-auto disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-700 transition ml-auto disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
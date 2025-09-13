import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerIllustration from "../assets/register-illustration.svg";
import googleIcon from "../assets/google-icon.png";
import emailIcon from "../assets/email-icon.webp";
import Navbar from "../components/BeforeLoginNavbar";
import { supabase } from "../lib/supabaseClient";

export default function Register() {
  const navigate = useNavigate();
  
  // State for form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Handle Register with email + password
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      console.log('Starting registration process...');
      
      // Sign up user with Supabase Auth
      // The profile will be automatically created by the onAuthStateChange listener
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            first_name: firstName, 
            last_name: lastName 
          },
          emailRedirectTo: `${window.location.origin}/create-profile`,
        },
      });

      if (signUpError) {
        console.error('SignUp Error:', signUpError);
        throw signUpError;
      }

      console.log('SignUp successful:', data);

      // Check if user needs email confirmation
      if (data.user && !data.user.email_confirmed_at) {
        setMessage("📩 Registration successful! Please check your email to confirm your account.");
      } else if (data.user && data.user.email_confirmed_at) {
        // User is immediately confirmed, redirect to create profile
        setMessage("✅ Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/create-profile");
        }, 1500);
      } else {
        setMessage("✅ Registration successful! Please check your email to confirm your account.");
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || "Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign up
  const handleGoogleRegister = async () => {
    setError(null);
    setMessage(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/create-profile`,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) {
        console.error('Google OAuth Error:', error);
        setError(error.message);
      }
    } catch (err: any) {
      console.error('Google registration error:', err);
      setError("Failed to register with Google");
    }
  };

  // Handle Magic Link Register
  const handleMagicLinkRegister = async () => {
    if (!email.trim()) {
      setError("Please enter your email address first");
      return;
    }

    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: { 
            first_name: firstName, 
            last_name: lastName 
          },
          emailRedirectTo: `${window.location.origin}/create-profile`,
        },
      });

      if (error) {
        console.error('Magic Link Error:', error);
        setError(error.message);
      } else {
        setMessage("📩 Magic Link sent! Check your email.");
      }
    } catch (err: any) {
      console.error('Magic link error:', err);
      setError("Failed to send magic link");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col md:flex-row items-center max-w-6xl gap-8 p-8">
          {/* Left Illustration */}
          <div className="flex-1 flex justify-center">
            <img
              src={registerIllustration}
              alt="Register Illustration"
              className="w-130"
            />
          </div>

          {/* Right Form */}
          <div className="flex-1 bg-white rounded-xl shadow-md p-8 max-w-md">
            <h2 className="text-2xl font-semibold mb-6">
              Join Professional Search
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* First Name */}
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter Your First Name"
                className="w-full border rounded-md px-3 py-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              {/* Last Name */}
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter Your Last Name"
                className="w-full border rounded-md px-3 py-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              {/* Email */}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                className="w-full border rounded-md px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password */}
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                className="w-full border rounded-md px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center gap-2 border rounded-md py-2 transition duration-200 hover:bg-gray-100 hover:border-gray-400"
              >
                <img src={googleIcon} alt="Google" className="w-5" />
                Continue with Google
              </button>

              {/* Magic Link Button */}
              <button
                type="button"
                onClick={handleMagicLinkRegister}
                className="w-full flex items-center justify-center gap-2 border rounded-md py-2 transition duration-200 hover:bg-gray-100 hover:border-gray-400"
              >
                <img src={emailIcon} alt="Email" className="w-5" />
                Sign in with Magic Link
              </button>

              {/* Agree & Join */}
              <button
                type="submit"
                className={`w-full py-2 rounded-md transition duration-200 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Agree & Join"}
              </button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              {message && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-600 text-sm">{message}</p>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>

              <p className="text-sm text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
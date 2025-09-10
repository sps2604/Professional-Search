import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import { supabase } from "../lib/supabaseClient";
import { FaGoogle, FaEnvelope } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Email + Password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    console.log("🚀 Trying to login with", email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("🔑 Supabase response:", { data, error });
    setLoading(false);

    if (error) {
      setError(error.message);
      console.error("❌ Login failed:", error.message);
    } else {
      console.log("✅ Login success", data);
      navigate("/home2?justLoggedIn=true"); // redirect to Home2 after login
    }
  };

  // Magic Link login
  const handleMagicLink = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/home2?justLoggedIn=true`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("📩 Magic Link sent! Check your email.");
    }
  };

  // Google OAuth login
  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/home2?justLoggedIn=true`,
        },
      });
      if (error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password flow
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    if (loading) return;
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("📩 Password reset link sent! Check your email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl gap-8 p-8">
          {/* Left Illustration */}
          <div className="flex justify-center items-center">
            <img
              src="src/assets/login-illustration.svg"
              alt="Login Illustration"
            />
          </div>

          {/* Right Login Form */}
          <div className="bg-white shadow-lg rounded-xl p-8 w-full">
            <h2 className="text-2xl font-bold mb-2">Login to your Digital CV</h2>
            <p className="text-gray-500 mb-6">Build. Share. Get Hired</p>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2 mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2 mb-4"
              />

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              {message && <p className="text-green-500 text-sm mb-2">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p
              onClick={handleForgotPassword}
              className="text-right text-sm mt-2 text-blue-500 cursor-pointer hover:underline"
            >
              Forgotten password?
            </p>

            {/* Create Account */}
            <Link
              to="/register"
              className="block text-center w-full border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded-md mt-4"
            >
              Create New Account
            </Link>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="px-2 text-gray-400 text-sm">Or continue with</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Magic Link Login */}
            <button
              type="button"
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 border rounded-md py-2 mb-3 transition duration-200 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-50"
            >
              <FaEnvelope className="text-black-700" />
              Login with email
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 border rounded-md py-2 
             transition duration-200 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-50"
            >
              <FaGoogle className="text-red-500" />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

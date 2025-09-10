import React, { useEffect, useState } from "react";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import { supabase } from "../lib/supabaseClient";
import Hero from "../components/hero";
import Stats from "../components/stats";
import PopularSearches from "../components/popular_searches";
import ChoosePath from "../components/choosepath";
import Domains from "../components/domain";
import FeaturedProfiles from "../components/featured_profile";
import Footer from "../components/footer";
import toast, { Toaster } from "react-hot-toast";

export default function Home2() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const saveProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setLoading(false);
        return;
      }

      setUserEmail(user.email ?? null);

      // Check if profile already exists
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existing) {
        const fullName = user.user_metadata?.full_name || "";
        const [firstName, ...rest] = fullName.split(" ");
        const lastName = rest.join(" ");

        await supabase.from("profiles").insert([
          {
            id: user.id,
            first_name: firstName || user.user_metadata?.first_name || "",
            last_name: lastName || user.user_metadata?.last_name || "",
            email: user.email ?? "",
          },
        ]);
      }

      // Toast only when coming right after login/register
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("justLoggedIn") === "true") {
        toast.success(`🎉 You logged in successfully, ${user.email}!`, {
          duration: 4000,
        });
        // Remove query param to avoid duplicate toast on refresh
        window.history.replaceState(null, "", "/home2");
      }

      setLoading(false);
    };

    saveProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      <AfterLoginNavbar />
      <Hero />
      <Stats />
      <PopularSearches />
      <ChoosePath />
      <Domains />
      <FeaturedProfiles />
      <Footer />
    </div>
  );
}

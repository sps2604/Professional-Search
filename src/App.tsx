import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { supabase } from "./lib/supabaseClient";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast"; // <-- Add this

export default function App() {
  useEffect(() => {
    // Listen for sign-in events and update profile table
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const user = session.user;

          // Insert or update profile
          await supabase.from("profiles").upsert([
            {
              id: user.id,
              email: user.email,
              first_name: user.user_metadata?.first_name || "",
              last_name: user.user_metadata?.last_name || "",
            },
          ]);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserProvider>
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast Support */}
    </UserProvider>
  );
}

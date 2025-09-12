import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { supabase } from "./lib/supabaseClient";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function App() {
  useEffect(() => {
    // Listen for auth state changes with error handling
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session?.user?.id);

        try {
          if (event === "SIGNED_IN" && session?.user) {
            const user = session.user;

            // Insert or update profile with error handling
            const { error } = await supabase.from("profiles").upsert([
              {
                id: user.id,
                email: user.email,
                first_name: user.user_metadata?.first_name || "",
                last_name: user.user_metadata?.last_name || "",
              },
            ]);

            if (error) {
              console.error("Error upserting profile:", error.message);
              toast.error("Failed to update profile");
            }
          } else if (event === "TOKEN_REFRESHED") {
            console.log('Token refreshed successfully');
            toast.success("Session refreshed");
          } else if (event === "SIGNED_OUT") {
            console.log('User signed out');
            // Clear any cached data
            localStorage.removeItem('supabase.auth.token');
          } else if (event === "USER_UPDATED") {
            console.log('User profile updated');
          }
        } catch (error: any) {
          console.error('Auth state change error:', error);
          
          // Handle refresh token errors specifically
          if (error.message?.includes('refresh_token_not_found') || 
              error.message?.includes('Invalid Refresh Token')) {
            toast.error('Your session has expired. Please sign in again.');
            await supabase.auth.signOut();
            window.location.href = '/login';
          } else {
            toast.error('Authentication error occurred');
          }
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
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </UserProvider>
  );
}

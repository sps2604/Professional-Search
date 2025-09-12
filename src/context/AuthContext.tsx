import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session?.user?.id);
        
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle profile creation only when signed in
        if (event === "SIGNED_IN" && session?.user) {
          const user = session.user;

          try {
            const { data: existing, error: fetchError } = await supabase
              .from("profiles")
              .select("id")
              .eq("id", user.id)
              .maybeSingle();

            if (fetchError && fetchError.code !== "PGRST116") {
              console.error("Error checking profile:", fetchError.message);
              return;
            }

            if (!existing) {
              const { error: insertError } = await supabase.from("profiles").insert([
                {
                  id: user.id,
                  email: user.email,
                  first_name: user.user_metadata?.first_name || "",
                  last_name: user.user_metadata?.last_name || "",
                },
              ]);

              if (insertError) {
                console.error("Error inserting profile:", insertError.message);
              }
            }
          } catch (error) {
            console.error("Profile creation error:", error);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

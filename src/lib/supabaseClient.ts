import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Add retry logic for refresh token errors
const handleAuthError = async (error: any) => {
  console.error('Auth error:', error);
  
  if (error.message?.includes('refresh_token_not_found') || 
      error.message?.includes('Invalid Refresh Token')) {
    console.warn('Refresh token invalid, signing out user');
    await supabase.auth.signOut();
    // Redirect to login or show notification
    window.location.href = '/login';
  }
};

supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('Auth event:', event, session?.user?.id);

  try {
    if (event === "SIGNED_IN" && session?.user) {
      const user = session.user;

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
    } else if (event === "TOKEN_REFRESHED") {
      console.log('Token refreshed successfully');
    } else if (event === "SIGNED_OUT" || !session) {
      console.log('User signed out or session ended');
      // Clear any cached data
      localStorage.removeItem('supabase.auth.token');
    }
  } catch (error) {
    await handleAuthError(error);
  }
});

// Simplified error wrapper without 'this' context issues
export const createSupabaseQuery = (table: string) => {
  return {
    select: (columns?: string) => {
      const query = supabase.from(table).select(columns || '*');
      return wrapQueryWithErrorHandling(query);
    },
    insert: (data: any) => {
      const query = supabase.from(table).insert(data);
      return wrapQueryWithErrorHandling(query);
    },
    update: (data: any) => {
      const query = supabase.from(table).update(data);
      return wrapQueryWithErrorHandling(query);
    },
    delete: () => {
      const query = supabase.from(table).delete();
      return wrapQueryWithErrorHandling(query);
    }
  };
};

// Helper function to wrap queries with error handling
const wrapQueryWithErrorHandling = (query: any) => {
  const originalExecute = query.then?.bind(query);
  
  if (originalExecute) {
    query.then = async (onSuccess?: any, onError?: any) => {
      try {
        const result = await originalExecute();
        
        // Check for auth errors in the result
        if (result.error && 
            (result.error.message?.includes('refresh_token') || 
             result.error.status === 401)) {
          await handleAuthError(result.error);
        }
        
        return onSuccess ? onSuccess(result) : result;
      } catch (error: any) {
        if (error.message?.includes('refresh_token') || error.status === 401) {
          await handleAuthError(error);
        }
        return onError ? onError(error) : Promise.reject(error);
      }
    };
  }
  
  return query;
};

export { handleAuthError };

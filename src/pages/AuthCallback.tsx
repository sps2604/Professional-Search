import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('AuthCallback: Starting auth check...');
        
        // First, handle the URL hash/params from email confirmation
        const { data, error } = await supabase.auth.getSession();
        
        console.log('AuthCallback: Session data:', data);
        console.log('AuthCallback: Session error:', error);

        if (error) {
          console.error('Auth callback error:', error);
          navigate('/register', { replace: true });
          return;
        }

        // Wait a moment for session to be established
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check session again after delay
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        console.log('AuthCallback: Final session check:', sessionData);

        if (sessionData.session?.user) {
          console.log('User authenticated successfully, redirecting to create-profile');
          navigate('/create-profile', { replace: true });
        } else {
          console.log('No valid session found, redirecting to register');
          navigate('/register', { replace: true });
        }
      } catch (err) {
        console.error('Callback handling error:', err);
        navigate('/register', { replace: true });
      } finally {
        setChecking(false);
      }
    };

    // Also listen for auth state changes during callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthCallback: Auth state change:', event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('User signed in via state change, redirecting to create-profile');
        navigate('/create-profile', { replace: true });
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out during callback, redirecting to register');
        navigate('/register', { replace: true });
      }
    });

    handleAuthCallback();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your email confirmation...</p>
        </div>
      </div>
    );
  }

  return null;
}

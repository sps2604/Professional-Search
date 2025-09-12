import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/register', { replace: true });
          return;
        }

        if (data.session?.user) {
          console.log('User authenticated, redirecting to create-profile');
          navigate('/create-profile', { replace: true });
        } else {
          console.log('No session found, redirecting to register');
          navigate('/register', { replace: true });
        }
      } catch (err) {
        console.error('Callback handling error:', err);
        navigate('/register', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { supabase } from './config/supabase';
import { useAuthStore } from './store/authStore';

function App() {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const userData = {
          ...session.user,
          name: session.user.user_metadata?.full_name || 
                session.user.user_metadata?.name || 
                session.user.user_metadata?.display_name ||
                session.user.user_metadata?.given_name ||
                session.user.email
        };
        login(userData, session.access_token);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const userData = {
          ...session.user,
          name: session.user.user_metadata?.full_name || 
                session.user.user_metadata?.name || 
                session.user.user_metadata?.display_name ||
                session.user.user_metadata?.given_name ||
                session.user.email
        };
        login(userData, session.access_token);
      } else if (event === 'SIGNED_OUT') {
        logout();
      }
    });

    return () => subscription.unsubscribe();
  }, [login, logout]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

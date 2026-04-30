import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { supabase } from './config/supabase';
import { useAuthStore } from './store/authStore';

function App() {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        login(session.user, session.access_token);
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

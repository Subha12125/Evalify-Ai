import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error, setLoading, setError, login, logout } = useAuthStore();

  const handleLogin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      login(data.user, data.token);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, login]);

  const handleSignup = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.signup(userData);
      login(data.user, data.token);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, login]);

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      logout();
      navigate('/login');
    }
  }, [logout, navigate]);

  const handleProviderLogin = useCallback(async (provider) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.signInWithProvider(provider);
      login(data.user, data.token);
      return data;
    } catch (err) {
      const message = err.message || `${provider} login failed`;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, login]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    signInWithProvider: handleProviderLogin
  };
};

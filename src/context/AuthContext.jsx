'use client';

import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const apiFetch = useCallback(
    async (url, options = {}, retries = 2) => {
      if (!isInitialized && url !== '/auth/me' && url !== '/auth/refresh') {
        console.log('Blocking request until auth is initialized:', url);
        await new Promise(resolve => {
          const check = () => {
            if (isInitialized) resolve();
            else setTimeout(check, 100);
          };
          check();
        });
      }
      setLoading(true);
      setError(null);
      try {
        const headers = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        };
        console.log('apiFetch:', `${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          method: options.method || 'GET',
          headers,
          body: options.body,
        });
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          ...options,
          headers,
        });
        if (response.status === 401 && refreshToken && url !== '/auth/refresh') {
          console.log('Token expired, attempting refresh');
          const newTokens = await refresh();
          if (newTokens) {
            headers.Authorization = `Bearer ${newTokens.token}`;
            const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
              ...options,
              headers,
            });
            if (!retryResponse.ok) {
              const errorData = await retryResponse.json();
              throw new Error(errorData.error || 'Request failed', { cause: errorData });
            }
            return retryResponse.status !== 204 ? await retryResponse.json() : null;
          }
        }
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Request failed', { cause: errorData });
        }
        return response.status !== 204 ? await response.json() : null;
      } catch (err) {
        console.error('apiFetch error:', err.message, { url, options, retries, cause: err.cause });
        if (retries > 0 && err.message.includes('Failed to fetch')) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return apiFetch(url, options, retries - 1);
        }
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, refreshToken, isInitialized]
  );

  const initializeAuth = useCallback(async () => {
    if (isInitialized) {
      console.log('Auth already initialized, skipping');
      setLoading(false);
      return;
    }
    console.log('Initializing auth');
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    console.log('Stored tokens:', { storedToken, storedRefreshToken });
    if (!storedToken || !storedRefreshToken) {
      console.log('No tokens found, redirecting to login');
      setLoading(false);
      setIsInitialized(true);
      router.push('/login');
      return;
    }
    setToken(storedToken);
    setRefreshToken(storedRefreshToken);
    try {
      console.log('Fetching user with token:', storedToken.slice(0, 10) + '...');
      const data = await apiFetch('/auth/me');
      console.log('User fetched:', data);
      setUser(data);
    } catch (err) {
      console.error('Error fetching /auth/me:', err.message, err.cause);
      if (err.message === 'Unauthorized' && refreshToken) {
        console.log('Attempting to refresh token');
        const newTokens = await refresh();
        if (newTokens) {
          try {
            const data = await apiFetch('/auth/me');
            console.log('User fetched after refresh:', data);
            setUser(data);
            return;
          } catch (retryErr) {
            console.error('Error after refresh:', retryErr.message, retryErr.cause);
          }
        }
      }
      console.log('Authentication failed, but preserving tokens for next attempt');
      setUser(null);
      router.push('/login');
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  }, [apiFetch, refreshToken, router, isInitialized]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const register = async (email, password, username, name, phone, businessName, logo, isBusiness) => {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username, name, phone, businessName, logo, isBusiness }),
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    setToken(data.token);
    setRefreshToken(data.refreshToken);
    await fetchUser();
    return data;
  };

  const login = async (email, password) => {
    console.log('Logging in:', { email });
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    setToken(data.token);
    setRefreshToken(data.refreshToken);
    console.log('Tokens saved:', { token: data.token.slice(0, 10) + '...', refreshToken: data.refreshToken.slice(0, 10) + '...' });
    await fetchUser();
    return data;
  };

  const verify = useCallback(async (token) => {
    return await apiFetch(`/auth/verify?token=${token}`);
  }, [apiFetch]);

  const resendVerification = async (email) => {
    return await apiFetch('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  };

  const refresh = useCallback(async () => {
    try {
      console.log('Refreshing token with:', refreshToken.slice(0, 10) + '...');
      const data = await apiFetch('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      setToken(data.token);
      setRefreshToken(data.refreshToken);
      console.log('Tokens refreshed:', { token: data.token.slice(0, 10) + '...', refreshToken: data.refreshToken.slice(0, 10) + '...' });
      return data;
    } catch (err) {
      console.error('Error refreshing token:', err.message, err.cause);
      return null;
    }
  }, [apiFetch, refreshToken]);

  const fetchUser = useCallback(async () => {
    try {
      const data = await apiFetch('/auth/me');
      setUser(data);
    } catch (err) {
      console.error('Error fetching user:', err.message);
      setUser(null);
    }
  }, [apiFetch]);

  const updateUser = async (name, phone) => {
    const data = await apiFetch('/user/update', {
      method: 'PUT',
      body: JSON.stringify({ name, phone }),
    });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    await fetchUser();
    return data;
  };

  const updateBusiness = async (name, logo, timezone) => {
    const data = await apiFetch('/business/update', {
      method: 'PUT',
      body: JSON.stringify({ name, logo, timezone }),
    });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    await fetchUser();
    return data;
  };

  const createBranch = async (name, address) => {
    return await apiFetch('/branches', {
      method: 'POST',
      body: JSON.stringify({ name, address }),
    });
  };

  const updateBranch = async (id, name, address) => {
    return await apiFetch(`/branches/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, address }),
    });
  };

  const deleteBranch = async (id) => {
    return await apiFetch(`/branches/${id}`, { method: 'DELETE' });
  };

  const createWorker = async (workerName, branchId) => {
    return await apiFetch('/workers', {
      method: 'POST',
      body: JSON.stringify({ workerName, branchId }),
    });
  };

  const updateWorker = async (id, workerName, branchId) => {
    return await apiFetch(`/workers/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ workerName, branchId }),
    });
  };

  const deleteWorker = async (id) => {
    return await apiFetch(`/workers/${id}`, { method: 'DELETE' });
  };

  const createSchedule = async (branchId, workerId, dayOfWeek, startTime, endTime, slotDuration) => {
    return await apiFetch('/schedules', {
      method: 'POST',
      body: JSON.stringify({ branchId, workerId, dayOfWeek, startTime, endTime, slotDuration }),
    });
  };

  const updateSchedule = async (id, branchId, workerId, dayOfWeek, startTime, endTime, slotDuration) => {
    return await apiFetch(`/schedules/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ branchId, workerId, dayOfWeek, startTime, endTime, slotDuration }),
    });
  };

  const deleteSchedule = async (id) => {
    return await apiFetch(`/schedules/${id}`, { method: 'DELETE' });
  };

  const createException = async (branchId, workerId, date, isClosed, startTime, endTime) => {
    return await apiFetch('/exceptions', {
      method: 'POST',
      body: JSON.stringify({ branchId, workerId, date, isClosed, startTime, endTime }),
    });
  };

  const updateException = async (id, branchId, workerId, date, isClosed, startTime, endTime) => {
    return await apiFetch(`/exceptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ branchId, workerId, date, isClosed, startTime, endTime }),
    });
  };

  const deleteException = async (id) => {
    return await apiFetch(`/exceptions/${id}`, { method: 'DELETE' });
  };

  const updateAppointment = async (id, startTime, endTime, status) => {
    return await apiFetch(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ startTime, endTime, status }),
    });
  };

  const getAuditLogs = async (filters) => {
    const query = new URLSearchParams(filters).toString();
    return await apiFetch(`/audit-logs?${query}`);
  };

  const logout = () => {
    console.log('Logging out, clearing tokens');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    router.push('/login');
  };

  const contextValue = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      isInitialized,
      apiFetch,
      register,
      login,
      verify,
      resendVerification,
      refresh,
      updateUser,
      updateBusiness,
      createBranch,
      updateBranch,
      deleteBranch,
      createWorker,
      updateWorker,
      deleteWorker,
      createSchedule,
      updateSchedule,
      deleteSchedule,
      createException,
      updateException,
      deleteException,
      updateAppointment,
      getAuditLogs,
      logout,
    }),
    [
      user,
      token,
      loading,
      error,
      isInitialized,
      apiFetch,
      verify,
      refresh,
      fetchUser,
    ]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
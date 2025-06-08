'use client';

import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// Debug ID
const instanceId = Math.random().toString(36).slice(2, 9);

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const apiFetch = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers,
      });
      if (response.status === 401 && url !== '/auth/refresh') {
        console.log(`[${instanceId}] Token expired, attempting refresh`);
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
      console.error(`[${instanceId}] apiFetch error: ${err.message}`, { url, options, cause: err.cause });
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedToken || !storedRefreshToken) {
      console.log(`[${instanceId}] No tokens found, redirecting to login`);
      setLoading(false);
      router.push('/login');
      return;
    }
    try {
      const data = await apiFetch('/auth/me');
      setUser(data);
    } catch (err) {
      console.error(`[${instanceId}] Error fetching /auth/me: ${err.message}`, { cause: err.cause });
      if (err.message === 'Unauthorized' && storedRefreshToken) {
        console.log(`[${instanceId}] Attempting to refresh token`);
        const newTokens = await refresh();
        if (newTokens) {
          try {
            const data = await apiFetch('/auth/me');
            console.log(`[${instanceId}] User fetched after refresh:`, data);
            setUser(data);
            return;
          } catch (retryErr) {
            console.error(`[${instanceId}] Error after refresh: ${retryErr.message}`, { cause: retryErr.cause });
          }
        }
      }
      console.log(`[${instanceId}] Authentication failed, redirecting to login without clearing tokens`);
      setUser(null);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [apiFetch, router]);

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
    await fetchUser();
    return data;
  };

  const login = async (email, password) => {
    console.log(`[${instanceId}] Logging in:`, { email });
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    console.log(`[${instanceId}] Tokens saved:`, {
      token: `${data.token.slice(0, 10)}...`,
      refreshToken: `${data.refreshToken.slice(0, 10)}...`,
    });
    await fetchUser();
    return data;
  };

  const verify = useCallback(
    async (token) => {
      return await apiFetch(`/auth/verify?token=${token}`);
    },
    [apiFetch]
  );

  const resendVerification = async (email) => {
    return await apiFetch('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  };

  const refresh = useCallback(
    async () => {
      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        console.log(`[${instanceId}] Refreshing token with: ${storedRefreshToken?.slice(0, 10)}...`);
        const data = await apiFetch('/auth/refresh', {
          method: 'POST',
          body: JSON.stringify({ refreshToken: storedRefreshToken }),
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        console.log(`[${instanceId}] Tokens refreshed:`, {
          token: `${data.token.slice(0, 10)}...`,
          refreshToken: `${data.refreshToken.slice(0, 10)}...`,
        });
        return data;
      } catch (err) {
        console.error(`[${instanceId}] Error refreshing token: ${err.message}`, { cause: err.cause });
        return null;
      }
    },
    [apiFetch]
  );

  const fetchUser = useCallback(
    async () => {
      if (user || !localStorage.getItem('token')) {
        console.log(`[${instanceId}] Skipping fetchUser: hasUser=${!!user}, hasToken=${!!localStorage.getItem('token')}`);
        return;
      }
      try {
        console.log(`[${instanceId}] Fetching user via /auth/me`);
        const data = await apiFetch('/auth/me');
        setUser(data);
      } catch (err) {
        console.error(`[${instanceId}] Error fetching user: ${err.message}`, { cause: err.cause });
        setUser(null);
      }
    },
    [apiFetch, user]
  );

  const updateUser = async ({ name, phone }) => {
    const data = await apiFetch('/api/users/update', {
      method: 'PUT',
      body: JSON.stringify({ name, phone }),
    });
    localStorage.setItem('token', data.token);
    await fetchUser();
    return data;
  };

  const updateBusiness = async (name, logo, timezone) => {
    const data = await apiFetch('/api/businesses/update', {
      method: 'PUT',
      body: JSON.stringify({ name, logo, timezone }),
    });
    localStorage.setItem('token', data.token);
    await fetchUser();
    return data;
  };

  const createBranch = async (name, address) => {
    return await apiFetch('/api/sucursales', {
      method: 'POST',
      body: JSON.stringify({ name, address }),
    });
  };

  const updateBranch = async (id, name, address) => {
    return await apiFetch(`/api/sucursales/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, address }),
    });
  };

  const deleteBranch = async (id) => {
    return await apiFetch(`/api/sucursales/${id}`, { method: 'DELETE' });
  };

  const createWorker = async (workerName, branchId) => {
    return await apiFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ workerName, branchId }),
    });
  };

  const updateWorker = async (id, workerName, branchId) => {
    return await apiFetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ workerName, branchId }),
    });
  };

  const deleteWorker = async (id) => {
    return await apiFetch(`/api/users/${id}`, { method: 'DELETE' });
  };

  const createSchedule = async (branchId, workerId, dayOfWeek, startTime, endTime, slotDuration) => {
    return await apiFetch('/api/schedules', {
      method: 'POST',
      body: JSON.stringify({ branchId, workerId, dayOfWeek, startTime, endTime, slotDuration }),
    });
  };

  const updateSchedule = async (id, branchId, workerId, dayOfWeek, startTime, endTime, slotDuration) => {
    return await apiFetch(`/api/schedules/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ branchId, workerId, dayOfWeek, startTime, endTime, slotDuration }),
    });
  };

  const deleteSchedule = async (id) => {
    return await apiFetch(`/api/schedules/${id}`, { method: 'DELETE' });
  };

  const createException = async (branchId, workerId, date, isClosed, startTime, endTime) => {
    return await apiFetch('/api/exceptions', {
      method: 'POST',
      body: JSON.stringify({ branchId, workerId, date, isClosed, startTime, endTime }),
    });
  };

  const updateException = async (id, branchId, workerId, date, isClosed, startTime, endTime) => {
    return await apiFetch(`/api/exceptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ branchId, workerId, date, isClosed, startTime, endTime }),
    });
  };

  const deleteException = async (id) => {
    return await apiFetch(`/api/exceptions/${id}`, { method: 'DELETE' });
  };

  const updateAppointment = async (id, startTime, endTime, status) => {
    return await apiFetch(`/api/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ startTime, endTime, status }),
    });
  };

  const getAuditLogs = async (filters) => {
    const query = new URLSearchParams(filters).toString();
    return await apiFetch(`/api/audit-logs?${query}`);
  };

  const logout = () => {
    console.log(`[${instanceId}] Logging out, clearing tokens`);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      error,
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
    [user, loading, error, apiFetch, verify, refresh, fetchUser]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
'use client';

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiFetch = async (url, options = {}) => {
    setLoading(true);
    setError(null);
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
      if (response.status === 401 && refreshToken) {
        const newTokens = await refresh();
        if (newTokens) {
          headers.Authorization = `Bearer ${newTokens.token}`;
          const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            ...options,
            headers,
          });
          if (!retryResponse.ok) {
            const errorData = await retryResponse.json();
            throw new Error(errorData.error || 'Request failed');
          }
          return await retryResponse.json();
        }
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed', { cause: errorData });
      }
      return response.status !== 204 ? await response.json() : null;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, username, name, phone, businessName, logo, isBusiness) => {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username, name, phone, businessName, logo, isBusiness }),
    });
    setToken(data.token);
    await fetchUser();
    return data;
  };

  const login = async (email, password) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setRefreshToken(data.refreshToken);
    await fetchUser();
    return data;
  };

  const verify = async (token) => {
    return await apiFetch(`/auth/verify?token=${token}`);
  };

  const resendVerification = async (email) => {
    return await apiFetch('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  };

  const refresh = async () => {
    try {
      const data = await apiFetch('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
      setToken(data.token);
      setRefreshToken(data.refreshToken);
      return data;
    } catch (err) {
      setToken(null);
      setRefreshToken(null);
      setUser(null);
      return null;
    }
  };

  const fetchUser = async () => {
    try {
      const data = await apiFetch('/auth/me');
      setUser(data);
    } catch (err) {
      setUser(null);
    }
  };

  const updateUser = async (name, phone) => {
    const data = await apiFetch('/user/update', {
      method: 'PUT',
      body: JSON.stringify({ name, phone }),
    });
    setToken(data.token);
    await fetchUser();
    return data;
  };

  const updateBusiness = async (name, logo, timezone) => {
    const data = await apiFetch('/business/update', {
      method: 'PUT',
      body: JSON.stringify({ name, logo, timezone }),
    });
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
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
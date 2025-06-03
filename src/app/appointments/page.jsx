'use client';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Appointments() {
  const { user } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Appointments</h1>
        <p className="text-lg text-gray-600">Welcome, {user.username}! This is your appointments dashboard.</p>
        {/* Add appointment fetching logic later */}
      </div>
    </ProtectedRoute>
  );
}
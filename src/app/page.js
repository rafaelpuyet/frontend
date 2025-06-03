'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Agenda App</h1>
      <p className="text-lg text-gray-600 mb-6">
        Manage your business appointments efficiently in Chile.
      </p>
      {user ? (
        <div>
          <p className="text-xl mb-4">Hello, {user.username}!</p>
          <Link
            href="/appointments"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            View Your Appointments
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-block bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
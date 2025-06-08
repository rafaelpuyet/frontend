'use client';

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-end px-4 sm:px-6 py-3 bg-white border-b border-gray-200 shadow-sm h-16 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Campana de Notificaciones */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
          aria-label="Notifications"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14.1V11a6 6 0 10-12 0v3.1c0 .464-.184.909-.595 1.195L5 17h5m5 0v1a3 3 0 11-6 0v-1m5 0H5" />
          </svg>
        </button>

        {/* Avatar del Perfil */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm sm:text-base font-medium text-slate-700">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
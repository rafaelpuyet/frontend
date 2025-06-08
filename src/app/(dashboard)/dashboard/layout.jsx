'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  const navItems = [
    { path: '/dashboard', label: 'Resumen' },
    { path: '/dashboard/profile', label: 'Perfil' },
    { path: '/dashboard/branches', label: 'Sucursales' },
    { path: '/dashboard/workers', label: 'Trabajadores' },
    { path: '/dashboard/schedules', label: 'Horarios' },
    { path: '/dashboard/exceptions', label: 'Excepciones' },
    { path: '/dashboard/appointments', label: 'Citas' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">MiAgenda</h2>
          <p className="mb-4">Bienvenido, {user?.name || 'Usuario'}</p>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="block py-2 px-4 rounded hover:bg-gray-700"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
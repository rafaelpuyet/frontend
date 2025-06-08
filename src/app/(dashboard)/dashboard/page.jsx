'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
  phone: Yup.string()
    .matches(/^\+?\d{8,20}$/, 'Teléfono inválido (ej. +56912345678)')
    .max(20, 'Máximo 20 caracteres'),
  businessName: Yup.string().max(100, 'Máximo 100 caracteres'),
  timezone: Yup.string().required('La zona horaria es obligatoria'),
});

const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white z-50`}
    role="alert"
  >
    {message}
    <button className="ml-2" onClick={onClose} aria-label="Cerrar notificación">
      ✕
    </button>
  </div>
);

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    branches: 0,
    workers: 0,
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    timezone: 'America/Santiago',
  });
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState(null);

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
        setFormData({
          name: response.data.name || '',
          phone: response.data.phone || '',
          businessName: response.data.business?.name || '',
          timezone: response.data.business?.timezone || 'America/Santiago',
        });
        await fetchStats(token);
      } catch (err) {
        setError('Error al cargar datos del usuario');
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const fetchStats = async (token) => {
    try {
      const [appointments, branches, workers] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            startTime: dayjs().toISOString(),
            endTime: dayjs().add(7, 'day').toISOString(),
          },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/branches`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/workers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setStats({
        upcomingAppointments: Array.isArray(appointments.data) ? appointments.data.length : 0,
        branches: Array.isArray(branches.data) ? branches.data.length : 0,
        workers: Array.isArray(workers.data) ? workers.data.length : 0,
      });
    } catch (err) {
      setNotification({ message: 'Error al cargar estadísticas', type: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        { name: formData.name, phone: formData.phone || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (user?.business) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/business/update`,
          { name: formData.businessName || null, timezone: formData.timezone },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setNotification({ message: 'Ajustes guardados con éxito', type: 'success' });
      setFormErrors({});
      // Actualizar usuario
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = err.inner.reduce((acc, curr) => ({ ...acc, [curr.path]: curr.message }), {});
        setFormErrors(errors);
      } else {
        setNotification({ message: 'Error al guardar ajustes', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const closeNotification = () => setNotification(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4" aria-labelledby="dashboard-title">
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <h1 id="dashboard-title" className="text-3xl font-bold mb-6">
        Panel de Control
      </h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Citas Próximas</h3>
          <p className="text-2xl font-bold text-blue-500">{stats.upcomingAppointments}</p>
          <p className="text-sm text-gray-500">Citas en los próximos 7 días</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Sucursales</h3>
          <p className="text-2xl font-bold text-blue-500">{stats.branches}</p>
          <p className="text-sm text-gray-500">Sucursales activas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Trabajadores</h3>
          <p className="text-2xl font-bold text-blue-500">{stats.workers}</p>
          <p className="text-sm text-gray-500">Trabajadores registrados</p>
        </div>
      </div>

      {/* Ajustes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Ajustes Generales</h2>
        <div className="max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-required="true"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+56912345678"
              className={`mt-1 p-2 w-full border rounded-md ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>
          {user?.business && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del Negocio
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formErrors.businessName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {formErrors.businessName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.businessName}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zona Horaria
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formErrors.timezone ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-required="true"
                >
                  <option value="America/Santiago">America/Santiago</option>
                  <option value="America/Buenos_Aires">America/Buenos_Aires</option>
                  <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                  <option value="America/Lima">America/Lima</option>
                  <option value="America/Bogota">America/Bogota</option>
                </select>
                {formErrors.timezone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.timezone}</p>
                )}
              </div>
            </>
          )}
          <button
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md font-semibold transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            Guardar Ajustes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
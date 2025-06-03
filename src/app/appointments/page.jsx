'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import api from '../../services/api';

export default function Appointments() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/api/appointments');
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las citas');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tus Citas</h1>
        <p className="text-lg text-gray-600 mb-6">Bienvenido, {user.username}!</p>
        {loading ? (
          <div className="text-center">Cargando citas...</div>
        ) : error ? (
          <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">No tienes citas programadas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="p-4 border rounded shadow bg-white">
                <h2 className="text-lg font-semibold">{appointment.title}</h2>
                <p className="text-gray-600">{new Date(appointment.date).toLocaleString('es-CL')}</p>
                <p className="text-gray-600">{appointment.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
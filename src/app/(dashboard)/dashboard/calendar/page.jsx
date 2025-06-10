'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaCalendarAlt, FaTrash } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Calendar() {
  const { user, loading: authLoading, apiFetch } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); // Control de fetch
  const timezone = 'America/Santiago';
  const instanceId = Math.random().toString(36).slice(2, 9); // Debug ID

  useEffect(() => {
    console.log(`[${instanceId}] useEffect triggered: authLoading=${authLoading}, user=${!!user}, hasFetched=${hasFetched}`);

    if (authLoading || !user) {
      console.log(`[${instanceId}] authLoading or no user, setting loading=true`);
      setLoading(true);
      return;
    }

    if (hasFetched) {
      console.log(`[${instanceId}] Already fetched, skipping`);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchAppointments = async () => {
      console.log(`[${instanceId}] Fetching appointments`);
      try {
        const data = await apiFetch('/api/appointments');
        console.log(`[${instanceId}] Appointments fetched:`, data);
        if (isMounted) {
          setAppointments(data.appointments || []);
          setHasFetched(true);
        }
      } catch (err) {
        console.error(`[${instanceId}] Error fetching appointments:`, err);
        if (isMounted) {
          if (err.response?.status === 401) {
            setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
          } else {
            setError(err.message || 'Error al cargar citas.');
          }
          setHasFetched(true); // Evita reintentos
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAppointments();

    return () => {
      isMounted = false;
      console.log(`[${instanceId}] useEffect cleanup`);
    };
  }, [authLoading, user, apiFetch, hasFetched, instanceId]);

  const handleStatusUpdate = async (id, status) => {
    console.log(`[${instanceId}] Updating status for appointment ${id} to ${status}`);
    try {
      await apiFetch(`/api/appointments/${id}`, {
        method: 'PUT',
        data: { status },
      });
      setAppointments(
        appointments.map((appt) =>
          appt.id === id ? { ...appt, status } : appt
        )
      );
    } catch (err) {
      console.error(`[${instanceId}] Error updating status:`, err);
      setError(err.message || 'Error al actualizar cita.');
    }
  };

  const handleDelete = async (id) => {
    console.log(`[${instanceId}] Deleting appointment ${id}`);
    if (!confirm('¿Estás seguro de eliminar esta cita?')) return;

    try {
      await apiFetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      });
      setAppointments(appointments.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error(`[${instanceId}] Error deleting appointment:`, err);
      setError(err.message || 'Error al eliminar cita.');
    }
  };

  if (authLoading || loading) {
    console.log(`[${instanceId}] Rendering loading state`);
    return (
      <div className={`flex min-h-screen items-center justify-center flex-col bg-gray-100 ${inter.className} ${notoSans.className}`}>
        <p className="text-gray-900 text-sm font-medium text-center sm:text-base">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    console.log(`[${instanceId}] No user, returning null`);
    return null; // Layout handles redirect to /login
  }

  if (error) {
    console.log(`[${instanceId}] Rendering error state: ${error}`);
    return (
      <div className={`flex min-h-screen items-center justify-center flex-col bg-gray-100 ${inter.className} ${notoSans.className}`}>
        <div className="bg-red-50 text-red-600 p-4 rounded-md max-w-md">
          <p className="text-sm font-medium text-center sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  console.log(`[${instanceId}] Rendering main content with ${appointments.length} appointments`);
  return (
    <div className={`flex min-h-screen flex-col bg-gray-100 ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center py-6 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col w-full max-w-4xl gap-4">
          <div className="flex items-center justify-center gap-3 pb-4 pt-6">
            <FaCalendarAlt className="text-gray-700 text-lg sm:text-xl md:text-2xl" />
            <h1 className="text-gray-900 text-xl font-bold sm:text-2xl md:text-3xl">
              Gestionar Citas
            </h1>
          </div>
          {appointments.length === 0 ? (
            <p className="text-gray-700 text-sm font-medium text-center sm:text-base">
              No hay citas registradas.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-xl bg-white shadow-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase">
                      Cliente
                    </th>
                    <th className="border px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase">
                      Fecha y Hora
                    </th>
                    <th className="border px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase">
                      Estado
                    </th>
                    <th className="border px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="border px-4 sm:px-6 py-2 sm:py-4 text-sm sm:text-base text-gray-900">
                        {appt.clientName}
                      </td>
                      <td className="border px-4 sm:px-6 py-2 sm:py-4 text-sm sm:text-base text-gray-600">
                        {format(
                          utcToZonedTime(parseISO(appt.startTime), timezone),
                          'dd/MM/yyyy HH:mm'
                        )}
                      </td>
                      <td className="border px-4 sm:px-6 py-2 sm:py-4 text-sm sm:text-base">
                        <select
                          value={appt.status}
                          onChange={(e) => handleStatusUpdate(appt.id, e.target.value)}
                          className="rounded border-gray-300 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmada</option>
                          <option value="cancelled">Cancelada</option>
                        </select>
                      </td>
                      <td className="border px-4 sm:px-6 py-2 sm:py-4 text-sm sm:text-base">
                        <button
                          onClick={() => handleDelete(appt.id)}
                          className="text-red-600 hover:text-red-700"
                          aria-label="Eliminar cita"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
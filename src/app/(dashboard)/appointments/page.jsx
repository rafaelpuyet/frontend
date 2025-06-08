'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaCalendarAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Appointments() {
  const { user, token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timezone = 'America/Santiago'; // Fetch from business later

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setAppointments(data.appointments || []);
        } else {
          throw new Error(data.error || 'Error al cargar citas.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAppointments();
  }, [token]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (response.ok) {
        setAppointments(
          appointments.map((appt) =>
            appt.id === id ? { ...appt, status } : appt
          )
        );
      } else {
        throw new Error(data.error || 'Error al actualizar cita.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className={`flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
        <div className="flex flex-1 flex-col items-center justify-center py-4 px-2">
          <p className="text-gray-900 text-sm font-normal text-center">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
        <div className="flex flex-1 flex-col items-center justify-center py-4 px-2">
          <p className="text-red-500 text-sm font-normal text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center py-4 px-2 sm:px-4 sm:py-6">
        <div className="flex flex-col w-full max-w-4xl gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4">
            <FaCalendarAlt className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold text-center sm:text-2xl md:text-3xl">
              Gestionar Citas
            </h2>
          </div>
          {appointments.length === 0 ? (
            <p className="text-gray-900 text-sm font-normal text-center">No hay citas registradas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-xl">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left text-sm font-medium">Cliente</th>
                    <th className="border px-4 py-2 text-left text-sm font-medium">Fecha y Hora</th>
                    <th className="border px-4 py-2 text-left text-sm font-medium">Estado</th>
                    <th className="border px-4 py-2 text-left text-sm font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 text-sm">{appt.clientName}</td>
                      <td className="border px-4 py-2 text-sm">
                        {format(
                          utcToZonedTime(parseISO(appt.startTime), timezone),
                          'dd/MM/yyyy HH:mm'
                        )}
                      </td>
                      <td className="border px-4 py-2 text-sm">
                        <select
                          value={appt.status}
                          onChange={(e) => handleStatusUpdate(appt.id, e.target.value)}
                          className="rounded border-gray-300 text-sm"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmada</option>
                          <option value="cancelled">Cancelada</option>
                        </select>
                      </td>
                      <td className="border px-4 py-2 text-sm">
                        <button className="text-blue-600 hover:text-blue-700 mr-2">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
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
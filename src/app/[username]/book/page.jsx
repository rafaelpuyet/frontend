'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaCalendarCheck } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function BookAppointment() {
  const { username } = useParams();
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branchId');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  const workerId = searchParams.get('workerId'); // Optional, from availability
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const timezone = 'America/Santiago'; // Default, fetch from business later

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/business/${username}/appointments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            branchId: branchId ? parseInt(branchId) : undefined,
            workerId: workerId ? parseInt(workerId) : undefined,
            startTime,
            endTime,
            clientName,
            clientEmail,
            clientPhone,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error(data.error || 'Error al reservar cita.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!branchId || !startTime || !endTime) {
    return (
      <div className={`flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
        <div className="flex flex-1 flex-col items-center justify-center py-4 px-2">
          <p className="text-red-500 text-sm font-normal text-center">Selecciona un horario primero.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4">
            <FaCalendarCheck className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold text-center sm:text-2xl md:text-3xl">
              Reservar Cita
            </h2>
          </div>
          {success ? (
            <p className="text-gray-900 text-sm font-normal text-center">
              Cita reservada exitosamente. Recibirás un correo de confirmación.
            </p>
          ) : (
            <>
              <p className="text-gray-900 text-sm font-normal text-center">
                Horario seleccionado:{' '}
                {format(utcToZonedTime(parseISO(startTime), timezone), 'dd/MM/yyyy HH:mm')} -{' '}
                {format(utcToZonedTime(parseISO(endTime), timezone), 'HH:mm')}
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-gray-900 text-sm font-medium">Nombre</span>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-gray-900 text-sm font-medium">Correo</span>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-gray-900 text-sm font-medium">Teléfono</span>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+56912345678"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </label>
                {error && <p className="text-red-500 text-sm font-normal text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-xl h-10 px-3 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Reservando...' : 'Confirmar Cita'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
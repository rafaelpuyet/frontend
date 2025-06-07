'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaClock } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Availability() {
  const { username } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const branchId = searchParams.get('branchId');
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timezone = 'America/Santiago'; // Default for Chile, fetch from business later

  useEffect(() => {
    const fetchSlots = async () => {
      if (!branchId) {
        setError('Sucursal no seleccionada.');
        setLoading(false);
        return;
      }
      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/public/business/${username}/availability?branchId=${branchId}&date=${dateStr}`
        );
        const data = await response.json();
        if (response.ok) {
          setSlots(data.availableSlots);
        } else {
          throw new Error(data.error || 'No se encontraron horarios.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [username, branchId, selectedDate]);

  const handleSlotSelect = (slot) => {
    const params = new URLSearchParams({ branchId, ...slot });
    router.push(`/${username}/appointments?${params.toString()}`);
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
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4">
            <FaClock className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold text-center sm:text-2xl md:text-3xl">
              Selecciona un Horario
            </h2>
          </div>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="border border-gray-300 rounded-xl p-4"
          />
          {slots.length === 0 ? (
            <p className="text-gray-900 text-sm font-normal text-center">
              No hay horarios disponibles para esta fecha.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {slots.map((slot, index) => (
                <li key={index} className="border border-gray-300 rounded-xl p-3">
                  <button
                    onClick={() => handleSlotSelect(slot)}
                    className="w-full text-left text-blue-600 hover:text-blue-700"
                  >
                    {format(utcToZonedTime(parseISO(slot.startTime), timezone), 'HH:mm')} -{' '}
                    {format(utcToZonedTime(parseISO(slot.endTime), timezone), 'HH:mm')}
                    {slot.workerName && ` con ${slot.workerName}`}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
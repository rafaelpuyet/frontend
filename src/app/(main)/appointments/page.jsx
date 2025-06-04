'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import FilterBar from '../../../components/FilterBar';
import CalendarView from '../../../components/CalendarView';
import ScheduleView from '../../../components/ScheduleView';
import { Inter, Noto_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Appointments() {
  const { user, loading } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 3)); // June 3, 2025
  const [filters, setFilters] = useState({
    branch: 'all',
    professional: 'all',
    status: 'all',
    reservationType: 'all',
    search: '',
  });

  // Mock data (replace with API call)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      professional: 'Matias Garcia',
      client: 'Patricia Fuenzalida',
      title: 'Tratamiento primera cita',
      start: new Date(2025, 5, 3, 9, 0),
      end: new Date(2025, 5, 3, 11, 0),
      status: 'Confirmado',
      type: 'Primera',
    },
    {
      id: 2,
      professional: 'Sofia Reyes',
      client: 'Macarena Rial',
      title: 'Primera cita',
      start: new Date(2025, 5, 3, 9, 0),
      end: new Date(2025, 5, 3, 10, 0),
      status: 'Confirmado',
      type: 'Primera',
    },
    // Add more appointments as needed
  ]);

  useEffect(() => {
    // Fetch appointments from http://localhost:5000/api/appointments
    console.log('Fetching appointments for date:', selectedDate.toISOString());
  }, [filters, selectedDate, user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-800">Cargando...</div>;
  }



  return (
    <div className={`relative min-h-screen bg-slate-50 ${inter.className} ${notoSans.className}`}>
      <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <FilterBar filters={filters} setFilters={setFilters} />
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-1">
            <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <div className="lg:col-span-2">
            <ScheduleView selectedDate={selectedDate} appointments={appointments} />
          </div>
        </div>
      </div>
    </div>
  );
}
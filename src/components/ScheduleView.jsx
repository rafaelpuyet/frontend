'use client';

import { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { es } from 'date-fns/locale/es';
import ReservationModal from './ReservationModal';

export default function ScheduleView({ selectedDate, appointments }) {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const professionals = [
    { id: '1', name: 'Matias Garcia', title: 'Psicólogo' },
    { id: '2', name: 'Sofia Reyes', title: 'Terapeuta Ocupacional' },
    { id: '3', name: 'Andrea Fuenzalida', title: 'Psiquiatra' },
    { id: '4', name: 'Catalina Fuentes', title: 'Psicóloga Infantil' },
    { id: '5', name: 'Gabriel Ortiz', title: 'Kinesiólogo' },
  ];
  const timeSlots = Array.from({ length: 14 }, (_, i) => 8 + i); // 8:00 to 21:00

  const nextDay = () => setCurrentDate(addDays(currentDate, 1));
  const prevDay = () => setCurrentDate(subDays(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getAppointmentsForProfessional = (professionalId) => {
    return appointments.filter((appt) => appt.professional === professionals.find((p) => p.id === professionalId)?.name);
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={prevDay} className="p-1 text-gray-600 hover:text-blue-600">
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
          <button
            onClick={goToToday}
            className="rounded px-3 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 sm:text-base cursor-pointer"
          >
            Hoy
          </button>
          <button onClick={nextDay} className="p-1 text-gray-600 hover:text-blue-600">
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
          <h3 className="text-gray-900 text-sm font-medium sm:text-base">
            {format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
          </h3>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button className="p-1 text-gray-600 hover:text-blue-600">
            <i className="fas fa-sync-alt text-sm"></i>
          </button>
          <button className="p-1 text-gray-600 hover:text-blue-600">
            <i className="fas fa-th-list text-sm"></i>
          </button>
          <button className="rounded px-3 py-2 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 sm:text-base cursor-pointer">
            <i className="mr-2 fas fa-plus"></i>
            Nuevo
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-2 sm:gap-3">
            <div></div>
            {professionals.map((prof) => (
              <div key={prof.id} className="text-center">
                <p className="text-sm font-bold text-gray-900 sm:text-base">{prof.name}</p>
                <p className="text-xs text-gray-700 sm:text-sm">{prof.title}</p>
              </div>
            ))}
          </div>
          {timeSlots.map((hour) => (
            <div key={hour} className="grid grid-cols-[80px_repeat(5,1fr)] gap-2 sm:gap-3 border-t border-gray-200 pt-2">
              <div className="text-sm text-gray-700 sm:text-base">{`${hour}:00`}</div>
              {professionals.map((prof) => {
                const appts = getAppointmentsForProfessional(prof.id).filter(
                  (appt) => appt.start.getHours() === hour
                );
                return (
                  <div key={prof.id} className="relative min-h-[60px]">
                    {appts.map((appt) => (
                      <button
                        key={appt.id}
                        onClick={() => setSelectedAppointment(appt)}
                        className="absolute left-0 right-0 bg-blue-100 text-blue-800 text-xs p-1 sm:p-2 hover:bg-blue-200 rounded-md cursor-pointer"
                        style={{
                          top: '0',
                          height: `${(appt.end.getHours() - appt.start.getHours()) * 60}px`,
                        }}
                      >
                        <p className="font-semibold">{appt.client}</p>
                        <p>{appt.title}</p>
                        <p>{`${appt.start.getHours()}:00 - ${appt.end.getHours()}:00`}</p>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {selectedAppointment && (
        <ReservationModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
}
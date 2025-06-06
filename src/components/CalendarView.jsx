'use client';

import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { es } from 'date-fns/locale/es';

export default function CalendarView({ selectedDate, setSelectedDate }) {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const firstDayIndex = getDay(monthStart);

    // Debug: Verify days array
    console.log('Days in month:', days.map((d) => format(d, 'yyyy-MM-dd')));

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-gray-300 bg-white p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-gray-900 text-sm font-bold sm:text-base">{format(currentMonth, 'MMMM yyyy', { locale: es })}</h3>
                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="text-gray-600 hover:text-blue-600 p-1 cursor-pointer">
                            <i className="fas fa-chevron-left text-sm"></i>
                        </button>
                        <button onClick={nextMonth} className="text-gray-600 hover:text-blue-600 p-1 cursor-pointer">
                            <i className="fas fa-chevron-right text-sm"></i>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm sm:text-base">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="text-gray-700 font-medium">{day}</div>
                    ))}
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`}></div>
                    ))}
                    {days.map((day) => (
                        <button
                            key={day.toISOString()}
                            onClick={() => setSelectedDate(day)}
                            className={`p-2 rounded-full hover:bg-blue-100 ${format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600'
                                } cursor-pointer`}
                        >
                            {day.getDate()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
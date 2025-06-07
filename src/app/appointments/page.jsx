'use client';

import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaCalendarAlt, FaBuilding, FaUser, FaClock, FaBan, FaHistory } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Appointments() {
  const { user, createBranch, updateBranch, deleteBranch, createWorker, updateWorker, deleteWorker, createSchedule, updateSchedule, deleteSchedule, createException, updateException, deleteException, updateAppointment, getAuditLogs, logout } = useContext(AuthContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('appointments');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const tabs = [
    { id: 'appointments', label: 'Citas', icon: FaCalendarAlt },
    { id: 'branches', label: 'Sucursales', icon: FaBuilding, disabled: !user.isBusiness },
    { id: 'workers', label: 'Trabajadores', icon: FaUser },
    { id: 'schedules', label: 'Horarios', icon: FaClock },
    { id: 'exceptions', label: 'Excepciones', icon: FaBan },
    { id: 'audit', label: 'Auditoría', icon: FaHistory },
  ];

  // Placeholder for tab content (implement CRUD forms for each tab)
  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <div className="p-4">Gestión de citas (pendiente de implementación)</div>;
      case 'branches':
        return <div className="p-4">Gestión de sucursales (pendiente de implementación)</div>;
      case 'workers':
        return <div className="p-4">Gestión de trabajadores (pendiente de implementación)</div>;
      case 'schedules':
        return <div className="p-4">Gestión de horarios (pendiente de implementación)</div>;
      case 'exceptions':
        return <div className="p-4">Gestión de excepciones (pendiente de implementación)</div>;
      case 'audit':
        return <div className="p-4">Logs de auditoría (pendiente de implementación)</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-between gap-2 pb-6 pt-4 sm:gap-3 sm:pb-12 sm:pt-10">
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Panel de Gestión
            </h2>
            <button
              onClick={logout}
              className="text-blue-600 underline hover:text-blue-700 text-sm sm:text-base"
            >
              Cerrar Sesión
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map(({ id, label, icon: Icon, disabled }) => (
              <button
                key={id}
                onClick={() => !disabled && setActiveTab(id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-xl ${
                  activeTab === id ? 'bg-blue-700 text-white' : disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#d7e1f3] text-[#121417] hover:bg-blue-700 hover:text-white'
                }`}
                disabled={disabled}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {error && <p className="text-red-500 text-xs font-normal text-center sm:text-sm">{error}</p>}
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
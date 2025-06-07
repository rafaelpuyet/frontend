'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaCalendarAlt, FaTrash } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function ManageAppointment() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    token: searchParams.get('token') || '',
    date: '',
    startTime: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [business, setBusiness] = useState(null);
  const [branchId, setBranchId] = useState(null);

  useEffect(() => {
    if (!formData.token) {
      setErrors({ submit: 'Token inválido. Revisa el enlace proporcionado.' });
    }
  }, [formData.token]);

  useEffect(() => {
    if (formData.date && branchId) {
      const fetchAvailability = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/public/business/${business.username}/availability?branchId=${branchId}&date=${formData.date}`
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener disponibilidad');
          }
          const data = await response.json();
          setAvailableSlots(data.availableSlots);
        } catch (err) {
          setErrors({ submit: err.message });
        } finally {
          setLoading(false);
        }
      };
      fetchAvailability();
    }
  }, [formData.date, branchId, business]);

  const validateRescheduleForm = () => {
    const newErrors = {};
    if (!formData.token) {
      newErrors.token = 'El token es obligatorio.';
    }
    if (!formData.date) {
      newErrors.date = 'Selecciona una fecha.';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Selecciona un horario.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    if (!validateRescheduleForm()) return;

    setLoading(true);
    try {
      const slot = availableSlots.find((s) => s.startTime === formData.startTime);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: formData.token,
          startTime: formData.startTime,
          endTime: slot?.endTime,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          setErrors({ submit: 'Demasiados intentos. Intenta de nuevo en unos minutos.' });
        } else {
          setErrors({ submit: errorData.error || 'Error al reprogramar la cita.' });
        }
        throw new Error(errorData.error);
      }
      const data = await response.json();
      setMessage(data.message || 'Cita reprogramada con éxito.');
      setTimeout(() => router.push('/'), 5000);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Reschedule error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!formData.token) {
      setErrors({ submit: 'Token inválido.' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: formData.token }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          setErrors({ submit: 'Demasiados intentos. Intenta de nuevo en unos minutos.' });
        } else {
          setErrors({ submit: errorData.error || 'Error al cancelar la cita.' });
        }
        throw new Error(errorData.error);
      }
      const data = await response.json();
      setMessage(data.message || 'Cita cancelada con éxito.');
      setTimeout(() => router.push('/'), 5000);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Cancel error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4 sm:gap-3 sm:pb-12 sm:pt-10">
            <FaCalendarAlt className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Gestionar Cita
            </h2>
          </div>
          <form onSubmit={handleReschedule} className="flex flex-col gap-3 sm:gap-4">
            <label className="flex flex-col gap-1">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
              {errors.date && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.date}</p>}
            </label>
            {availableSlots.length > 0 && (
              <label className="flex flex-col gap-1">
                <select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  required
                >
                  <option value="">Selecciona un horario</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.startTime} value={slot.startTime}>
                      {new Date(slot.startTime).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                      {slot.workerName ? ` (${slot.workerName})` : ''}
                    </option>
                  ))}
                </select>
                {errors.startTime && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.startTime}</p>}
              </label>
            )}
            {errors.submit && <p className="text-red-500 text-xs font-normal text-center sm:text-sm">{errors.submit}</p>}
            {message && <p className="text-green-500 text-xs font-normal text-center sm:text-sm">{message}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-[#d7e1f3] text-[#121417] hover:bg-blue-700 hover:text-white sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Cargando...' : 'Reprogramar Cita'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className={`flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-red-500 text-white hover:bg-red-600 sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaTrash className="mr-2 h-4 w-4" />
                {loading ? 'Cargando...' : 'Cancelar Cita'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
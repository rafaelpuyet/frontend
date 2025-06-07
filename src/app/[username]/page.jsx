'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaCalendarAlt } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function PublicBooking() {
  const { username } = useParams();
  const router = useRouter();
  const [business, setBusiness] = useState(null);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    branchId: '',
    workerId: '',
    date: '',
    startTime: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/business/${username}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Negocio no encontrado');
        }
        const data = await response.json();
        setBusiness(data.business);
        setBranches(data.branches);
        if (data.branches.length === 1) {
          setFormData((prev) => ({ ...prev, branchId: data.branches[0].id }));
        }
      } catch (err) {
        setErrors({ submit: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [username]);

  useEffect(() => {
    if (formData.branchId && formData.date) {
      const fetchAvailability = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/public/business/${username}/availability?branchId=${formData.branchId}&date=${formData.date}`
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
  }, [formData.branchId, formData.date, username]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.branchId && branches.length > 1) {
      newErrors.branchId = 'Selecciona una sucursal.';
    }
    if (!formData.date) {
      newErrors.date = 'Selecciona una fecha.';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Selecciona un horario.';
    }
    if (!formData.clientName.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/)) {
      newErrors.clientName = 'El nombre debe tener 2-100 caracteres, solo letras.';
    }
    if (!formData.clientEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.clientEmail = 'Ingresa un correo electrónico válido.';
    }
    if (!formData.clientPhone.match(/^\+?[1-9]\d{1,14}$/)) {
      newErrors.clientPhone = 'El teléfono debe ser válido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const slot = availableSlots.find((s) => s.startTime === formData.startTime);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/business/${username}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branchId: parseInt(formData.branchId),
          workerId: slot?.workerId || null,
          startTime: formData.startTime,
          endTime: slot?.endTime,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          setErrors({ submit: 'Demasiados intentos. Intenta de nuevo en unos minutos.' });
        } else {
          setErrors({ submit: errorData.error || 'Error al reservar la cita.' });
        }
        throw new Error(errorData.error);
      }
      const data = await response.json();
      setMessage(data.message || 'Cita reservada con éxito. Revisa tu correo para confirmar.');
      setTimeout(() => router.push('/'), 5000);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Booking error:', err);
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

  if (!business && !errors.submit) return <div className="text-center py-10">Cargando...</div>;
  if (errors.submit && !business) return <div className="text-center py-10 text-red-500">{errors.submit}</div>;

  return (
    <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4 sm:gap-3 sm:pb-12 sm:pt-10">
            <FaCalendarAlt className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Reservar Cita - {business.name}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            {branches.length > 1 && (
              <label className="flex flex-col gap-1">
                <select
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                  required
                >
                  <option value="">Selecciona una sucursal</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                {errors.branchId && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.branchId}</p>}
              </label>
            )}
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
            <label className="flex flex-col gap-1">
              <input
                type="text"
                name="clientName"
                placeholder="Nombre completo"
                value={formData.clientName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
              {errors.clientName && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.clientName}</p>}
            </label>
            <label className="flex flex-col gap-1">
              <input
                type="text"
                name="clientEmail"
                placeholder="Correo electrónico"
                value={formData.clientEmail}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
              {errors.clientEmail && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.clientEmail}</p>}
            </label>
            <label className="flex flex-col gap-1">
              <input
                type="text"
                name="clientPhone"
                placeholder="Teléfono (ej. +56912345678)"
                value={formData.clientPhone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
              {errors.clientPhone && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.clientPhone}</p>}
            </label>
            {errors.submit && <p className="text-red-500 text-xs font-normal text-center sm:text-sm">{errors.submit}</p>}
            {message && <p className="text-green-500 text-xs font-normal text-center sm:text-sm">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-[#d7e1f3] text-[#121417] hover:bg-blue-700 hover:text-white sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Cargando...' : 'Reservar Cita'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
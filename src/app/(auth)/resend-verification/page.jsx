'use client';

import { useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from '../../../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaEnvelope } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function ResendVerification() {
  const { resendVerification } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await resendVerification(email);
      setMessage('Correo de verificación enviado. Revisa tu bandeja de entrada.');
      setTimeout(() => router.push('/login'), 5000);
    } catch (err) {
      setErrors({ submit: err.message || 'Error al enviar el correo. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4 sm:gap-3 sm:pb-12 sm:pt-10">
            <FaEnvelope className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Reenviar Verificación
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            <label className="flex flex-col gap-1">
              <input
                type="text"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
              {errors.email && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.email}</p>}
            </label>
            {errors.submit && <p className="text-red-500 text-xs font-normal text-center sm:text-sm">{errors.submit}</p>}
            {message && <p className="text-green-500 text-xs font-normal text-center sm:text-sm">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-[#d7e1f3] text-[#121417] hover:bg-blue-700 hover:text-white sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Cargando...' : 'Enviar Correo'}
            </button>
            <p className="text-gray-900 text-xs font-normal text-center sm:text-sm">
              ¿Ya tienes cuenta verificada?{' '}
              <Link href="/login" className="text-blue-600 underline hover:text-blue-700 inline-block px-2 py-1">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
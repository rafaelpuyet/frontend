'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.identifier, formData.password);
      router.push('/appointments');
    } catch (err) {
      setError(err.response.data.error || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex min-h-screen flex-col bg-slate-50 ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-2 pt-4 sm:gap-3 sm:pb-3 sm:pt-5">
            <i className="fas fa-calendar-alt text-gray-900 text-lg sm:text-xl md:text-2xl"></i>
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Iniciar Sesión
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            <label className="flex flex-col gap-1">
              <input
                type="text"
                name="identifier"
                placeholder="Correo electrónico o nombre de usuario"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
            </label>
            {error && (
              <p className="text-red-500 text-xs font-normal text-center sm:text-sm">
                {error}
              </p>
            )}
            <Link
              href="/forgot-password"
              className="text-gray-500 text-xs font-normal underline hover:text-gray-700 text-center inline-block px-2 py-1 sm:text-sm"
            >
              Olvidé mi contraseña
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-[#d7e1f3] text-[#121417] hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer disabled:cursor-not-allowed sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>
          <p className="text-gray-500 text-xs font-normal text-center sm:text-sm">
            ¿No tienes cuenta?{' '}
            <Link
              href="/register"
              className="text-blue-600 underline hover:text-blue-700 inline-block px-2 py-1"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
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
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      await login(formData.email, formData.password);
      router.push('/appointments');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex min-h-screen flex-col bg-slate-50 ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-5 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-4">
          <div className="flex items-center gap-3 pb-3 pt-5">
            <i className="fas fa-calendar-alt text-gray-900 text-xl"></i>
            <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight text-center">
              Iniciar Sesión
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <input
                type="text"
                name="email"
                placeholder="Correo electrónico o nombre de usuario"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:text-base"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:text-base"
                required
              />
            </label>
            {error && (
              <p className="text-red-500 text-sm font-normal text-center">{error}</p>
            )}
            <Link
              href="/forgot-password"
              className="text-gray-500 text-sm font-normal underline hover:text-gray-700 text-center"
            >
              Olvidé mi contraseña
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl h-10 px-4 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:bg-blue-400 sm:h-12 sm:text-base"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>
          <p className="text-gray-500 text-sm font-normal text-center">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-blue-600 underline hover:text-blue-700">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
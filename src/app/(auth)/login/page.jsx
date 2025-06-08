'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err) {
      if (err.cause?.error === 'Account not verified') {
        router.push(`/resend-verification?email=${encodeURIComponent(formData.email)}`);
      } else {
        setErrors({ submit: err.message || 'Error al iniciar sesión. Intenta de nuevo.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4 sm:gap-3 sm:pb-12 sm:pt-10">
            <FaSignInAlt className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Iniciar Sesión
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            <label className="flex flex-col gap-1">
              <input
                type="text"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
              {errors.email && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.email}</p>}
            </label>
            <label className="flex flex-col gap-1">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:py-3 sm:text-base pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.password}</p>}
            </label>
            {errors.submit && <p className="text-red-500 text-xs font-normal text-center sm:text-sm">{errors.submit}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-[#d7e1f3] text-[#121417] hover:bg-blue-700 hover:text-white sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
            <p className="text-gray-900 text-xs font-normal text-center sm:text-sm">
              ¿No tienes cuenta?{' '}
              <Link href="/register" className="text-blue-600 underline hover:text-blue-700 inline-block px-2 py-1">
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
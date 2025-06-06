'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaUserPlus, FaEye, FaEyeSlash, FaUser, FaBuilding } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Register() {
  const { register } = useContext(AuthContext) || {};
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    accountType: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = 'Ingresa un correo electrónico válido.';
      }
      if (!formData.password.match(/^[A-Za-z\d]{8,}$/)) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres, solo letras y números.';
      }
    } else if (step === 2) {
      if (!formData.username.match(/^[a-zA-Z0-9_-]{3,20}$/)) {
        newErrors.username = 'El nombre de usuario debe tener 3-20 caracteres, solo letras, números, guiones o subrayados.';
      }
      if (!formData.firstName.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/)) {
        newErrors.firstName = 'El nombre debe tener 2-50 caracteres, solo letras.';
      }
      if (!formData.lastName.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/)) {
        newErrors.lastName = 'El apellido debe tener 2-50 caracteres, solo letras.';
      }
    } else if (step === 3) {
      if (!formData.accountType) {
        newErrors.accountType = 'Selecciona un tipo de cuenta.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleAccountType = async (type) => {
    const updatedFormData = { ...formData, accountType: type };
    setFormData(updatedFormData);
    setErrors({ ...errors, accountType: '' });

    const isValid = validateStep(3);
    if (!isValid) return;

    setLoading(true);
    try {
      console.log('Sending registration request:', updatedFormData); // Debug log
      if (typeof register !== 'function') {
        console.warn('AuthContext register is not a function, falling back to direct fetch');
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Registration failed');
        }
        const data = await response.json();
        router.push('/appointments');
        return data;
      } else {
        await register(
          updatedFormData.email,
          updatedFormData.password,
          updatedFormData.username,
          updatedFormData.firstName,
          updatedFormData.lastName,
          updatedFormData.accountType
        );
        router.push('/appointments');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Error al registrarse. Intenta de nuevo.';
      console.error('Registration error:', err); // Debug log
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const [step, setStep] = useState(1);

  return (
    <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4 sm:gap-3 sm:pb-12 sm:pt-10">
            <FaUserPlus className="text-gray-900 text-lg sm:text-sm md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Registrarse
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {step === 1 && (
              <>
                <label className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:text-base py-3"
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
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:text-base py-3 pr-10"
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
              </>
            )}
            {step === 2 && (
              <>
                <label className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:text-base py-3"
                    required
                  />
                  {errors.username && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.username}</p>}
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="flex flex-col gap-1 sm:w-1/2">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:text-base py-3"
                      required
                    />
                    {errors.firstName && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.firstName}</p>}
                  </label>
                  <label className="flex flex-col gap-1 sm:w-1/2">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Apellido"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:px-4 sm:text-base py-3"
                      required
                    />
                    {errors.lastName && <p className="text-red-500 text-xs font-normal sm:text-sm">{errors.lastName}</p>}
                  </label>
                </div>
              </>
            )}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                <p className="text-gray-900 text-sm font-medium text-center sm:text-base">Selecciona el tipo de cuenta</p>
                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => handleAccountType('personal')}
                    disabled={loading}
                    className={`rounded-xl p-5 font-bold flex flex-col items-center cursor-pointer ${
                      formData.accountType === 'personal' ? 'bg-blue-700 text-white' : 'bg-[#d7e1f3] text-[#121417] hover:bg-blue-700'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <FaUser className="text-2xl mb-2" />
                    <span className="text-lg">Personal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAccountType('business')}
                    disabled={loading}
                    className={`rounded-xl p-5 font-bold flex flex-col items-center cursor-pointer ${
                      formData.accountType === 'business' ? 'bg-blue-700 text-white' : 'bg-[#d7e1f3] text-[#121417] hover:bg-blue-700'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <FaBuilding className="text-2xl mb-2" />
                    <span className="text-lg">Negocio</span>
                  </button>
                </div>
                {errors.accountType && <p className="text-red-500 text-xs font-normal text-center sm:text-sm">{errors.accountType}</p>}
                {errors.submit && <p className="text-red-500 text-xs font-normal text-center sm:text-sm">{errors.submit}</p>}
              </div>
            )}
            {step < 3 && (
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-gray-300 text-gray-900 hover:bg-gray-400 sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg cursor-pointer"
                  >
                    Atrás
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-[#d7e1f3] text-[#121417] hover:bg-blue-700 sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            )}
            <p className="text-gray-900 text-xs font-normal text-center sm:text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link
                href="/login"
                className="text-blue-600 underline hover:text-blue-700 inline-block px-2 py-1"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
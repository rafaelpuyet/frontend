// app/register/page.js (Next.js App Router)
'use client';

import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Registro exitoso. ¡Inicia sesión!');
      } else {
        setError(data.message || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error en el servidor. Intenta de nuevo.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-[#121417] items-center justify-center">
      <div className="bg-[#293338] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Registrarse</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-white mb-2">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:border-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-white mb-2">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:border-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:border-blue-600"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:border-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            <FaUserPlus className="inline mr-2" /> Registrarse
          </button>
        </form>
        <p className="text-white text-center mt-4">
          ¿Ya tienes una cuenta? <Link href="/login" className="text-blue-400 hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
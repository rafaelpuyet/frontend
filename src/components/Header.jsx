'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 text-gray-900 sm:px-6 md:px-10">
      <div className="flex items-center gap-3">
        <i className="fas fa-calendar-alt text-gray-900 text-lg"></i>
        <h2 className="text-lg font-bold text-gray-900">Agendame</h2>
      </div>
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-gray-900 text-xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
        {/* Navigation */}
        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center gap-4 absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 border-b md:border-0 border-gray-200 z-10`}
        >
          <Link href="/" className="text-gray-900 text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
            Inicio
          </Link>
          <Link href="#pricing" className="text-gray-900 text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
            Precios
          </Link>
          <Link href="#features" className="text-gray-900 text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
            Características
          </Link>
          <Link href="#testimonials" className="text-gray-900 text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
            Testimonios
          </Link>
        </nav>
        {/* Auth Actions */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/appointments"
              className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#1988ff] text-white text-sm font-bold"
            >
              Citas
            </Link>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="text-gray-900 text-sm font-medium hover:underline"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link
            href="/register"
            className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#1988ff] text-white text-sm font-bold"
          >
            Regístrate Gratis
          </Link>
        )}
      </div>
    </header>
  );
}
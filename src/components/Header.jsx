'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Agenda App</Link>
        </h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          {user ? (
            <>
              <Link href="/appointments" className="hover:underline">
                Citas
              </Link>
              <button
                onClick={logout}
                className="hover:underline focus:outline-none"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="hover:underline">
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e6edf4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0c141d]">
            <h2 className="text-[#0c141d] text-lg font-bold leading-tight tracking-[-0.015em]">Agendame</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#0c141d] text-sm font-medium leading-normal" href="#">Inicio</a>
              <a className="text-[#0c141d] text-sm font-medium leading-normal" href="#">Precios</a>
              <a className="text-[#0c141d] text-sm font-medium leading-normal" href="#">Características</a>
              <a className="text-[#0c141d] text-sm font-medium leading-normal" href="#">Testimonios</a>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1988ff] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Regístrate Gratis</span>
            </button>
          </div>
        </header>
  );
}
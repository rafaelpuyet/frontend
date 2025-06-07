'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from '../../../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import { FaCheckCircle } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Verify() {
  const { verify } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Verificando...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('Token inválido');
      setError('El enlace de verificación es inválido.');
      return;
    }

    const verifyToken = async () => {
      try {
        await verify(token);
        setStatus('Cuenta verificada');
        setTimeout(() => router.push('/login'), 3000);
      } catch (err) {
        setStatus('Error de verificación');
        setError(err.message || 'El token es inválido o ha expirado. Solicita un nuevo enlace.');
      }
    };

    verifyToken();
  }, [searchParams, verify, router]);

  return (
    <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4 sm:gap-3 sm:pb-12 sm:pt-10">
            <FaCheckCircle className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Verificar Cuenta
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-gray-900 text-sm font-normal text-center sm:text-base">{status}</p>
            {error && (
              <>
                <p className="text-red-500 text-xs font-normal text-center sm:text-sm">{error}</p>
                <button
                  onClick={() => router.push(`/resend-verification?email=${encodeURIComponent(searchParams.get('email') || '')}`)}
                  className="flex w-full items-center justify-center rounded-xl h-10 px-3 text-sm font-bold bg-[#d7e1f3] text-[#121417] hover:bg-blue-700 hover:text-white sm:h-12 sm:px-4 sm:text-base md:h-14 md:text-lg cursor-pointer"
                >
                  Reenviar Enlace
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
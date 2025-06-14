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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      if (!token) {
        if (isMounted) {
          setError('Token de verificación no proporcionado.');
          setLoading(false);
        }
        return;
      }

      try {
        await verify(token);
        if (isMounted) {
          setSuccess(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error al verificar el correo. Intenta de nuevo.');
          setLoading(false);
        }
      }
    };

    if (!success) {
      verifyToken();
    }

    return () => {
      isMounted = false;
    };
  }, [token, success]);

  if (loading) {
    return (
      <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
        <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
          <p className="text-gray-900 text-sm font-normal text-center sm:text-base">Verificando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex min-h-screen flex-col bg-white ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-1 flex-col items-center justify-center py-4 px-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10">
        <div className="flex flex-col w-full max-w-[512px] gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2 pb-6 pt-4 sm:gap-3 sm:pb-12 sm:pt-10">
            <FaCheckCircle className="text-gray-900 text-lg sm:text-xl md:text-2xl" />
            <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight text-center sm:text-2xl md:text-3xl">
              Verificar Correo
            </h2>
          </div>
          {success && (
            <>
              <p className="text-gray-900 text-sm font-normal text-center sm:text-base">
                Correo verificado exitosamente. Ahora puedes iniciar sesión.
              </p>
              <p className="text-gray-900 text-sm font-normal text-center sm:text-base">
                <Link href="/login" className="text-blue-600 underline hover:text-blue-700 inline-block px-2 py-1">
                  Ir a iniciar sesión
                </Link>
              </p>
            </>
          )}
          {error && (
            <>
              <p className="text-red-500 text-sm font-normal text-center sm:text-base">{error}</p>
              <p className="text-gray-900 text-sm font-normal text-center sm:text-base">
                ¿No recibiste el correo?{' '}
                <a href="/resend-verification" className="text-blue-600 underline hover:text-blue-700 inline-block px-2 py-1">
                  Reenviar verificación
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
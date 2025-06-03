'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-800">Cargando...</div>;
  }

  return (
    <div className={`relative flex min-h-screen flex-col bg-slate-50 ${inter.className} ${notoSans.className}`}>
      <div className="flex flex-col flex-1">
        {/* Hero Section */}
        <div
          className="relative flex min-h-[400px] flex-col items-center justify-center gap-4 bg-cover bg-center bg-no-repeat p-4 sm:gap-6 md:min-h-[480px] md:gap-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('/main.jpg')`,
          }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Organiza tu Negocio con Agendame
            </h1>
            <h2 className="text-white text-xs font-normal leading-normal sm:text-sm md:text-base">
              Gestión de citas fácil y profesional
            </h2>
          </div>
          {user ? (
            <Link
              href="/appointments"
              className="flex min-w-[120px] max-w-[480px] items-center justify-center rounded-lg h-9 px-3 text-white text-xs font-bold tracking-wide bg-blue-600 hover:bg-blue-700 sm:h-10 sm:px-4 sm:text-sm md:h-12 md:px-5 md:text-base"
            >
              Ver Mis Citas
            </Link>
          ) : (
            <Link
              href="/register"
              className="flex min-w-[120px] max-w-[480px] items-center justify-center rounded-lg h-9 px-3 text-white text-xs font-bold tracking-wide bg-blue-600 hover:bg-blue-700 sm:h-10 sm:px-4 sm:text-sm md:h-12 md:px-5 md:text-base"
            >
              Regístrate Gratis
            </Link>
          )}
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="container mx-auto px-4 py-5 sm:py-8">
          <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight pb-3 pt-5 sm:text-2xl">
            Planes y Precios
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
            {/* Free Plan */}
            <div className="flex flex-col gap-4 rounded-lg border border-gray-300 bg-slate-50 p-5 sm:p-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-gray-900 text-base font-bold leading-tight">Plan Gratuito</h3>
                <p className="flex items-baseline gap-1">
                  <span className="text-gray-900 text-3xl font-black leading-tight tracking-tight sm:text-4xl">$0</span>
                  <span className="text-gray-900 text-sm font-bold leading-tight sm:text-base">/mes</span>
                </p>
              </div>
              <Link
                href="/register"
                className="flex min-w-[120px] max-w-[480px] items-center justify-center rounded-lg h-9 px-3 text-gray-900 text-xs font-bold tracking-wide bg-gray-200 hover:bg-gray-300 sm:h-10 sm:px-4 sm:text-sm"
              >
                Seleccionar
              </Link>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-gray-900 text-xs font-normal leading-normal sm:text-[13px]">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                  Hasta 2 citas/mes
                </div>
                <div className="flex items-center gap-3 text-gray-900 text-xs font-normal leading-normal sm:text-[13px]">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                  Gestión básica de citas
                </div>
              </div>
            </div>
            {/* Premium Plan */}
            <div className="flex flex-col gap-4 rounded-lg border border-gray-300 bg-slate-50 p-5 sm:p-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900 text-base font-bold leading-tight">Plan Premium</h3>
                  <span className="text-white text-xs font-medium bg-blue-600 px-2 py-1 rounded-lg sm:px-3">Recomendado</span>
                </div>
                <p className="flex items-baseline gap-1">
                  <span className="text-gray-900 text-3xl font-black leading-tight tracking-tight sm:text-4xl">~3.180 CLP</span>
                  <span className="text-gray-900 text-sm font-bold leading-tight sm:text-base">/mes</span>
                </p>
              </div>
              <Link
                href="/register"
                className="flex min-w-[120px] max-w-[480px] items-center justify-center rounded-lg h-9 px-3 text-gray-900 text-xs font-bold tracking-wide bg-gray-200 hover:bg-gray-300 sm:h-10 sm:px-4 sm:text-sm"
              >
                Seleccionar
              </Link>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-gray-900 text-xs font-normal leading-normal sm:text-[13px]">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                  Citas ilimitadas
                </div>
                <div className="flex items-center gap-3 text-gray-900 text-xs font-normal leading-normal sm:text-[13px]">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                  Recordatorios por SMS
                </div>
                <div className="flex items-center gap-3 text-gray-900 text-xs font-normal leading-normal sm:text-[13px]">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                  Integración con redes sociales
                </div>
                <div className="flex items-center gap-3 text-gray-900 text-xs font-normal leading-normal sm:text-[13px]">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                  Soporte prioritario
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="container mx-auto px-4 py-8 sm:py-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl md:font-black">
              Simplifica tu Gestión de Citas
            </h2>
            <p className="text-gray-900 text-sm font-normal leading-normal max-w-[720px] sm:text-base">
              Agendame te ofrece herramientas intuitivas para organizar tu agenda y atender a tus clientes de manera eficiente.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-3">
            <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-slate-50 p-4">
              <i className="fas fa-calendar-alt text-gray-900 text-xl sm:text-2xl"></i>
              <div className="flex flex-col gap-1">
                <h3 className="text-gray-900 text-sm font-bold leading-tight sm:text-base">Configuración Sencilla</h3>
                <p className="text-blue-500 text-xs font-normal leading-normal sm:text-sm">
                  Crea tu horario en minutos y personaliza tus servicios.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-slate-50 p-4">
              <i className="fas fa-users text-gray-900 text-xl sm:text-2xl"></i>
              <div className="flex flex-col gap-1">
                <h3 className="text-gray-900 text-sm font-bold leading-tight sm:text-base">Reservas de Clientes</h3>
                <p className="text-blue-500 text-xs font-normal leading-normal sm:text-sm">
                  Permite que tus clientes reserven citas en línea, 24/7.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-slate-50 p-4">
              <i className="fas fa-clock text-gray-900 text-xl sm:text-2xl"></i>
              <div className="flex flex-col gap-1">
                <h3 className="text-gray-900 text-sm font-bold leading-tight sm:text-base">Recordatorios Automáticos</h3>
                <p className="text-blue-500 text-xs font-normal leading-normal sm:text-sm">
                  Reduce las ausencias con recordatorios por correo electrónico y SMS.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="container mx-auto px-4 py-5 sm:py-8">
          <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight pb-3 pt-5 sm:text-2xl">
            Testimonios
          </h2>
          <div className="flex overflow-x-auto gap-3 py-4 scrollbar-hide snap-x snap-mandatory">
            <div className="flex flex-col gap-4 rounded-lg min-w-[200px] sm:min-w-[240px] snap-center">
              <div className="relative w-full h-48 rounded-lg sm:h-60">
                <Image
                  src="/testimonial_1.jpg"
                  alt="Testimonio de Juan, Peluquero"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-900 text-sm font-medium leading-normal sm:text-base">Juan, Peluquero</p>
                <p className="text-blue-500 text-xs font-normal leading-normal sm:text-sm">
                  "Agendame ha transformado mi negocio. Mis clientes pueden reservar fácilmente y yo tengo más tiempo para concentrarme en mi trabajo."
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg min-w-[200px] sm:min-w-[240px] snap-center">
              <div className="relative w-full h-48 rounded-lg sm:h-60">
                <Image
                  src="/testimonial_2.jpg"
                  alt="Testimonio de Sofia, Instructora de Yoga"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-900 text-sm font-medium leading-normal sm:text-base">Sofia, Instructora de Yoga</p>
                <p className="text-blue-500 text-xs font-normal leading-normal sm:text-sm">
                  "La flexibilidad de Agendame me permite gestionar mis clases y citas privadas sin complicaciones. Mis alumnos adoran la facilidad de reserva."
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg min-w-[200px] sm:min-w-[240px] snap-center">
              <div className="relative w-full h-48 rounded-lg sm:h-60">
                <Image
                  src="/testimonial_3.jpg"
                  alt="Testimonio de Carlos, Mecánico"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-900 text-sm font-medium leading-normal sm:text-base">Carlos, Mecánico</p>
                <p className="text-blue-500 text-xs font-normal leading-normal sm:text-sm">
                  "Desde que uso Agendame, mi taller está más organizado. Los recordatorios han reducido las citas perdidas y mis ingresos han aumentado."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
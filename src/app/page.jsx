'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-800">Cargando...</div>;
  }

  return (
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
                  style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDi2Otm6H0YN5xbARm43EtvFBkA_qjdj-vy0WgMaDZqmH2B7c3Rzcw3lz28--2H9jSpJjKX3J-Wy7-1n5UpVYaW_YhVuMnLtdjNPzCkZIfJCIJDJ-Q12MGtUHpjizR4ubmT0DMccVcCJ1kdD-lqOfoa44pa2WGYYpNu_ind5yxtFSipqZuy0-wixgY8U84v5r_8wZYh7ct29dM5dLh6LwAFG_olKO4ZWUDo68l7Ov3LFjz6ObDpBm9EBEIyebTpsOwOg5alZxVvLqIs")`,}}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1
                      className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
                    >
                      Organiza tu Negocio con Agendame
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Gestión de citas fácil y profesional
                    </h2>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1988ff] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                  >
                    <span className="truncate">Regístrate Gratis</span>
                  </button>
                </div>
              </div>
            </div>
            <h2 className="text-[#0c141d] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Planes y Precios</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4">
              <div className="flex flex-1 flex-col gap-4 rounded-lg border border-solid border-[#cddbea] bg-slate-50 p-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#0c141d] text-base font-bold leading-tight">Plan Gratuito</h1>
                  <p className="flex items-baseline gap-1 text-[#0c141d]">
                    <span className="text-[#0c141d] text-4xl font-black leading-tight tracking-[-0.033em]">$0</span>
                    <span className="text-[#0c141d] text-base font-bold leading-tight">/mes</span>
                  </p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e6edf4] text-[#0c141d] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Seleccionar</span>
                </button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0c141d]">
                    <div className="text-[#0c141d]" data-icon="Check" data-size="20px" data-weight="regular">
                    </div>
                    Hasta 2 citas/mes
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0c141d]">
                    <div className="text-[#0c141d]" data-icon="Check" data-size="20px" data-weight="regular">
                    </div>
                    Gestión básica de citas
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-lg border border-solid border-[#cddbea] bg-slate-50 p-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[#0c141d] text-base font-bold leading-tight">Plan Premium</h1>
                    <p className="text-slate-50 text-xs font-medium leading-normal tracking-[0.015em] rounded-lg bg-[#1988ff] px-3 py-[3px] text-center">Recomendado</p>
                  </div>
                  <p className="flex items-baseline gap-1 text-[#0c141d]">
                    <span className="text-[#0c141d] text-4xl font-black leading-tight tracking-[-0.033em]">~3.180 CLP</span>
                    <span className="text-[#0c141d] text-base font-bold leading-tight">/mes</span>
                  </p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e6edf4] text-[#0c141d] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Seleccionar</span>
                </button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0c141d]">
                    <div className="text-[#0c141d]" data-icon="Check" data-size="20px" data-weight="regular">
                    </div>
                    Citas ilimitadas
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0c141d]">
                    <div className="text-[#0c141d]" data-icon="Check" data-size="20px" data-weight="regular">
                    </div>
                    Recordatorios por SMS
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0c141d]">
                    <div className="text-[#0c141d]" data-icon="Check" data-size="20px" data-weight="regular">
                    </div>
                    Integración con redes sociales
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0c141d]">
                    <div className="text-[#0c141d]" data-icon="Check" data-size="20px" data-weight="regular">
                    </div>
                    Soporte prioritario
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-[#0c141d] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Características Principales</h2>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-[#0c141d] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
                >
                  Simplifica tu Gestión de Citas
                </h1>
                <p className="text-[#0c141d] text-base font-normal leading-normal max-w-[720px]">
                  Agendame te ofrece herramientas intuitivas para organizar tu agenda y atender a tus clientes de manera eficiente.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#cddbea] bg-slate-50 p-4 flex-col">
                  <div className="text-[#0c141d]" data-icon="Calendar" data-size="24px" data-weight="regular">
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#0c141d] text-base font-bold leading-tight">Configuración Sencilla</h2>
                    <p className="text-[#4571a1] text-sm font-normal leading-normal">Crea tu horario en minutos y personaliza tus servicios.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#cddbea] bg-slate-50 p-4 flex-col">
                  <div className="text-[#0c141d]" data-icon="Users" data-size="24px" data-weight="regular">
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#0c141d] text-base font-bold leading-tight">Reservas de Clientes</h2>
                    <p className="text-[#4571a1] text-sm font-normal leading-normal">Permite que tus clientes reserven citas en línea, 24/7.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#cddbea] bg-slate-50 p-4 flex-col">
                  <div className="text-[#0c141d]" data-icon="Clock" data-size="24px" data-weight="regular">
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#0c141d] text-base font-bold leading-tight">Recordatorios Automáticos</h2>
                    <p className="text-[#4571a1] text-sm font-normal leading-normal">Reduce las ausencias con recordatorios por correo electrónico y SMS.</p>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-[#0c141d] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Testimonios</h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                      style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUuG5InNssbLiJv2BYKtWF-zdVaeQ8bx2wL4mLg5wYNI2yFMP6PueXO8h1WDg2ZMwx_wiJYbWKUrNmtXwfWEuSutzigtH-XbHpr9XnJuG_9H1G0KRbh2yuE1ZYvU0bQKl5aWqW_2EWbpX5vxDz5yO7Ki5j0PU_zj5whgPHxuG-PVwUA2ABCCRQyZJ6_1QYljWeThDu0Isa8MiKubzvHBCI7k63BQZcSRXY03XmLiZtMs3MfFmBegHliYGyRaxHQ2ARSs6eYZKbe8Rd")`}}
                  ></div>
                  <div>
                    <p className="text-[#0c141d] text-base font-medium leading-normal">Juan, Peluquero</p>
                    <p className="text-[#4571a1] text-sm font-normal leading-normal">
                      "Agendame ha transformado mi negocio. Mis clientes pueden reservar fácilmente y yo tengo más tiempo para concentrarme en mi trabajo."
                    </p>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                    style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3i7kSHlcfzHED-_nk1KXKvbu-9ZCkS8n0Acc63PG0hqnsTNh6ZzAefoe7mn4Dd9yZw3uWifjeqnI58xtUIZ7U_HfReh5iKa6-inEoNokx9nD7ye26ksYqBOjm1NaoGB3S34XAJTb00AF4wIG1VcdXHa_unoadM9MP_S1SbfSOhdY3gmd1UDolHQnweKIWMIK9-U1z1qvz_5ISPEJug1l4eUQP31UtX69e6izo2TMfxyVasdQ-zBapa_xIh30q5WYLLGmsE3gbNiNU")`}}
                  ></div>
                  <div>
                    <p className="text-[#0c141d] text-base font-medium leading-normal">Sofia, Instructora de Yoga</p>
                    <p className="text-[#4571a1] text-sm font-normal leading-normal">
                      "La flexibilidad de Agendame me permite gestionar mis clases y citas privadas sin complicaciones. Mis alumnos adoran la facilidad de reserva."
                    </p>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                    style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKAqFFgf6YibVZ0YjeQJ4IDZvum2aeOZ-vbwkRmMWpCXmiEsNvkxBc3yqmkkkY10pm8kajt0QSNVezSItyju6oiXpV_oBk1Eulvw851Gd1wUxqX7hAT-ld_ZyiR8hBJpg2lUKWe3RzasP-mIudQByPYsKCeTmtXuXBlPiQYZuzaSR-EKOnwMJqXjqHUujRZRgGN_b9eJVmCMXP-zrZ9CYq7WVTJH0CPhjIG69Wf0o-0RNNVARSe3YR9a7QetAsc2xvVQP6X-JmQzdG")`}}
                  ></div>
                  <div>
                    <p className="text-[#0c141d] text-base font-medium leading-normal">Carlos, Mecánico</p>
                    <p className="text-[#4571a1] text-sm font-normal leading-normal">
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
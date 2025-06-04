import Link from 'next/link';
import { Inter, Noto_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function FooterLogin() {
  return (
    <footer
      className={`flex justify-center text-gray-500 py-8 sm:py-10 ${inter.className} ${notoSans.className}`}
    >
      <div className="flex flex-col gap-4 text-center px-4 sm:px-6 max-w-[960px] w-full">
        <p className="text-sm sm:text-base font-normal">
          © {new Date().getFullYear()} Agendame. Todos los derechos reservados. |{' '}
          <Link href="/privacy" className="text-blue-400 underline hover:text-blue-300">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </footer>
  );
}
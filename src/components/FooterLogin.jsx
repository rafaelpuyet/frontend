import Link from 'next/link';
import { Inter, Noto_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function FooterLogin() {
  return (
    <footer
      className={`flex justify-center text-gray-500 py-6 px-2 sm:px-4 sm:py-8 lg:px-6 lg:py-10 ${inter.className} ${notoSans.className}`}
    >
      <div className="flex flex-col gap-3 text-center max-w-[960px] w-full">
        <p className="text-sm font-normal sm:text-base">
          © {new Date().getFullYear()} Agendame. Todos los derechos reservados. |{' '}
          <Link
            href="/privacy"
            className="text-blue-400 underline hover:text-blue-300 inline-block px-2 py-1"
          >
            Política de Privacidad
          </Link>
        </p>
      </div>
    </footer>
  );
}
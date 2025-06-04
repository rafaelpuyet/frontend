import { Inter, Noto_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function HeaderLogin() {
  return (
    <header
      className={`flex items-center justify-between whitespace-nowrap border-b border-gray-200 bg-white px-2 py-2 sm:px-4 md:px-6 lg:px-10 text-gray-900 ${inter.className} ${notoSans.className}`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <i className="fas fa-calendar-alt text-gray-900 text-base sm:text-lg md:text-xl"></i>
        <h2 className="text-base font-bold leading-tight tracking-tight sm:text-lg md:text-xl">Agendame</h2>
      </div>
    </header>
  );
}
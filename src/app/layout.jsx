import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Inter, Noto_Sans } from 'next/font/google';
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export const metadata = {
  title: 'Agendame | Gestión de Citas para Negocios en Chile',
  description: 'Organiza tu negocio con Agendame, la plataforma de gestión de citas fácil y profesional.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${notoSans.className} bg-gray-100`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
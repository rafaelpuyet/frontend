import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ subsets: ['latin'], weights: [400, 500, 700, 900] });

export const metadata = {
  title: 'Agendame | Gestión de Citas para Negocios en Chile',
  description: 'Organiza tu negocio con Agendame, la plataforma de gestión de citas fácil y profesional.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100`}>
        <AuthProvider>
        <Header />
          <main className="min-h-screen">{children}</main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
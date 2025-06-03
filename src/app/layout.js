import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

export const metadata = {
  title: 'Agenda App',
  description: 'Business agenda management platform for Chile',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <AuthProvider>
          <ErrorBoundary>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  );
}
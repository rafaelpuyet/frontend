import HeaderLogin from '../../components/HeaderLogin';

export const metadata = {
  title: 'Iniciar Sesión | Agendame',
  description: 'Inicia sesión en Agendame para gestionar tus citas de manera fácil y profesional.',
};

export default function AuthLayout({ children }) {
  return (
    <>
      <HeaderLogin />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
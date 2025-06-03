import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-center text-white py-8 sm:py-10">
      <div className="container mx-auto flex flex-col gap-4 text-center px-4 sm:gap-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link href="/about" className="text-[#4571a1] text-sm font-normal hover:underline sm:text-base">
            Acerca de
          </Link>
          <Link href="/contact" className="text-[#4571a1] text-sm font-normal hover:underline sm:text-base">
            Contacto
          </Link>
          <Link href="/privacy" className="text-[#4571a1] text-sm font-normal hover:underline sm:text-base">
            Política de Privacidad
          </Link>
        </div>
        <div className="flex justify-center gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-[#4571a1] text-lg sm:text-xl"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f text-[#4571a1] text-lg sm:text-xl"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram text-[#4571a1] text-lg sm:text-xl"></i>
          </a>
        </div>
        <p className="text-[#4571a1] text-base">
          © {new Date().getFullYear()} Agendame. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
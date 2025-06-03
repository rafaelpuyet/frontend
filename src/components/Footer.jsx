import Link from 'next/link';

export default function Footer() {
  return (
    <footer class="flex justify-center">
      <div class="flex max-w-[960px] flex-1 flex-col">
        <footer class="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a class="text-[#4571a1] text-base font-normal leading-normal min-w-40" href="#">Acerca de</a>
            <a class="text-[#4571a1] text-base font-normal leading-normal min-w-40" href="#">Contacto</a>
            <a class="text-[#4571a1] text-base font-normal leading-normal min-w-40" href="#">Política de Privacidad</a>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#">
              <div class="text-[#4571a1]" data-icon="TwitterLogo" data-size="24px" data-weight="regular">
                <i className="fab fa-twitter text-xl"></i>
              </div>
            </a>
            <a href="#">
              <div class="text-[#4571a1]" data-icon="FacebookLogo" data-size="24px" data-weight="regular">
                <i className="fab fa-facebook-f text-xl"></i>
              </div>
            </a>
            <a href="#">
              <div class="text-[#4571a1]" data-icon="InstagramLogo" data-size="24px" data-weight="regular">
                <i className="fab fa-instagram text-xl"></i>
              </div>
            </a>
          </div>
          <p class="text-[#4571a1] text-base font-normal leading-normal">© 2024 Agendame. Todos los derechos reservados.</p>
        </footer>
      </div>
    </footer>
  );
}
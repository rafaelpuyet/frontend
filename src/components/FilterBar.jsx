import { useState } from 'react';

export default function FilterBar({ filters, setFilters }) {
  const branches = ['Todas', 'Sucursal casa matriz', 'Sucursal Providencia', 'Sucursal Las Condes'];
  const professionals = ['Todos', 'Matias Garcia', 'Sofia Reyes', 'Andrea Fuenzalida', 'Catalina Fuentes', 'Gabriel Ortiz'];
  const statuses = ['Todos', 'Confirmado', 'Pendiente', 'Cancelado', 'No asistió'];
  const reservationTypes = ['Todas', 'Primera', 'Control', 'Grupal'];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
  <aside class="w-80 bg-white p-6 border-r border-gray-200 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
      <img alt="Logo de la clínica" class="h-8"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUcpFjg0lkRM3zshHtmKv00LDZMLCwOoHXRywFk4n284ESlCMNKOUHvTLhPbpkNXtPP4iF2xk8XHXDxjSxGa68EiM3XooXOO0mXAkASdOhPBKT_YEku-GoDTgepJpxCB2yHTUOgWuwCGL8HKHGaBj5WAgXXMUNwNIpAeGPH9oGQWib7cgAyqk3HenLrvkGLPM8PDs0aEnH2nU24md7y0gOrAj328GcQtZqr15TQGVSBFD9_xf5GrD9HkmbXou2BNuoMFtvVBIzBto" />
      <button class="text-gray-500 hover:text-gray-700 cursor-pointer">
        <i class="fa-solid fa-bars text-xl"></i>
      </button>
    </div>
    <h2 class="text-sm font-medium text-gray-500 mb-2">Selecciona la sucursal</h2>
    <div class="relative mb-6">
      <select
        class="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8">
        <option selected="">Sucursal casa matriz</option>
        <option>Sucursal Providencia</option>
        <option>Sucursal Las Condes</option>
      </select>
      <span
        class="material-icons absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
    </div>
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Agendas</h2>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="profesional_filter">Profesional</label>
        <div class="relative">
          <select
            class="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8"
            id="profesional_filter">
            <option selected="">Todos</option>
            <option>Matias Garcia</option>
            <option>Sofia Reyes</option>
          </select>
          <span
            class="material-icons absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
        </div>
      </div>
      <div class="flex items-center space-x-1">
        <img alt="Avatar profesional 1" class="w-8 h-8 rounded-full"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvI7H3It-cg0H2bniW5woUS04n92XrPRJWrGK6FmYzLb0bHOdRo_XehJlvu1x7c58J6nkBNTK3ZaPHnpG5ICwYzCxCdBconjzQW8roWQQT4IiB9um4RiruCfNv408jdwGWkRMqI-SGDfw5YDWRzu1hfpwfnB24kpxTow3NtURXaesRpxUtA8g1HWRA_6gjCpYAtn0SO-iZv5dcS35Lg0XJ5p6wnJ4ZP-NUhMyy5CT4Bs6_q9FvRpfAeWQBMfw1HrNtzQ7r73pwXCA" />
        <img alt="Avatar profesional 2" class="w-8 h-8 rounded-full"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhCZOm_T5XEGEcHAfLt-2_Mxr10db8ujsH0F7xVM5qiLbgdjf2zYo7C-b_C8tlyt7DQzM23hiXwFVqHzvoZ0n9c6jsoFl6Bh-PyOFA198td0rOOPvMF01qrF5hZM2f1FVg_chyAkVZ89gusV6Q973ZMztKagehdk_64DaclItWYNW_T-OmvHEt8evcWPC7qV2QOGwjwLTimklNqzg9NuzxUyxCx_Bzzz-rnrAUPPUrwaXvLEM9YuDc3FKsrC1zSFmiovjZy2RSiIM" />
        <img alt="Avatar profesional 3" class="w-8 h-8 rounded-full"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcfVCKlSsc6Slg08bEhPdEnBWS2HDShb399vmfnk8RO1tZ8TDrajzt5A9UZDveR-kbUo1nmg8EqyVE6T1dhaW5HgKk4x-wpXtKvl0aM3RUxz9ErrYKlerRcP9RYeCoMKHsJEbznVkEqYvRYROINafzj9jpj2qWeAYsbZ0XMpGalC4pUo2ePEo-QhaPnaQujYklu8XLth7VFErMhCtAYsMFVXLm5VcmJVOOKNIlSGsEWtdHtmuLnRKIqGeM9-W1KD6S8qr65Wewf9Y" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="estado_reserva_filter">Estado de la
          reserva</label>
        <div class="relative">
          <select
            class="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8"
            id="estado_reserva_filter">
            <option selected="">Todos</option>
            <option>Confirmado</option>
            <option>Pendiente</option>
            <option>Cancelado</option>
            <option>No asistió</option>
          </select>
          <span
            class="material-icons absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="tipo_cita_filter">Reservas activas</label>
        <div class="relative">
          <select
            class="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8"
            id="tipo_cita_filter">
            <option selected="">Todas</option>
            <option>Primera</option>
            <option>Control</option>
            <option>Grupal</option>
          </select>
          <span
            class="material-icons absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
        </div>
      </div>
      <div class="relative">
        <span class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
        <input
          class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5"
          placeholder="Búsqueda rápida de hora" type="text" />
      </div>
    </div>
    <div class="mt-8">
      <div class="flex justify-center mb-2">
        <div class="flex space-x-1">
          <button class="text-gray-500 hover:text-gray-700 align-middle p-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
           <div class="flex">
            <span class="text-sm font-semibold text-gray-800 align-middle py-2">Mayo 2024</span>
            </div>
          <button class="text-gray-500 hover:text-gray-700 align-middle p-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center text-xs text-gray-600">
        <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
        <span class="text-gray-400">26</span><span class="text-gray-400">27</span><span
          class="text-gray-400">28</span><span class="text-gray-400">29</span><span
          class="text-gray-400">30</span><span>1</span><span>2</span>
        <span>3</span><span>4</span><span>5</span><span
          class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto">6</span><span>7</span><span>8</span><span>9</span>
        <span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
        <span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span>
        <span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span>
        <span>31</span><span class="text-gray-400">1</span><span class="text-gray-400">2</span><span
          class="text-gray-400">3</span><span class="text-gray-400">4</span><span class="text-gray-400">5</span><span
          class="text-gray-400">6</span>
      </div>
    </div>
  </aside>
  );
}
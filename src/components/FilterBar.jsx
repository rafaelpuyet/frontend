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
    <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-white p-4 sm:flex-row sm:gap-4 sm:p-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 sm:text-base">Sucursal</label>
        <div className="relative">
          <select
            value={filters.branch}
            onChange={(e) => handleFilterChange('branch', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none sm:text-base"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch.toLowerCase()}>
                {branch}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm"></i>
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 sm:text-base">Profesional</label>
        <div className="relative">
          <select
            value={filters.professional}
            onChange={(e) => handleFilterChange('professional', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none sm:text-base"
          >
            {professionals.map((prof) => (
              <option key={prof} value={prof.toLowerCase()}>
                {prof}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm"></i>
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 sm:text-base">Estado</label>
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none sm:text-base"
          >
            {statuses.map((status) => (
              <option key={status} value={status.toLowerCase()}>
                {status}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm"></i>
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 sm:text-base">Tipo</label>
        <div className="relative">
          <select
            value={filters.reservationType}
            onChange={(e) => handleFilterChange('reservationType', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none sm:text-base"
          >
            {reservationTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm"></i>
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 sm:text-base">Buscar</label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Buscar reservas..."
            className="w-full rounded-md border-gray-300 bg-white px-10 py-3 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none sm:text-base"
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm"></i>
        </div>
      </div>
    </div>
  );
}
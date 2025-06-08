'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

// Íconos SVG del HTML
const DashboardIcon = () => (
  <svg
    className="lucide lucide-layout-dashboard"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="9" rx="1" width="7" x="3" y="3"></rect>
    <rect height="5" rx="1" width="7" x="14" y="3"></rect>
    <rect height="9" rx="1" width="7" x="14" y="12"></rect>
    <rect height="5" rx="1" width="7" x="3" y="16"></rect>
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="lucide lucide-calendar-days"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
    <path d="M8 14h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 18h.01"></path>
    <path d="M12 18h.01"></path>
    <path d="M16 18h.01"></path>
  </svg>
);

const CustomersIcon = () => (
  <svg
    className="lucide lucide-users"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ServicesIcon = () => (
  <svg
    className="lucide lucide-briefcase-business"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 12h.01"></path>
    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
    <path d="M22 13a18.15 18.15 0 0 1-20 0"></path>
    <rect height="14" rx="2" width="20" x="2" y="6"></rect>
  </svg>
);

const TeamIcon = () => (
  <svg
    className="lucide lucide-users-round"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 21a8 8 0 0 0-16 0"></path>
    <circle cx="10" cy="8" r="5"></circle>
    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-10 0c-2 1.5-4 4.63-4 8"></path>
  </svg>
);

const ReportsIcon = () => (
  <svg
    className="lucide lucide-line-chart"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 3v18h18"></path>
    <path d="m19 9-5 5-4-4-3 3"></path>
  </svg>
);

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { href: '/dashboard/calendar', label: 'Calendar', icon: CalendarIcon },
    { href: '/dashboard/customers', label: 'Customers', icon: CustomersIcon },
    { href: '/dashboard/services', label: 'Services', icon: ServicesIcon },
    { href: '/dashboard/team', label: 'Team', icon: TeamIcon },
    { href: '/dashboard/reports', label: 'Reports', icon: ReportsIcon },
  ];

  return (
    <>
      {/* Botón hamburguesa para móviles */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64`}
      >
        {/* Logo y Nombre */}
        <div className="flex items-center gap-3 text-slate-900 px-6 py-4 border-b border-gray-200">
          <div className="size-8 text-[#1677FF]">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6_319)">
                <path
                  d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 0 0 41 48 48 1 48 48 Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <rect fill="white" height="48" width="48"></rect>
              </defs>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-600 sm:text-lg">
            Acme Co
          </h2>
        </div>

        {/* Navegando */}
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                pathname === href
                  ? 'bg-blue-100 text-[#1677FF]'
                  : 'text-slate-700 hover:bg-gray-50 hover:text-[#1677FF]'
              }`}
              onClick={() => setIsOpen(false)} // Cierra el sidebar en móviles al navegar
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
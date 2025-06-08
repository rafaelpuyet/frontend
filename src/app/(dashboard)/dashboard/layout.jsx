'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const DashboardLayout = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { path: '/dashboard', label: 'Resumen' },
        { path: '/dashboard/profile', label: 'Perfil' },
        { path: '/dashboard/branches', label: 'Sucursales' },
        { path: '/dashboard/workers', label: 'Trabajadores' },
        { path: '/dashboard/schedules', label: 'Horarios' },
        { path: '/dashboard/exceptions', label: 'Excepciones' },
        { path: '/dashboard/appointments', label: 'Citas' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        router.push('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside class="flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm fixed top-0 left-0 h-full z-10">
                <div class="flex items-center gap-3 text-slate-900 px-6 py-4 border-b border-gray-200">
                    <div class="size-8 text-[#1677FF]">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_6_319)">
                                <path
                                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                                    fill="currentColor"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_6_319">
                                    <rect fill="white" height="48" width="48"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <h2 class="text-xl font-semibold leading-tight tracking-[-0.015em] text-slate-900">Acme Co</h2>
                </div>
                <nav class="flex flex-col gap-2 p-4">
                    <a class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 hover:text-[#1677FF] rounded-md"
                        href="#">
                        <svg class="lucide lucide-layout-dashboard" fill="none" height="20" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect height="9" rx="1" width="7" x="3" y="3"></rect>
                            <rect height="5" rx="1" width="7" x="14" y="3"></rect>
                            <rect height="9" rx="1" width="7" x="14" y="12"></rect>
                            <rect height="5" rx="1" width="7" x="3" y="16"></rect>
                        </svg>
                        Dashboard
                    </a>
                    <a class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 hover:text-[#1677FF] rounded-md"
                        href="#">
                        <svg class="lucide lucide-calendar-days" fill="none" height="20" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
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
                        Calendar
                    </a>
                    <a class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 hover:text-[#1677FF] rounded-md"
                        href="#">
                        <svg class="lucide lucide-users" fill="none" height="20" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Customers
                    </a>
                    <a class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 hover:text-[#1677FF] rounded-md"
                        href="#">
                        <svg class="lucide lucide-briefcase-business" fill="none" height="20" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12h.01"></path>
                            <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                            <path d="M22 13a18.15 18.15 0 0 1-20 0"></path>
                            <rect height="14" rx="2" width="20" x="2" y="6"></rect>
                        </svg>
                        Services
                    </a>
                    <a class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 hover:text-[#1677FF] rounded-md"
                        href="#">
                        <svg class="lucide lucide-users-round" fill="none" height="20" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 21a8 8 0 0 0-16 0"></path>
                            <circle cx="10" cy="8" r="5"></circle>
                            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-10 0c-2 1.5-4 4.63-4 8"></path>
                        </svg>
                        Team
                    </a>
                    <a class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 hover:text-[#1677FF] rounded-md"
                        href="#">
                        <svg class="lucide lucide-line-chart" fill="none" height="20" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Reports
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div class="flex flex-col flex-1 ml-64">
            <header
                class="flex items-center justify-end whitespace-nowrap border-b border-solid border-gray-200 bg-white px-6 py-4 shadow-sm h-[73px]">
                <div class="flex items-center gap-4">
                    <button
                        class="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 bg-gray-100 text-slate-700 hover:bg-gray-200 transition-colors duration-150">
                        <div class="text-slate-700" data-icon="Bell" data-size="24px" data-weight="regular">
                            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z">
                                </path>
                            </svg>
                        </div>
                    </button>
                    <img
                        class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-300 shadow-sm"
                        src='https://lh3.googleusercontent.com/aida-public/AB6AXuDzeLuJJy0Li0M2RpO1ra48vngnrTKmkNFndHt_vJvGGUqmp5-rpdSG6BNeO3Yrd7Xk6nUcNGkvanXIkFMpQ5WNdbxbdJBrVvgLsOBO30jB_HdoFI9E3BkTl1-Is6jI2h6uWnuAPjN7EjsUvnkAASCp8ZM17OhYLpf3X6aVPRDcUM-6Bl0bqO-F4-NDC-shKluwy-lm8D_twTq26JKOn-6CO2QvUVWhtUFKWOnqjIsfqGiaL4sMToBUcRBVhgfjrMhdBi8MFhR15LL1'>
                    </img>
                </div>
            </header>
            <div className="flex-1 md:ml-64 p-4">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
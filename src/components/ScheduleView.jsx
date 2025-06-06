'use client';

import { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { es } from 'date-fns/locale/es';
import ReservationModal from './ReservationModal';

export default function ScheduleView({ selectedDate, appointments }) {
    const [currentDate, setCurrentDate] = useState(selectedDate);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const professionals = [
        { id: '1', name: 'Matias Garcia', title: 'Psicólogo' },
        { id: '2', name: 'Sofia Reyes', title: 'Terapeuta Ocupacional' },
        { id: '3', name: 'Andrea Fuenzalida', title: 'Psiquiatra' },
        { id: '4', name: 'Catalina Fuentes', title: 'Psicóloga Infantil' },
        { id: '5', name: 'Gabriel Ortiz', title: 'Kinesiólogo' },
    ];
    const timeSlots = Array.from({ length: 14 }, (_, i) => 8 + i); // 8:00 to 21:00

    const nextDay = () => setCurrentDate(addDays(currentDate, 1));
    const prevDay = () => setCurrentDate(subDays(currentDate, 1));
    const goToToday = () => setCurrentDate(new Date());

    const getAppointmentsForProfessional = (professionalId) => {
        return appointments.filter((appt) => appt.professional === professionals.find((p) => p.id === professionalId)?.name);
    };

    return (
        <main class="flex-1 flex flex-col">
            <header class="bg-white p-4 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <button class="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 p-2 align-middle cursor-pointer">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button
                        class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-medium px-3 py-1.5 rounded-md cursor-pointer">Hoy</button>
                    <button class="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 p-2 align-middle cursor-pointer">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <h1 class="text-xl font-semibold text-gray-800">Jueves, 06 de mayo de 2024</h1>
                </div>
                <div class="flex items-center space-x-3">
                    <button class="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100  p-2 cursor-pointer">
                        <i class="fa-solid fa-calendar-days text-xl"></i>
                    </button>
                    <button
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2 text-sm cursor-pointer">
                        <i class="fa-solid fa-plus"></i>
                        <span>Nuevo</span>
                    </button>
                </div>
            </header>
            <div class="flex-1 overflow-x-auto bg-white">
                <div class="calendar-grid min-w-max">
                    <div class="sticky top-0 bg-white z-10 p-2 border-b border-gray-200">
                    </div>
                    <div class="sticky top-0 bg-white z-10 p-3 border-b border-gray-200 text-center">
                        <img alt="Matias Garcia" class="w-10 h-10 rounded-full mx-auto mb-1"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdTmiIChqV7K5c_uL4fd19VPFExyPfKZjhR8lFim7VO3FGv906DJ4G18Z8Or3TTNuj2QaXQ0tWHpAVn1gCqAXTDlsYhqHRRh7jP-qs2IhLlTbnWitSwouv-SDwuJcLxlVQFvJMex0EkIMqT6eagLTr7kTwAoDhOdf9ZOECZI9rRYLeK4mOobhMCOYWc1EuOykdUQsPZm_a3V0m2SIQd2lR4VNLcyhpBNyPJ8RIcyrHFt5pQ_Rr8bfO0_HGvK-j67ZBlwxOuNXaQjE" />
                        <p class="text-sm font-medium text-gray-800">Matias Garcia</p>
                        <p class="text-xs text-gray-500">Psicólogo</p>
                    </div>
                    <div class="sticky top-0 bg-white z-10 p-3 border-b border-gray-200 text-center">
                        <img alt="Sofia Reyes" class="w-10 h-10 rounded-full mx-auto mb-1"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtZuO-XUiLFd-IlnYSv0DIFsyxYxE58bKu-mjxuzgo9QDEx2AXjGBaeTmbv5m-Gvdyqj0UZZUTS2nqhSqMAMHAfu56xnsGD52JIfTZGDqaXzIXnb4-66fba9YD6h5KTIpfGhveVuMCkA2SFSHOAHSTxwv6euW8C4XuaPm5QPzMkZonYRYCzSjwZyurF0J23tnYse-XTmCllgiSj17tEkTK4siHctiXbhMAisXZLyXyoeUUd9_cK929Jj96apzqyr8txyx22YdPK7w" />
                        <p class="text-sm font-medium text-gray-800">Sofia Reyes</p>
                        <p class="text-xs text-gray-500">Terapeuta Ocupacional</p>
                    </div>
                    <div class="sticky top-0 bg-white z-10 p-3 border-b border-gray-200 text-center">
                        <img alt="Andrea Fuenzalida" class="w-10 h-10 rounded-full mx-auto mb-1"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNbbPG7m2eSZXHzB279G_uSuMQ__k9EfjcM8h5fQ-zBI-KnQZotO6Wyuenw_dgZVyNpG8BkyYyex-K9kY9ZkDXT-rin-5mXSrnxGTJqOhye2lXHSqbdE9hFO7ZafMhrLrdh7sasw0qKa2M_jqDPoAWMwZTwqSM4RXjsPKRZS7rHYIuWZ_3FI7jlFonKf-PXT9eOZ_x_7wm6-l99a2N7ov2iAJgmgm1iG7Lhxci16wo_NoEToXBXlNZpOADc8LkNlKA_eNKMa0Jq0g" />
                        <p class="text-sm font-medium text-gray-800">Andrea Fuenzalida</p>
                        <p class="text-xs text-gray-500">Psiquiatra</p>
                    </div>
                    <div class="sticky top-0 bg-white z-10 p-3 border-b border-gray-200 text-center">
                        <img alt="Catalina Fuentes" class="w-10 h-10 rounded-full mx-auto mb-1"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdM0p4XuIubAv4J-q_tOklKSPqAczm8p4BWOwXZHKQO8Z6PxwYjP6C2SxVr3bUgl6p8H8NIAoPZVUvT7iNSadZi0o0_d3QAJAVntp6AGTf4Yjj5jow0YzT07C4NmACdkJ7gwsHyYHyGi8yq8Y5hai5Pv24oVLtuhDbPBVY0XP8SrCm5SELxF0DFrzI0Ye2PPQhWfEzcCzpjuSPCMa3YMBLcvX0mbOs87xvdBY0oudijTEi_51qO3_z04r7Jhr10wb0usl0fizmTRA" />
                        <p class="text-sm font-medium text-gray-800">Catalina Fuentes</p>
                        <p class="text-xs text-gray-500">Psicóloga Infantil</p>
                    </div>
                    <div class="sticky top-0 bg-white z-10 p-3 border-b border-gray-200 text-center">
                        <img alt="Gabriel Ortiz" class="w-10 h-10 rounded-full mx-auto mb-1"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFtWvY1_a0EIProGT9jxFlsveAKV00ZufW0-lNaf-sdNrlBVLt8jABpQkVXrLDuZzpQDFvyKQAxbQtlM1s4Bv07Q0-LWV7kmwZ_33lUA-7687osRueGUT7Rs0QVOZrf9C9NBcxG6LlYYStkzP_OROngVG5YI4CJVBdh2aqcmmuIJPNGJxPM5nT_b6DuH9RkBEvFgSQfHuTUbSKeFX4k4laZq-vUBU39wF9svK_ob-7Lr9Ug0692LMQe4V4dMzzqRH24OXjJOjI6vg" />
                        <p class="text-sm font-medium text-gray-800">Gabriel Ortiz</p>
                        <p class="text-xs text-gray-500">Kinesiólogo</p>
                    </div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">8:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1"></div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">9:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-green-100 rounded-md">
                        <div class="bg-green-500 text-white text-xs p-1 rounded-t-md">Patricia Fuenzalida</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Tratamiento primera cita</p>
                            <p class="text-gray-600">9:00 - 11:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-green-100 rounded-md">
                        <div class="bg-green-500 text-white text-xs p-1 rounded-t-md">Macarena Rial</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Primera cita</p>
                            <p class="text-gray-600">9:00 - 10:00</p>
                        </div>
                    </div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">10:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-blue-100 rounded-md">
                        <div class="bg-blue-500 text-white text-xs p-1 rounded-t-md">Bárbara Troncoso</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Sesión grupal número 3</p>
                            <p class="text-gray-600">10:00 - 12:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-green-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-pink-100 rounded-md">
                        <div class="bg-pink-500 text-white text-xs p-1 rounded-t-md">Laila Serrano</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Segunda cita</p>
                            <p class="text-gray-600">10:00 - 11:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-gray-200 p-1"></div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">11:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-blue-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-yellow-100 rounded-md relative">
                        <div class="bg-yellow-500 text-white text-xs p-1 rounded-t-md">Antonia Cardona</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Clase personalizada</p>
                            <p class="text-gray-600">11:00 - 13:00</p>
                        </div>
                        <div class="absolute z-20 left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl p-4 border border-gray-200"
                            id="appointmentModal">
                            <div class="flex justify-between items-center mb-3">
                                <h3 class="text-base font-semibold text-gray-800">Antonia Cardona</h3>
                                <div class="flex space-x-2">
                                    <button class="text-gray-500 hover:text-gray-700"><span
                                        class="material-icons text-lg">edit</span></button>
                                    <button class="text-gray-500 hover:text-gray-700"><span
                                        class="material-icons text-lg">delete</span></button>
                                    <button class="text-gray-500 hover:text-gray-700"><span
                                        class="material-icons text-lg">close</span></button>
                                </div>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">Clase personalizada</p>
                            <p class="text-xs text-gray-500 mb-3">Jueves 06 de mayo - 11:00 a 13:00 hrs</p>
                            <p class="text-xs text-gray-500 mb-3">Se atenderá con: Sofia Reyes</p>
                            <div class="flex items-center space-x-2 text-sm text-gray-700 mb-2">
                                <span class="material-icons text-base text-gray-500">phone</span>
                                <span>+569 1234 567</span>
                                <button class="text-green-500 hover:text-green-600 text-xs font-medium flex items-center">
                                    <span class="material-icons text-sm mr-1">chat_bubble_outline</span> Hablar por WhatsApp
                                </button>
                            </div>
                            <div class="flex items-center space-x-2 text-sm text-gray-700 mb-3">
                                <span class="material-icons text-base text-gray-500">email</span>
                                <span>antocardona@gmail.com</span>
                            </div>
                            <p class="text-xs text-gray-500 mb-1">Comentario interno</p>
                            <p class="text-sm text-gray-700 mb-3 bg-gray-50 p-2 rounded-md">Ana prefiere estacionar en el -1</p>
                            <div class="flex items-center justify-between text-sm mb-3">
                                <div class="flex items-center space-x-1">
                                    <span class="material-icons text-blue-500 text-base">bookmark</span>
                                    <span class="text-blue-500 font-medium">Reservado</span>
                                </div>
                                <div class="flex space-x-1">
                                    <span class="w-3 h-3 bg-green-400 rounded-full"></span>
                                    <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
                                    <span class="w-3 h-3 bg-pink-400 rounded-full"></span>
                                    <span class="w-3 h-3 bg-red-400 rounded-full"></span>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <button class="text-red-600 hover:text-red-700 font-medium text-sm">$ Pagar</button>
                                <button
                                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1.5 rounded-md text-sm flex items-center">
                                    Ir a la ficha <span class="material-icons text-sm ml-1">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-blue-100 rounded-md">
                        <div class="bg-blue-500 text-white text-xs p-1 rounded-t-md">Eloi Zurita</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Tratamiento segunda cita</p>
                            <p class="text-gray-600">11:00 - 13:00</p>
                        </div>
                    </div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">12:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-blue-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-yellow-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-blue-100"></div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">13:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-yellow-100 rounded-md">
                        <div class="bg-yellow-500 text-white text-xs p-1 rounded-t-md">Gustavo Florez</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Tercera cita</p>
                            <p class="text-gray-600">13:00 - 15:00</p>
                        </div>
                    </div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">14:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-green-100 rounded-md">
                        <div class="bg-green-500 text-white text-xs p-1 rounded-t-md">Jose Molero</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Primera cita</p>
                            <p class="text-gray-600">14:00 - 16:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-yellow-100"></div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">15:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-green-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-blue-100 rounded-md">
                        <div class="bg-blue-500 text-white text-xs p-1 rounded-t-md">Felix Nieto</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Sesión individual</p>
                            <p class="text-gray-600">15:00 - 17:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1"></div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">16:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-blue-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-pink-100 rounded-md">
                        <div class="bg-pink-500 text-white text-xs p-1 rounded-t-md">Alberto Sanchis</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Sesión individual</p>
                            <p class="text-gray-600">16:00 - 18:00</p>
                        </div>
                    </div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">17:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-pink-100 rounded-md">
                        <div class="bg-pink-500 text-white text-xs p-1 rounded-t-md">Ricardo Quevedo</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Tratamiento segunda cita</p>
                            <p class="text-gray-600">17:00 - 19:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-blue-100 rounded-md">
                        <div class="bg-blue-500 text-white text-xs p-1 rounded-t-md">Consulta personalizada</div>
                        <div class="p-1 text-xs">
                            <p class="text-gray-600">18:00 - 20:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-pink-100"></div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">18:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-pink-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-blue-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1"></div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">19:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-yellow-100 rounded-md">
                        <div class="bg-yellow-500 text-white text-xs p-1 rounded-t-md">Ferran Santana</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Clase</p>
                            <p class="text-gray-600">19:00 - 20:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-green-100 rounded-md">
                        <div class="bg-green-500 text-white text-xs p-1 rounded-t-md">Maria Eva Casal</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Segunda cita</p>
                            <p class="text-gray-600">19:00 - 21:00</p>
                        </div>
                    </div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-blue-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-blue-100 rounded-md">
                        <div class="bg-blue-500 text-white text-xs p-1 rounded-t-md">Xabier Marques</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Segunda cita</p>
                            <p class="text-gray-600">19:00 - 21:00</p>
                        </div>
                    </div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">20:00</div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1 bg-green-100"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot border-b border-gray-200 p-1 bg-blue-100"></div>
                    <div class="time-slot-30 text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">21:00</div>
                    <div class="time-slot-30 border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot-30 border-b border-r border-gray-200 p-1 bg-green-100"></div>
                    <div class="time-slot-30 border-b border-r border-gray-200 p-1"></div>
                    <div class="time-slot-30 border-b border-r border-gray-200 p-1 bg-pink-100 rounded-b-md">
                        <div class="bg-pink-500 text-white text-xs p-1 rounded-t-md">Camila Rodriguez</div>
                        <div class="p-1 text-xs">
                            <p class="font-medium">Primera cita</p>
                            <p class="text-gray-600">21:00 - 21:30</p>
                        </div>
                    </div>
                    <div class="time-slot-30 border-b border-gray-200 p-1 bg-blue-100"></div>
                    <div class="time-slot text-xs text-gray-500 p-2 border-b border-r border-gray-200 text-right">22:00</div>
                </div>
            </div>
        </main>
    );
}
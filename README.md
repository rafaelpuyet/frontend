Documentación del Frontend - Plataforma de Gestión de Agendas (Versión 3)
Esta documentación describe la arquitectura, tecnologías, estructura, y funcionalidades del frontend de la plataforma de gestión de agendas para emprendedores y negocios en Chile. El frontend es una Single Page Application (SPA) construida con React, Tailwind CSS, y Vite, diseñada para ser responsiva, minimalista, y optimizada para interactuar con el backend descrito en la documentación correspondiente (https://github.com/rafaelpuyet/backend). Cumple con las restricciones de usar tecnologías gratuitas, útiles, y que faciliten el desarrollo.
Objetivos del Frontend

Interfaz Pública:
Permitir a los clientes acceder a miagenda.com/<username> para ver información del negocio/emprendedor, disponibilidad de citas, y reservar citas.
Mostrar sucursales automáticamente (selección única si solo hay una) y horarios disponibles.


Interfaz Autenticada:
Proporcionar a los usuarios (emprendedores o negocios) una interfaz para gestionar su perfil, sucursales, trabajadores, horarios, excepciones, y citas.
Sincronizar datos con el backend mediante endpoints autenticados.


Usabilidad:
Diseño minimalista y responsivo para desktops y móviles.
Manejo de zonas horarias para mostrar horarios correctos según Business.timezone.
Validaciones en el frontend para minimizar errores en las solicitudes al backend.


Restricciones:
Usar tecnologías gratuitas: React, Tailwind CSS, Vite, Axios.
No usar <form> con onSubmit (debido a restricciones de sandbox).
Evitar arquitecturas innecesariamente complejas.



Tecnologías Utilizadas

React (18.x): Biblioteca para construir interfaces dinámicas y componentes reutilizables. Usada con JSX para una sintaxis clara.
Tailwind CSS (3.x): Framework de estilización CSS para diseños responsivos y rápidos.
Vite (5.x): Herramienta de construcción rápida para desarrollo y producción.
Axios: Para realizar solicitudes HTTP al backend.
React Router (6.x): Para manejar rutas en la SPA.
Day.js: Para manejar fechas y zonas horarias.
Vercel o GitHub Pages: Plataformas gratuitas para alojamiento.
ESLint y Prettier: Para mantener la calidad del código.

Estructura del Proyecto
frontend/
├── public/
│   ├── index.html        # Punto de entrada
│   └── favicon.ico       # Ícono del sitio
├── src/
│   ├── assets/           # Imágenes, íconos, etc.
│   ├── components/       # Componentes reutilizables
│   │   ├── common/       # Botones, inputs, modales
│   │   ├── public/       # Componentes para interfaz pública
│   │   └── dashboard/    # Componentes para interfaz autenticada
│   ├── pages/            # Páginas principales
│   │   ├── PublicHome.jsx     # Página pública (miagenda.com/<username>)
│   │   ├── Availability.jsx   # Página de disponibilidad
│   │   ├── Booking.jsx       # Página de reserva
│   │   ├── Login.jsx         # Página de inicio de sesión
│   │   ├── Register.jsx      # Página de registro
│   │   ├── Dashboard.jsx     # Panel de gestión (autenticado)
│   │   └── NotFound.jsx      # Página 404
│   ├── hooks/            # Hooks personalizados (useAuth, useApi)
│   ├── lib/              # Utilidades (API, constantes)
│   ├── styles/           # Estilos globales (Tailwind)
│   └── App.jsx           # Componente raíz
├── .env                  # Variables de entorno (VITE_API_URL)
├── vite.config.js        # Configuración de Vite
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración de Tailwind
└── README.md             # Instrucciones del proyecto

Configuración del Proyecto

Instalación:npm create vite@latest frontend -- --template react
cd frontend
npm install axios react-router-dom dayjs tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install -D eslint prettier


Configuración de Tailwind (tailwind.config.js):module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};


Configuración de Vite (vite.config.js):import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  base: '/', // Ajustar si se usa GitHub Pages
});


Variables de Entorno (.env):VITE_API_URL=http://localhost:3000/api # URL del backend



Componentes Principales

Públicos:
BusinessInfo: Muestra información del negocio (name, logo) y lista de sucursales (automática si solo hay una).
AvailabilityCalendar: Muestra un calendario con slots disponibles, usando Day.js para manejar Business.timezone.
BookingForm: Formulario para reservar citas (campos: clientName, clientEmail, clientPhone, startTime, endTime).
AppointmentActions: Permite reprogramar/cancelar citas con TemporaryToken.


Autenticados:
DashboardLayout: Layout con barra lateral para navegación (perfil, sucursales, trabajadores, horarios, citas, excepciones).
ProfileForm: Edita User (name, phone) y Business (name, logo, timezone).
BranchManager: CRUD para sucursales (name, address).
WorkerManager: CRUD para trabajadores (workerName, isOwner).
ScheduleManager: CRUD para horarios (dayOfWeek, startTime, endTime, slotDuration).
ExceptionManager: CRUD para excepciones (date, isClosed, startTime, endTime).
AppointmentManager: Lista y gestión de citas (status, reprogramación).


Comunes:
Button, Input, Modal: Componentes reutilizables con Tailwind CSS.
ErrorBoundary: Maneja errores en componentes.
LoadingSpinner: Indicador de carga para solicitudes.



Rutas

Públicas:
/: Página de inicio estática.
/<username>: Muestra información del negocio/sucursales.
/<username>/availability: Muestra disponibilidad de citas.
/<username>/book: Formulario de reserva.
/appointments/:id: Reprogramación/cancelación con token.


Autenticadas:
/login: Formulario de inicio de sesión.
/register: Formulario de registro.
/dashboard: Panel de gestión (perfil, sucursales, etc.).
/dashboard/*: Subrutas para gestión específica.


404: Página para rutas no encontradas.

Manejo de Estado

React Context (useAuth): Almacena estado de autenticación (token, refreshToken, user).
Local Storage: Persiste token y refreshToken para sesiones.
useApi Hook: Centraliza solicitudes HTTP con Axios, maneja errores y reintentos.

Flujo de Uso

Acceso Público:
Cliente ingresa a miagenda.com/<username>.
Ve información del negocio y sucursales (selección automática si solo hay una).
Navega a disponibilidad, selecciona un slot, y reserva completando el formulario.
Recibe correo con enlace para reprogramar/cancelar (usando TemporaryToken).


Acceso Autenticado:
Usuario se registra (/register) o inicia sesión (/login).
Verifica correo con enlace recibido.
Accede al panel (/dashboard) para gestionar perfil, sucursales, trabajadores, horarios, excepciones, y citas.
Recibe notificaciones de citas nuevas/actualizadas.



Seguridad

Validaciones: Usar yup o zod en el frontend para validar entradas antes de enviar al backend (por ejemplo, formato de email, username, slotDuration).
JWT: Incluir Authorization: Bearer <token> en solicitudes autenticadas.
Rate-Limiting: Mostrar mensajes de error claros para límites excedidos (429).
Sanitización: Evitar XSS usando dangerouslySetInnerHTML solo cuando sea necesario y sanitizando entradas.

Rendimiento

Lazy Loading: Cargar componentes pesados (como el calendario) bajo demanda con React.lazy.
Optimización de Imágenes: Comprimir logo de negocios (máximo 500 KB).
Caching: Almacenar respuestas de /public/business/:username en localStorage (TTL: 1 hora).
Memoización: Usar React.memo y useMemo para evitar re-renderizados innecesarios.

Accesibilidad

Usar atributos ARIA en el calendario y formularios.
Asegurar contraste de colores con Tailwind (bg-gray-800, text-white, etc.).
Probar con herramientas como Lighthouse.

Pruebas

Vitest: Pruebas unitarias para componentes y hooks.
React Testing Library: Pruebas de renderizado e interacción.
Cypress (opcional): Pruebas end-to-end para flujos críticos.

Implementación del Componente Principal
A continuación, un ejemplo del componente PublicHome.jsx que muestra la información del negocio y sucursales:
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, LoadingSpinner } from '../components/common';

const PublicHome = () => {
  const { username } = useParams();
  const [business, setBusiness] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/public/business/${username}`
        );
        setBusiness(response.data.business);
        setBranches(response.data.branches);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el negocio');
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [username]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{business.name}</h1>
      {business.logo && (
        <img src={business.logo} alt="Logo" className="w-32 h-32 mb-4" />
      )}
      {branches.length === 1 ? (
        <Link
          to={`/${username}/availability?branchId=${branches[0].id}`}
          className="btn bg-blue-500 text-white"
        >
          Ver disponibilidad
        </Link>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Sucursales</h2>
          <ul className="space-y-2">
            {branches.map((branch) => (
              <li key={branch.id}>
                <Link
                  to={`/${username}/availability?branchId=${branch.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {branch.name} {branch.address && `(${branch.address})`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PublicHome;

Notas de Implementación

Entorno: Configurar VITE_API_URL en .env para conectar con el backend.
Despliegue:
Para Vercel: npm run build y subir a Vercel.
Para GitHub Pages: Ajustar base en vite.config.js y usar gh-pages.


Dependencias (package.json):{
  "dependencies": {
    "axios": "^1.6.0",
    "dayjs": "^1.11.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "vite": "^5.0.0",
    "vitest": "^0.34.0",
    "@testing-library/react": "^14.0.0"
  }
}



Recomendaciones

Iterar con el Backend: Validar que los endpoints retornen los datos esperados y manejar errores específicos (400, 429, etc.).
Prototipo Rápido: Comenzar con las páginas públicas (PublicHome, Availability, Booking) para validar el flujo de reservas.
Escalabilidad: Considerar agregar un store como Zustand si el estado global crece significativamente.
Monitoreo: Usar Sentry (gratuito en plan básico) para rastrear errores en producción.

Esta documentación proporciona una base sólida para desarrollar el frontend, alineada con el backend y las necesidades de la plataforma.

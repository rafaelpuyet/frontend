import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ReservationModal({ appointment, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md sm:p-6 sm:max-w-lg">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-gray-900 text-sm font-bold sm:text-base">{appointment.title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <i className="fas fa-times text-sm sm:text-base"></i>
          </button>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm">
          {format(appointment.start, "EEEE d 'de' MMMM yyyy - HH:mm", { locale: es })} a{' '}
          {format(appointment.end, 'HH:mm', { locale: es })} hrs
        </p>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">
          Se atenderá con: {appointment.professional}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
            <i className="fas fa-phone"></i>
            <span>+569 1234 5678</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
            <i className="fab fa-whatsapp"></i>
            <Link href="#" className="text-blue-600 hover:underline">Hablar por WhatsApp</Link>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
            <i className="fas fa-envelope"></i>
            <span>{appointment.client.toLowerCase().replace(' ', '')}@example.com</span>
          </div>
          <div className="mt-2">
            <p className="text-gray-700 font-medium text-xs sm:text-sm">Comentario interno:</p>
            <p className="text-gray-600 text-xs sm:text-sm">Ana prefiere estacionar en el -1</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
            <i className="fas fa-bookmark"></i>
            <span>Reservado</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2">
            <button className="text-gray-600 hover:text-blue-600">
              <i className="fas fa-edit text-sm"></i>
            </button>
            <button className="text-gray-600 hover:text-red-600">
              <i className="fas fa-trash text-sm"></i>
            </button>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 sm:text-sm cursor-pointer">
              <i className="fas fa-dollar-sign"></i> Pagar
            </button>
            <Link href="#" className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 sm:text-sm cursor-pointer">
              Ir a la ficha <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
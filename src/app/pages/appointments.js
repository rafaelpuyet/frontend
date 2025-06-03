import { useState, useEffect } from 'react';
import { getAppointments } from '../lib/api';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{appointment.title}</h2>
            <p>{appointment.date}</p>
            <p>{appointment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
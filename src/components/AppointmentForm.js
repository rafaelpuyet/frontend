import { useState } from 'react';
import { createAppointment } from '../lib/api';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({ title: '', date: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(formData);
      alert('Appointment created!');
      setFormData({ title: '', date: '', description: '' });
    } catch (error) {
      alert('Error creating appointment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Create Appointment
      </button>
    </form>
  );
}
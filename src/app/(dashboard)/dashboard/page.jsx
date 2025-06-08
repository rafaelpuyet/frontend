'use client';

import { AuthContext } from '../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Debug ID
const instanceId = Math.random().toString(36).slice(2, 9);

export default function DashboardPage() {
  console.log(`[${instanceId}] DashboardPage mounted`);
  const { user, loading, apiFetch, logout } = useContext(AuthContext);
  const router = useRouter();
  const [metrics, setMetrics] = useState({
    appointmentsToday: 0,
    appointmentsWeek: 0,
    activeBranches: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`[${instanceId}] DashboardPage useEffect: user=${!!user}, loading=${loading}`);
    if (!loading && !user) {
      console.log(`[${instanceId}] No user, redirecting to /login`);
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || loading) return;

    const fetchData = async () => {
      try {
        console.log(`[${instanceId}] Fetching dashboard data`);
        const [todayRes, weekRes, branchesRes, recentRes] = await Promise.all([
          apiFetch('/api/appointments/sessions?today=true'),
          apiFetch('/api/appointments/sessions?week=true'),
          apiFetch('/api/sucursales'),
          apiFetch('/api/appointments/sessions?recent=true'),
        ]);

        setMetrics({
          appointmentsToday: todayRes.count || 0,
          appointmentsWeek: weekRes.count || 0,
          activeBranches: branchesRes.length || 0,
        });
        setRecentAppointments(recentRes.appointments || []);
      } catch (err) {
        console.error(`[${instanceId}] Error fetching dashboard data: ${err.message}`);
        setError(err.message);
        if (err.message === 'Unauthorized') {
          console.log(`[${instanceId}] Unauthorized, logging out`);
          logout();
        }
      }
    };

    fetchData();
  }, [user, loading, apiFetch, logout]);

  useEffect(() => {
    return () => {
      console.log(`[${instanceId}] DashboardPage unmounted`);
    };
  }, []);

  if (loading || !user) {
    console.log(`[${instanceId}] Rendering loading state`);
    return <div className="flex flex-1 justify-center items-center">Loading...</div>;
  }

  return (
    <main className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 py-8 flex flex-1 justify-center bg-gray-100">
      <div className="layout-content-container flex flex-col w-full max-w-5xl gap-8">
        <h1 className="text-slate-900 text-3xl font-bold leading-tight">
          Welcome back, {user.name || 'User'}
        </h1>

        {error && (
          <div className="flex items-center gap-4 bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm">
            <div className="text-red-600 flex items-center justify-center rounded-full bg-red-100 shrink-0 size-10">
              <svg
                fill="currentColor"
                height="24px"
                viewBox="0 0 256 256"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <p className="text-red-700 text-base font-semibold leading-normal">Error</p>
              <p className="text-red-600 text-sm font-normal leading-normal">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
            <p className="text-slate-700 text-base font-medium leading-normal">Appointments Today</p>
            <p className="text-slate-900 text-3xl font-bold leading-tight">{metrics.appointmentsToday}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
            <p className="text-slate-700 text-base font-medium leading-normal">Appointments This Week</p>
            <p className="text-slate-900 text-3xl font-bold leading-tight">{metrics.appointmentsWeek}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
            <p className="text-slate-700 text-base font-medium leading-normal">Active Branches</p>
            <p className="text-slate-900 text-3xl font-bold leading-tight">{metrics.activeBranches}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-slate-900 text-xl font-semibold leading-tight">Recent Appointments</h2>
          <div className="overflow-x-auto @container">
            <div className="min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentAppointments.map((appointment, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                        {appointment.customerName || 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {appointment.serviceName || 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {appointment.date || 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {appointment.time || 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            appointment.status === 'Confirmed'
                              ? 'bg-green-100 text-green-700'
                              : appointment.status === 'Completed'
                              ? 'bg-blue-100 text-blue-700'
                              : appointment.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {appointment.status || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentAppointments.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-slate-600">
                        No recent appointments
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <style jsx>{`
              @container (max-width: 640px) {
                th:nth-child(2),
                td:nth-child(2),
                th:nth-child(3),
                td:nth-child(3),
                th:nth-child(4),
                td:nth-child(4) {
                  display: none;
                }
              }
              @container (max-width: 480px) {
                th:nth-child(5),
                td:nth-child(5) {
                  display: none;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </main>
  );
}
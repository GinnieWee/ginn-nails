import Link from 'next/link';
import { fetchDashboardStats, fetchRecentQuotes } from '../../lib/db';

const statusStyle: Record<string, { bg: string; color: string }> = {
  Draft:    { bg: '#F0EAE0', color: '#8C7B74' },
  Sent:     { bg: '#E8D5D0', color: '#6B4C40' },
  Accepted: { bg: '#DFF0E4', color: '#3A6B4A' },
  Rejected: { bg: '#F0E0E0', color: '#8C3A3A' },
};

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const [stats, recentQuotes] = await Promise.all([
    fetchDashboardStats().catch(() => ({ total: 0, accepted: 0, pending: 0, rejected: 0 })),
    fetchRecentQuotes(5).catch(() => []),
  ]);

  const now = new Date();
  const monthLabel = now.toLocaleString('en-MY', { month: 'long', year: 'numeric' });

  const statCards = [
    { label: 'Quotes This Month', value: stats.total,    sub: monthLabel,     accent: '#3D2B20' },
    { label: 'Accepted',          value: stats.accepted, sub: 'Closed deals', accent: '#5A7A4A' },
    { label: 'Pending',           value: stats.pending,  sub: 'Draft + Sent', accent: '#8C6B2A' },
    { label: 'Rejected',          value: stats.rejected, sub: 'This month',   accent: '#8C3A3A' },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-serif)', color: '#3D2B20' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: '#8C7B74' }}>
          Welcome back. Here&apos;s your overview for {monthLabel}.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map(({ label, value, sub, accent }) => (
          <div key={label} className="rounded-xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8D5D0' }}>
            <div className="text-3xl font-bold" style={{ color: accent }}>{value}</div>
            <div className="text-sm font-medium mt-1" style={{ color: '#3D2B20' }}>{label}</div>
            <div className="text-xs mt-0.5" style={{ color: '#8C7B74' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex gap-3">
        <Link href="/admin/create-quote" className="px-4 py-2 text-sm font-medium rounded-lg"
          style={{ backgroundColor: '#3D2B20', color: '#fff' }}>
          + New Quote
        </Link>
        <Link href="/admin/customers" className="px-4 py-2 text-sm font-medium rounded-lg"
          style={{ backgroundColor: '#F0EAE0', color: '#3D2B20', border: '1px solid #E8D5D0' }}>
          View Customers
        </Link>
      </div>

      {/* Recent Quotes */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: '#3D2B20' }}>Recent Quotes</h2>
          <Link href="/admin/quotes" className="text-xs font-medium" style={{ color: '#C9A09A' }}>
            View all →
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E8D5D0' }}>
          {recentQuotes.length === 0 ? (
            <div className="py-12 text-center text-sm" style={{ backgroundColor: '#fff', color: '#8C7B74' }}>
              No quotes yet. <Link href="/admin/create-quote" style={{ color: '#C9A09A' }}>Create your first quote →</Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F0EAE0', borderBottom: '1px solid #E8D5D0' }}>
                  {['Quote ID', 'Customer', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium" style={{ color: '#8C7B74' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#fff' }}>
                {recentQuotes.map((q, i) => {
                  const s = statusStyle[q.status] ?? statusStyle['Draft'];
                  return (
                    <tr key={q.id} style={{ borderBottom: i < recentQuotes.length - 1 ? '1px solid #F0EAE0' : 'none' }}>
                      <td className="px-5 py-3.5 font-mono text-xs" style={{ color: '#A0706A' }}>{q.quote_number}</td>
                      <td className="px-5 py-3.5 font-medium" style={{ color: '#3D2B20' }}>
                        {q.customers?.company ?? '—'}
                      </td>
                      <td className="px-5 py-3.5" style={{ color: '#8C7B74' }}>
                        {new Date(q.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="px-2.5 py-1 rounded-md text-xs font-medium"
                          style={{ backgroundColor: s.bg, color: s.color }}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { fetchCustomers, insertCustomer, type Customer } from '../../../lib/db';

const emptyForm = { company: '', contact: '', email: '', phone: '' };

const INPUT: React.CSSProperties = {
  width: '100%', backgroundColor: '#FAF7F2', border: '1px solid #E8D5D0',
  color: '#3D2B20', fontSize: '0.875rem', borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem', outline: 'none',
};

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: '#E8D5D0', color: '#6B4C40' }}>
      {initials}
    </div>
  );
}

function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ color: '#8C7B74' }}>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(61,43,32,0.35)' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [showAdd, setShowAdd]     = useState(false);
  const [viewing, setViewing]     = useState<Customer | null>(null);
  const [form, setForm]           = useState(emptyForm);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => {
    fetchCustomers()
      .then(setCustomers)
      .catch(() => setError('Failed to load customers.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter(c =>
    [c.company, c.contact, c.email].some(v => v.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = async () => {
    if (!form.company || !form.contact || !form.email) return;
    setSaving(true);
    try {
      const created = await insertCustomer(form);
      setCustomers(prev => [created, ...prev]);
      setForm(emptyForm);
      setShowAdd(false);
    } catch {
      setError('Failed to save customer. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Add Customer Modal */}
      {showAdd && (
        <Overlay onClose={() => setShowAdd(false)}>
          <div className="w-full max-w-md rounded-2xl shadow-2xl p-6" style={{ backgroundColor: '#FAF7F2' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-serif)', color: '#3D2B20' }}>
                Add Customer
              </h2>
              <CloseBtn onClick={() => setShowAdd(false)} />
            </div>
            <div className="space-y-3">
              {[
                { label: 'Company Name *', key: 'company', placeholder: 'e.g. Glamour Studio' },
                { label: 'Contact Person *', key: 'contact', placeholder: 'e.g. Sarah Lee' },
                { label: 'Email *', key: 'email', placeholder: 'e.g. sarah@company.com' },
                { label: 'Phone', key: 'phone', placeholder: 'e.g. +60 11-1234 5678' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#6B4C40' }}>{label}</label>
                  <input value={form[key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder} style={INPUT} />
                </div>
              ))}
            </div>
            {error && <p className="text-xs mt-3" style={{ color: '#8C3A3A' }}>{error}</p>}
            <div className="flex gap-2 mt-5">
              <button onClick={handleAdd} disabled={!form.company || !form.contact || !form.email || saving}
                className="flex-1 py-2 text-sm font-medium rounded-lg disabled:opacity-40"
                style={{ backgroundColor: '#3D2B20', color: '#fff' }}>
                {saving ? 'Saving…' : 'Add Customer'}
              </button>
              <button onClick={() => { setShowAdd(false); setError(''); }}
                className="px-4 py-2 text-sm font-medium rounded-lg"
                style={{ backgroundColor: '#F0EAE0', color: '#6B4C40', border: '1px solid #E8D5D0' }}>
                Cancel
              </button>
            </div>
          </div>
        </Overlay>
      )}

      {/* View Customer Modal */}
      {viewing && (
        <Overlay onClose={() => setViewing(null)}>
          <div className="w-full max-w-sm rounded-2xl shadow-2xl p-6" style={{ backgroundColor: '#FAF7F2' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar name={viewing.company} />
                <div>
                  <div className="font-semibold" style={{ fontFamily: 'var(--font-serif)', color: '#3D2B20' }}>
                    {viewing.company}
                  </div>
                  <div className="text-xs" style={{ color: '#8C7B74' }}>{viewing.id.slice(0, 8)}…</div>
                </div>
              </div>
              <CloseBtn onClick={() => setViewing(null)} />
            </div>
            <div className="space-y-0 mt-4">
              {[
                { label: 'Contact Person', value: viewing.contact },
                { label: 'Email', value: viewing.email },
                { label: 'Phone', value: viewing.phone || '—' },
                { label: 'Added', value: new Date(viewing.created_at).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' }) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2.5" style={{ borderBottom: '1px solid #F0EAE0' }}>
                  <span className="text-xs font-medium" style={{ color: '#8C7B74' }}>{label}</span>
                  <span className="text-sm" style={{ color: '#3D2B20' }}>{value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setViewing(null)} className="mt-5 w-full py-2 text-sm font-medium rounded-lg"
              style={{ backgroundColor: '#F0EAE0', color: '#6B4C40', border: '1px solid #E8D5D0' }}>
              Close
            </button>
          </div>
        </Overlay>
      )}

      {/* Page */}
      <div className="p-8 max-w-5xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-serif)', color: '#3D2B20' }}>
              Customers
            </h1>
            <p className="text-sm mt-1" style={{ color: '#8C7B74' }}>
              {loading ? 'Loading…' : `${customers.length} companies on record`}
            </p>
          </div>
          <button onClick={() => { setShowAdd(true); setError(''); }}
            className="px-4 py-2 text-sm font-medium rounded-lg"
            style={{ backgroundColor: '#3D2B20', color: '#fff' }}>
            + Add Customer
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: '#8C7B74' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by company, contact or email…"
            style={{ ...INPUT, paddingLeft: '2.25rem' }} />
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E8D5D0' }}>
          {loading ? (
            <div className="py-16 text-center text-sm" style={{ backgroundColor: '#fff', color: '#8C7B74' }}>
              Loading customers…
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F0EAE0', borderBottom: '1px solid #E8D5D0' }}>
                  {['Company', 'Contact Person', 'Email', 'Phone', 'Added', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium" style={{ color: '#8C7B74' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#fff' }}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm" style={{ color: '#8C7B74' }}>
                      {customers.length === 0
                        ? 'No customers yet. Add your first one above.'
                        : 'No customers match your search.'}
                    </td>
                  </tr>
                ) : filtered.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F0EAE0' : 'none' }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.company} />
                        <div>
                          <div className="font-medium" style={{ color: '#3D2B20' }}>{c.company}</div>
                          <div className="text-xs" style={{ color: '#8C7B74' }}>{c.id.slice(0, 8)}…</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4" style={{ color: '#6B4C40' }}>{c.contact}</td>
                    <td className="px-5 py-4" style={{ color: '#8C7B74' }}>{c.email}</td>
                    <td className="px-5 py-4" style={{ color: '#8C7B74' }}>{c.phone || '—'}</td>
                    <td className="px-5 py-4 text-xs" style={{ color: '#8C7B74' }}>
                      {new Date(c.created_at).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => setViewing(c)} className="text-xs font-medium" style={{ color: '#C9A09A' }}>
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

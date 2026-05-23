'use client';
import { useEffect, useState } from 'react';
import {
  fetchCustomers, createQuoteWithItems,
  type Customer, type QuoteStatus,
} from '../../../lib/db';
import InvoiceModal, { type InvoiceData } from '../_components/InvoiceModal';

const SERVICE_OPTIONS = [
  'Gel Manicure', 'Classic Manicure', 'Nail Extension (Full Set)',
  'Nail Extension (Infill)', 'Nail Art Design', 'French Tips',
  'Nail Removal', 'Pedicure (Basic)', 'Pedicure (Gel)',
];

type LineItem = { id: number; service: string; qty: number; unitPrice: number };

const INPUT: React.CSSProperties = {
  width: '100%', backgroundColor: '#FAF7F2', border: '1px solid #E8D5D0',
  color: '#3D2B20', fontSize: '0.875rem', borderRadius: '0.5rem',
  padding: '0.625rem 0.75rem', outline: 'none',
};

const SECTION: React.CSSProperties = {
  backgroundColor: '#fff', border: '1px solid #E8D5D0',
  borderRadius: '0.75rem', padding: '1.5rem',
};

const fmt = (n: number) => 'RM ' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function CreateQuotePage() {
  const [customers, setCustomers]   = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [quoteDate, setQuoteDate]   = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus]         = useState<QuoteStatus>('Draft');
  const [notes, setNotes]           = useState('');
  const [items, setItems]           = useState<LineItem[]>([
    { id: 1, service: 'Gel Manicure', qty: 1, unitPrice: 120 },
  ]);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');
  const [savedQuoteNum, setSavedQuoteNum] = useState('');
  const [previewData, setPreviewData]    = useState<InvoiceData | null>(null);

  useEffect(() => {
    fetchCustomers().then(setCustomers).catch(() => {});
  }, []);

  const addItem = () =>
    setItems(p => [...p, { id: Date.now(), service: 'Gel Manicure', qty: 1, unitPrice: 120 }]);

  const removeItem = (id: number) =>
    setItems(p => p.filter(i => i.id !== id));

  const updateItem = (id: number, field: keyof Omit<LineItem, 'id'>, value: string | number) =>
    setItems(p => p.map(i => i.id === id ? { ...i, [field]: value } : i));

  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const tax      = subtotal * 0.06;
  const total    = subtotal + tax;

  const selectedCustomer = customers.find(c => c.id === customerId);
  const canSave = !!customerId && items.every(i => i.service && i.qty > 0 && i.unitPrice >= 0);

  const handleSave = async (saveStatus: QuoteStatus) => {
    if (!canSave) return;
    setSaving(true);
    setError('');
    try {
      const quote = await createQuoteWithItems(
        { customer_id: customerId, date: quoteDate, status: saveStatus, notes },
        items.map(i => ({ service: i.service, qty: i.qty, unit_price: i.unitPrice }))
      );
      setSavedQuoteNum(quote.quote_number);
    } catch (e) {
      setError('Failed to save quote. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!selectedCustomer) return;
    setPreviewData({
      id:       'PREVIEW',
      customer: selectedCustomer.company,
      contact:  selectedCustomer.contact,
      email:    selectedCustomer.email,
      date:     new Date(quoteDate).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' }),
      status:   'Preview',
      notes:    notes || undefined,
      items:    items.map(i => ({ service: i.service, qty: i.qty, unitPrice: i.unitPrice })),
    });
  };

  const resetForm = () => {
    setCustomerId(''); setNotes(''); setSavedQuoteNum(''); setError('');
    setItems([{ id: 1, service: 'Gel Manicure', qty: 1, unitPrice: 120 }]);
    setQuoteDate(new Date().toISOString().split('T')[0]);
  };

  if (savedQuoteNum) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: '#DFF0E4' }}>
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#3A6B4A" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-1"
          style={{ fontFamily: 'var(--font-serif)', color: '#3D2B20' }}>
          Quote Saved
        </h2>
        <p className="text-sm mb-1" style={{ color: '#8C7B74' }}>
          <span className="font-mono" style={{ color: '#A0706A' }}>{savedQuoteNum}</span> saved for{' '}
          <span style={{ color: '#6B4C40', fontWeight: 500 }}>{selectedCustomer?.company}</span>.
        </p>
        <p className="text-xs mb-6" style={{ color: '#C9A09A' }}>Total: {fmt(total)}</p>
        <div className="flex gap-3">
          <button onClick={resetForm} className="px-4 py-2 text-sm font-medium rounded-lg"
            style={{ backgroundColor: '#3D2B20', color: '#fff' }}>
            Create Another
          </button>
          <a href="/admin/quotes" className="px-4 py-2 text-sm font-medium rounded-lg"
            style={{ backgroundColor: '#F0EAE0', color: '#3D2B20', border: '1px solid #E8D5D0' }}>
            View All Quotes
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {previewData && <InvoiceModal data={previewData} onClose={() => setPreviewData(null)} />}

      <div className="p-8 max-w-3xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-serif)', color: '#3D2B20' }}>
              Create Quote
            </h1>
            <p className="text-sm mt-1" style={{ color: '#8C7B74' }}>
              Fill in the details below to generate a new quote.
            </p>
          </div>
          <button onClick={handlePreview} disabled={!canSave}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-40"
            style={{ backgroundColor: '#F0EAE0', color: '#6B4C40', border: '1px solid #E8D5D0' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview Invoice
          </button>
        </div>

        <div className="space-y-5">
          {/* Quote Details */}
          <div style={SECTION}>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8C7B74' }}>
              Quote Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B4C40' }}>Customer *</label>
                <select value={customerId} onChange={e => setCustomerId(e.target.value)} style={INPUT}>
                  <option value="" disabled>Select a customer…</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.company} — {c.contact}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B4C40' }}>Quote Date</label>
                <input type="date" value={quoteDate} onChange={e => setQuoteDate(e.target.value)} style={INPUT} />
              </div>
            </div>
          </div>

          {/* Services */}
          <div style={SECTION}>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8C7B74' }}>
              Services
            </h2>

            <div className="grid grid-cols-12 gap-3 px-1 mb-2">
              {['Service', 'Qty', 'Unit Price (RM)', ''].map((h, i) => (
                <div key={i} className={`text-xs font-medium ${i === 0 ? 'col-span-6' : i === 1 ? 'col-span-2' : i === 2 ? 'col-span-3' : 'col-span-1'}`}
                  style={{ color: '#8C7B74' }}>{h}</div>
              ))}
            </div>

            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-6">
                    <select value={item.service} onChange={e => updateItem(item.id, 'service', e.target.value)} style={INPUT}>
                      {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input type="number" min="1" value={item.qty}
                      onChange={e => updateItem(item.id, 'qty', Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ ...INPUT, textAlign: 'center' }} />
                  </div>
                  <div className="col-span-3">
                    <input type="number" min="0" step="0.01" value={item.unitPrice}
                      onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      style={INPUT} />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => removeItem(item.id)} disabled={items.length === 1}
                      className="disabled:opacity-20 disabled:pointer-events-none" style={{ color: '#C9A09A' }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addItem} className="mt-4 text-sm font-medium flex items-center gap-1.5"
              style={{ color: '#A0706A' }}>
              <span className="text-lg leading-none">+</span> Add Line Item
            </button>

            {/* Totals */}
            <div className="mt-6 pt-4 space-y-2" style={{ borderTop: '1px solid #F0EAE0' }}>
              {[['Subtotal', fmt(subtotal)], ['SST (6%)', fmt(tax)]].map(([l, v]) => (
                <div key={l} className="flex justify-between text-sm">
                  <span style={{ color: '#8C7B74' }}>{l}</span>
                  <span style={{ color: '#3D2B20' }}>{v}</span>
                </div>
              ))}
              <div className="flex justify-between text-base font-bold pt-2"
                style={{ borderTop: '2px solid #E8D5D0' }}>
                <span style={{ color: '#3D2B20' }}>Total</span>
                <span style={{ color: '#A0706A' }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={SECTION}>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8C7B74' }}>Notes</h2>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              placeholder="Add any notes or special instructions for this quote…"
              style={{ ...INPUT, resize: 'none' }} />
          </div>

          {!customerId && (
            <p className="text-xs" style={{ color: '#C9A09A' }}>
              ↑ Select a customer to enable saving and invoice preview.
            </p>
          )}

          {error && (
            <p className="text-xs px-4 py-2 rounded-lg" style={{ backgroundColor: '#F0E0E0', color: '#8C3A3A' }}>
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button onClick={() => handleSave('Draft')} disabled={!canSave || saving}
              className="px-5 py-2.5 text-sm font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#3D2B20', color: '#fff' }}>
              {saving ? 'Saving…' : 'Save as Draft'}
            </button>
            <button onClick={() => handleSave('Sent')} disabled={!canSave || saving}
              className="px-5 py-2.5 text-sm font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#5A7A4A', color: '#fff' }}>
              {saving ? 'Saving…' : 'Save & Mark as Sent'}
            </button>
            <a href="/admin" className="px-5 py-2.5 text-sm font-medium rounded-lg"
              style={{ backgroundColor: '#F0EAE0', color: '#6B4C40', border: '1px solid #E8D5D0' }}>
              Cancel
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

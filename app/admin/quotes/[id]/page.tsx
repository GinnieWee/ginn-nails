'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchQuoteById, type FullQuote, type QuoteStatus } from '../../../../lib/db';

const fmt = (n: number) => 'RM ' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const statusStyle: Record<QuoteStatus, { bg: string; color: string }> = {
  Draft:    { bg: '#F0EAE0', color: '#8C7B74' },
  Sent:     { bg: '#E8D5D0', color: '#6B4C40' },
  Accepted: { bg: '#DFF0E4', color: '#3A6B4A' },
  Rejected: { bg: '#F0E0E0', color: '#8C3A3A' },
};

export default function QuoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote]       = useState<FullQuote | null>(null);
  const [loading, setLoading]   = useState(true);
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetchQuoteById(id)
      .then(setQuote)
      .catch(() => setError('Could not load quote.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSend = async () => {
    if (!quote) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId: id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to send');
      setQuote(q => q ? { ...q, status: 'Sent' } : q);
      setSent(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send quote.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <p className="text-sm" style={{ color: '#8C7B74' }}>Loading quote…</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-sm mb-4" style={{ color: '#8C7B74' }}>Quote not found.</p>
        <Link href="/admin/quotes" className="text-sm font-medium" style={{ color: '#A0706A' }}>
          ← Back to quotes
        </Link>
      </div>
    );
  }

  const subtotal = quote.items.reduce((s, i) => s + i.qty * i.unit_price, 0);
  const tax      = subtotal * 0.06;
  const total    = subtotal + tax;
  const s        = statusStyle[quote.status as QuoteStatus] ?? statusStyle['Draft'];
  const dateStr  = new Date(quote.date).toLocaleDateString('en-MY', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/quotes" className="text-sm font-medium" style={{ color: '#8C7B74' }}>
            ← Quotes
          </Link>
          <span style={{ color: '#E8D5D0' }}>/</span>
          <span className="font-mono text-sm font-medium" style={{ color: '#A0706A' }}>
            {quote.quote_number}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: s.bg, color: s.color }}>
            {quote.status}
          </span>
        </div>

        <button
          onClick={handleSend}
          disabled={sending}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#3D2B20', color: '#fff' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          {sending ? 'Sending…' : quote.status === 'Sent' ? 'Resend Email' : 'Send Quote'}
        </button>
      </div>

      {/* Success banner */}
      {sent && (
        <div className="mb-6 px-4 py-3 rounded-lg flex items-center gap-2 text-sm"
          style={{ backgroundColor: '#DFF0E4', color: '#3A6B4A' }}>
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Quote emailed to <strong>{quote.customers.email}</strong> and status updated to Sent.
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-lg text-sm"
          style={{ backgroundColor: '#F0E0E0', color: '#8C3A3A' }}>
          {error}
        </div>
      )}

      {/* Invoice card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E8D5D0', backgroundColor: '#fff' }}>

        {/* Invoice header */}
        <div className="px-10 py-8" style={{ backgroundColor: '#3D2B20' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-bold" style={{ color: '#fff' }}>Le Ginn&apos;s Manicure</p>
              <p className="text-xs mt-1" style={{ color: '#C9A09A' }}>Professional Nail Services · Kuala Lumpur</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest" style={{ color: '#C9A09A' }}>Quotation</p>
              <p className="text-xl font-bold font-mono mt-1" style={{ color: '#fff' }}>{quote.quote_number}</p>
              <p className="text-xs mt-1" style={{ color: '#C9A09A' }}>{dateStr}</p>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="px-10 py-7" style={{ borderBottom: '1px solid #F0EAE0' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#8C7B74' }}>Bill To</p>
          <p className="text-base font-bold" style={{ color: '#3D2B20' }}>{quote.customers.company}</p>
          <p className="text-sm mt-1" style={{ color: '#6B4C40' }}>Attn: {quote.customers.contact}</p>
          <p className="text-sm mt-0.5" style={{ color: '#8C7B74' }}>{quote.customers.email}</p>
          {quote.customers.phone && (
            <p className="text-sm mt-0.5" style={{ color: '#8C7B74' }}>{quote.customers.phone}</p>
          )}
        </div>

        {/* Items */}
        <div className="px-10 py-7" style={{ borderBottom: '1px solid #F0EAE0' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #F0EAE0' }}>
                {['Service', 'Qty', 'Unit Price', 'Amount'].map((h, i) => (
                  <th key={h} className={`pb-3 text-xs font-semibold uppercase tracking-wide ${i === 0 ? 'text-left' : i === 1 ? 'text-center' : 'text-right'}`}
                    style={{ color: '#8C7B74' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: i < quote.items.length - 1 ? '1px solid #F9F3EE' : 'none' }}>
                  <td className="py-3" style={{ color: '#3D2B20' }}>{item.service}</td>
                  <td className="py-3 text-center" style={{ color: '#6B4C40' }}>{item.qty}</td>
                  <td className="py-3 text-right" style={{ color: '#6B4C40' }}>{fmt(item.unit_price)}</td>
                  <td className="py-3 text-right font-semibold" style={{ color: '#3D2B20' }}>{fmt(item.qty * item.unit_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-5 pt-4 space-y-2" style={{ borderTop: '2px solid #E8D5D0' }}>
            {[['Subtotal', fmt(subtotal)], ['SST (6%)', fmt(tax)]].map(([label, val]) => (
              <div key={label} className="flex justify-between text-sm">
                <span style={{ color: '#8C7B74' }}>{label}</span>
                <span style={{ color: '#3D2B20' }}>{val}</span>
              </div>
            ))}
            <div className="flex justify-between items-baseline pt-2" style={{ borderTop: '1px solid #E8D5D0' }}>
              <span className="text-base font-bold" style={{ color: '#3D2B20' }}>Total</span>
              <span className="text-xl font-bold" style={{ color: '#A0706A' }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {quote.notes && (
          <div className="px-10 py-6" style={{ borderBottom: '1px solid #F0EAE0' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8C7B74' }}>Notes</p>
            <p className="text-sm" style={{ color: '#6B4C40' }}>{quote.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-10 py-6 text-center" style={{ backgroundColor: '#FAF7F2' }}>
          <p className="text-sm" style={{ color: '#8C7B74' }}>Thank you for considering Le Ginn&apos;s Manicure.</p>
          <p className="text-xs mt-1" style={{ color: '#C9A09A' }}>
            This quotation is valid for <strong>30 days</strong> from the date above.
          </p>
          <p className="text-xs mt-1" style={{ color: '#C9A09A' }}>
            hello@leginns.com &nbsp;·&nbsp; +60 11-1234 5678
          </p>
        </div>
      </div>
    </div>
  );
}

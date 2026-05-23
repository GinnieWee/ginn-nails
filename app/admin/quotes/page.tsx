'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  fetchQuotes, fetchQuoteItems, updateQuoteStatus,
  type Quote, type QuoteItem, type QuoteStatus,
} from '../../../lib/db';
import InvoiceModal, { type InvoiceData } from '../_components/InvoiceModal';

type Status = QuoteStatus | 'All';

const STATUS_TABS: Status[] = ['All', 'Draft', 'Sent', 'Accepted', 'Rejected'];

const statusStyle: Record<QuoteStatus, { bg: string; color: string; dot: string }> = {
  Draft:    { bg: '#F5ECE4', color: '#896B5E', dot: '#C8705A' },
  Sent:     { bg: '#EDD0C0', color: '#5A3828', dot: '#A8522E' },
  Accepted: { bg: '#DFF0E4', color: '#3A6B4A', dot: '#5A9A6A' },
  Rejected: { bg: '#F0E0E0', color: '#8C3A3A', dot: '#C97070' },
};

const fmt = (n: number) => 'RM ' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function QuoteRecordsPage() {
  const [quotes, setQuotes]       = useState<Quote[]>([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState<Status>('All');
  const [invoice, setInvoice]     = useState<InvoiceData | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes()
      .then(setQuotes)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? quotes : quotes.filter(q => q.status === filter);

  const counts = quotes.reduce((acc, q) => {
    acc[q.status] = (acc[q.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handlePreview = async (q: Quote) => {
    setLoadingId(q.id);
    try {
      const items: QuoteItem[] = await fetchQuoteItems(q.id);
      setInvoice({
        id:       q.quote_number,
        customer: q.customers?.company ?? '—',
        contact:  q.customers?.contact ?? '—',
        email:    q.customers?.email   ?? '—',
        date:     new Date(q.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' }),
        status:   q.status,
        notes:    q.notes || undefined,
        items:    items.map(i => ({ service: i.service, qty: i.qty, unitPrice: i.unit_price })),
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleStatusChange = async (id: string, status: QuoteStatus) => {
    await updateQuoteStatus(id, status);
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  return (
    <>
      {invoice && <InvoiceModal data={invoice} onClose={() => setInvoice(null)} />}

      <div className="p-8 max-w-5xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-serif)', color: '#2D1912' }}>
              Quote Records
            </h1>
            <p className="text-sm mt-1" style={{ color: '#896B5E' }}>
              {loading ? 'Loading…' : `${quotes.length} quotes total`}
            </p>
          </div>
          <Link href="/admin/create-quote" className="px-4 py-2 text-sm font-medium rounded-lg"
            style={{ backgroundColor: '#2D1912', color: '#fff' }}>
            + New Quote
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {STATUS_TABS.map(s => {
            const isAll    = s === 'All';
            const isActive = filter === s;
            const count    = isAll ? quotes.length : (counts[s] ?? 0);
            const style    = !isAll ? statusStyle[s as QuoteStatus] : null;
            return (
              <button key={s} onClick={() => setFilter(s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? '#2D1912' : '#F5ECE4',
                  color:           isActive ? '#fff'    : '#5A3828',
                  border:          isActive ? 'none'    : '1px solid #EDD0C0',
                }}>
                {!isAll && style && (
                  <span className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isActive ? '#C8705A' : style.dot }} />
                )}
                {s}
                <span style={{ color: isActive ? 'rgba(255,255,255,0.55)' : '#896B5E' }}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #EDD0C0' }}>
          {loading ? (
            <div className="py-16 text-center text-sm" style={{ backgroundColor: '#fff', color: '#896B5E' }}>
              Loading quotes…
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F5ECE4', borderBottom: '1px solid #EDD0C0' }}>
                  {['Quote ID', 'Customer', 'Date', 'Items', 'Total', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium" style={{ color: '#896B5E' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#fff' }}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-sm" style={{ color: '#896B5E' }}>
                      {quotes.length === 0
                        ? <>No quotes yet. <Link href="/admin/create-quote" style={{ color: '#C8705A' }}>Create your first one →</Link></>
                        : 'No quotes match this filter.'}
                    </td>
                  </tr>
                ) : filtered.map((q, i) => {
                  const s = statusStyle[q.status as QuoteStatus] ?? statusStyle['Draft'];
                  return (
                    <tr key={q.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F5ECE4' : 'none' }}>
                      <td className="px-5 py-3.5">
                        <Link href={`/admin/quotes/${q.id}`}
                          className="font-mono text-xs font-medium hover:underline"
                          style={{ color: '#A8522E' }}>
                          {q.quote_number}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-medium" style={{ color: '#2D1912' }}>{q.customers?.company ?? '—'}</div>
                        <div className="text-xs" style={{ color: '#896B5E' }}>{q.customers?.contact ?? ''}</div>
                      </td>
                      <td className="px-5 py-3.5" style={{ color: '#896B5E' }}>
                        {new Date(q.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5" style={{ color: '#896B5E' }}>—</td>
                      <td className="px-5 py-3.5 font-medium" style={{ color: '#2D1912' }}>—</td>
                      <td className="px-5 py-3.5">
                        <select
                          value={q.status}
                          onChange={e => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                          className="text-xs font-medium rounded-md px-2 py-1 cursor-pointer"
                          style={{ backgroundColor: s.bg, color: s.color, border: 'none', outline: 'none' }}
                        >
                          {(['Draft', 'Sent', 'Accepted', 'Rejected'] as QuoteStatus[]).map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handlePreview(q)}
                          disabled={loadingId === q.id}
                          className="text-xs font-medium px-2.5 py-1 rounded-md disabled:opacity-50"
                          style={{ backgroundColor: '#F5ECE4', color: '#5A3828', border: '1px solid #EDD0C0' }}
                        >
                          {loadingId === q.id ? '…' : 'Preview'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

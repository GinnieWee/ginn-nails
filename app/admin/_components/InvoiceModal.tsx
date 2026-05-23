'use client';

export type InvoiceItem = { service: string; qty: number; unitPrice: number };

export type InvoiceData = {
  id: string;
  customer: string;
  contact: string;
  email: string;
  date: string;
  status: string;
  notes?: string;
  items: InvoiceItem[];
};

const statusStyle: Record<string, { bg: string; color: string }> = {
  Draft:    { bg: '#F0EAE0', color: '#8C7B74' },
  Sent:     { bg: '#E8D5D0', color: '#6B4C40' },
  Accepted: { bg: '#DFF0E4', color: '#3A6B4A' },
  Rejected: { bg: '#F0E0E0', color: '#8C3A3A' },
  Preview:  { bg: '#E8D5D0', color: '#6B4C40' },
};

const fmt = (n: number) => 'RM ' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function InvoiceModal({ data, onClose }: { data: InvoiceData; onClose: () => void }) {
  const subtotal = data.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const tax = subtotal * 0.06;
  const total = subtotal + tax;
  const st = statusStyle[data.status] ?? statusStyle['Sent'];

  const handlePrint = () => window.print();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(61,43,32,0.35)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-auto rounded-2xl shadow-2xl"
        style={{ backgroundColor: '#FAF7F2' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-6 py-3 border-b"
          style={{ borderColor: '#E8D5D0', backgroundColor: '#F0EAE0' }}
        >
          <span className="text-xs font-medium" style={{ color: '#8C7B74' }}>Invoice Preview</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ backgroundColor: '#3D2B20', color: '#fff' }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: '#8C7B74', backgroundColor: '#E8D5D0' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Invoice Document */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: '#3D2B20' }}>
                Le Ginn&apos;s Manicure
              </div>
              <div className="text-xs mt-1" style={{ color: '#8C7B74' }}>Kuala Lumpur, Malaysia</div>
              <div className="text-xs" style={{ color: '#8C7B74' }}>hello@leginns.com · +60 11-1234 5678</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold tracking-wide" style={{ color: '#3D2B20' }}>QUOTATION</div>
              <div className="text-sm font-mono mt-1" style={{ color: '#A0706A' }}>{data.id}</div>
              <div className="text-xs mt-1" style={{ color: '#8C7B74' }}>{data.date}</div>
              <span
                className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: st.bg, color: st.color }}
              >
                {data.status}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-6" style={{ borderTop: '1px solid #E8D5D0' }} />

          {/* Bill To + Valid */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#8C7B74' }}>Bill To</div>
              <div className="font-semibold" style={{ color: '#3D2B20' }}>{data.customer}</div>
              <div className="text-sm mt-0.5" style={{ color: '#6B4C40' }}>Attn: {data.contact}</div>
              <div className="text-sm" style={{ color: '#8C7B74' }}>{data.email}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#8C7B74' }}>Valid For</div>
              <div className="text-sm" style={{ color: '#6B4C40' }}>30 days from issue</div>
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid #E8D5D0' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F0EAE0', borderBottom: '1px solid #E8D5D0' }}>
                  <th className="text-left px-4 py-2.5 font-medium" style={{ color: '#8C7B74' }}>Service</th>
                  <th className="text-center px-4 py-2.5 font-medium" style={{ color: '#8C7B74' }}>Qty</th>
                  <th className="text-right px-4 py-2.5 font-medium" style={{ color: '#8C7B74' }}>Unit Price</th>
                  <th className="text-right px-4 py-2.5 font-medium" style={{ color: '#8C7B74' }}>Amount</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#fff' }}>
                {data.items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: i < data.items.length - 1 ? '1px solid #F0EAE0' : 'none' }}>
                    <td className="px-4 py-3" style={{ color: '#3D2B20' }}>{item.service}</td>
                    <td className="px-4 py-3 text-center" style={{ color: '#6B4C40' }}>{item.qty}</td>
                    <td className="px-4 py-3 text-right" style={{ color: '#6B4C40' }}>{fmt(item.unitPrice)}</td>
                    <td className="px-4 py-3 text-right font-medium" style={{ color: '#3D2B20' }}>{fmt(item.qty * item.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-56 space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: '#8C7B74' }}>Subtotal</span>
                <span style={{ color: '#3D2B20' }}>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#8C7B74' }}>SST (6%)</span>
                <span style={{ color: '#3D2B20' }}>{fmt(tax)}</span>
              </div>
              <div
                className="flex justify-between text-base font-bold pt-2"
                style={{ borderTop: '2px solid #E8D5D0', color: '#3D2B20' }}
              >
                <span>Total</span>
                <span style={{ color: '#A0706A' }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {data.notes && (
            <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: '#F0EAE0' }}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#8C7B74' }}>Notes</div>
              <p className="text-sm" style={{ color: '#6B4C40' }}>{data.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4" style={{ borderTop: '1px solid #F0EAE0' }}>
            <p className="text-xs text-center" style={{ color: '#8C7B74' }}>
              Thank you for your business! For questions, contact us at hello@leginns.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

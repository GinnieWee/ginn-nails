'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconFilePlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: <IconDashboard /> },
  { href: '/admin/customers', label: 'Customers', icon: <IconUsers /> },
  { href: '/admin/create-quote', label: 'Create Quote', icon: <IconFilePlus /> },
  { href: '/admin/quotes', label: 'Quote Records', icon: <IconClipboard /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen flex flex-col flex-shrink-0" style={{ backgroundColor: '#3D2B20' }}>
      {/* Brand */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="text-white font-semibold text-base tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
          Le Ginn&apos;s
        </div>
        <div className="text-xs mt-0.5" style={{ color: '#C9A09A' }}>Manicure Admin</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {navItems.map(({ href, label, icon }) => {
          const isActive =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? 'rgba(201,160,154,0.15)' : 'transparent',
                color: isActive ? '#C9A09A' : 'rgba(255,255,255,0.55)',
              }}
            >
              <span className="flex-shrink-0">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>Quotation System v1.0</div>
      </div>
    </aside>
  );
}

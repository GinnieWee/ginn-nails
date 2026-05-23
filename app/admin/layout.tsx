import type { Metadata } from 'next';
import Sidebar from './_components/Sidebar';

export const metadata: Metadata = {
  title: "Le Ginn's — Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#FAF5F0', color: '#2D1912' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

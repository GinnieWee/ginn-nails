import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF5F0]/90 backdrop-blur-sm border-b border-[#EDD0C0]">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo area */}
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Le Ginn's Nails logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span
            className="text-lg font-semibold tracking-wide text-[#2D1912]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Le Ginn&apos;s Nails
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-[#5A3828]">
          <a href="#services" className="nav-link hover:text-[#C8705A] transition-colors">Services</a>
          <a href="#designs" className="nav-link hover:text-[#C8705A] transition-colors">Designs</a>
          <a href="#about" className="nav-link hover:text-[#C8705A] transition-colors">About</a>
          <a href="#contact" className="nav-link hover:text-[#C8705A] transition-colors">Contact</a>
        </nav>

        {/* Book CTA */}
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-[#2D1912] text-[#FAF5F0] text-[10px] uppercase tracking-[0.15em] hover:bg-[#5A3828] transition-colors"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}

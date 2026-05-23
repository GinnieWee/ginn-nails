export default function Footer() {
  return (
    <footer className="bg-[#2D1912] text-[#EDD0C0] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpg" alt="Le Ginn's Nails" className="w-9 h-9 rounded-full object-cover" />
              <span className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-serif)" }}>
                Le Ginn&apos;s Nails
              </span>
            </div>
            <p className="text-sm text-[#896B5E] leading-relaxed max-w-xs">
              A quiet corner for beautiful nails — crafted with care, in a space that feels like yours.
            </p>
            <a
              href="https://www.instagram.com/ginn.nails"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-xs text-[#C8705A] hover:text-[#EDD0C0] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @ginn.nails
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#896B5E]">
              <li><a href="#services" className="hover:text-[#C8705A] transition-colors">Services</a></li>
              <li><a href="#designs" className="hover:text-[#C8705A] transition-colors">Designs</a></li>
              <li><a href="#about" className="hover:text-[#C8705A] transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-[#C8705A] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#896B5E]">
              <li>No.127 Lorong Bukit Idaman 3</li>
              <li>Taman Bukit Idaman, 27600 Raub, Pahang</li>
              <li>
                <a href="tel:+601125784475" className="hover:text-[#C8705A] transition-colors">
                  +60 11 2578 4475
                </a>
              </li>
              <li>
                <a href="mailto:hello@ginnnails.com" className="hover:text-[#C8705A] transition-colors">
                  hello@ginnnails.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#3A2216] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#896B5E]">
          <p>&copy; {new Date().getFullYear()} Le Ginn&apos;s Nails. All rights reserved.</p>
          <p>Mon–Sat 10:00–20:00 &nbsp;·&nbsp; Sun 11:00–18:00</p>
        </div>
      </div>
    </footer>
  );
}

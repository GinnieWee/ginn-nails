import Image from "next/image";

const services = ["Gel Manicure", "Nail Extension", "Nail Art", "Gel Pedicure", "Spa Treatment", "Swarovski", "Art Design", "Callus Treatment"];

export default function Hero() {
  return (
    <section className="flex flex-col overflow-hidden">

      {/* ── Full-bleed hero image ── */}
      <div className="relative min-h-screen flex items-center">

        {/* Background photo */}
        <Image
          src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1400&q=90&auto=format&fit=crop"
          alt="Beautiful gel manicure"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Left gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5F0]/95 via-[#FAF5F0]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D1912]/20 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20">
          <div className="max-w-lg">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#EDD0C0] rounded-full px-4 py-1.5 mb-8"
              style={{ animation: "fade-up 0.6s ease 0.1s both" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8705A]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A3828]">Nail Artist &nbsp;·&nbsp; By Appointment</span>
            </div>

            {/* Headline */}
            <h1
              className="text-[3.8rem] md:text-[5rem] font-bold leading-[1.0] text-[#2D1912] mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="block" style={{ animation: "fade-up 0.7s ease 0.2s both" }}>Your Dream</span>
              <span className="block italic text-[#C8705A]" style={{ animation: "fade-up 0.7s ease 0.35s both" }}>Nails</span>
              <span className="block" style={{ animation: "fade-up 0.7s ease 0.5s both" }}>Start Here.</span>
            </h1>

            <div className="w-10 h-px bg-[#C8705A] mb-7" style={{ animation: "fade-in 0.8s ease 0.6s both" }} />

            <p
              className="text-base text-[#5A3828] leading-relaxed mb-10 max-w-sm"
              style={{ animation: "fade-up 0.7s ease 0.65s both" }}
            >
              The nail appointment you&apos;ve been waiting for. Sit back, pick your design, and let us take care of the rest.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3" style={{ animation: "fade-up 0.7s ease 0.8s both" }}>
              <a
                href="#contact"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[#FAF5F0] text-xs tracking-[0.15em] uppercase"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Appointment
              </a>
              <a
                href="#designs"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-[#2D1912]/30 text-[#2D1912] text-xs tracking-[0.15em] uppercase hover:border-[#C8705A] hover:text-[#C8705A] transition-colors duration-300 bg-white/60 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Explore Designs
              </a>
            </div>
          </div>

          {/* Floating stats card — bottom right */}
          <div
            className="absolute bottom-14 right-6 bg-white rounded-2xl px-6 py-5 shadow-lg border border-[#EDD0C0] hidden md:block"
            style={{ animation: "float 4s ease-in-out infinite, fade-in 0.7s ease 1s both" }}
          >
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {["1580489944761-8d5a6e2f1a58", "1531746020798-e6953c6e8e04", "1438761681033-6461ffad8d80"].map((id) => (
                  <div key={id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image
                      src={`https://images.unsplash.com/photo-${id}?w=64&q=80&auto=format&fit=crop&crop=faces`}
                      alt="Happy client"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                ))}
              </div>
              <p className="text-2xl font-bold text-[#2D1912]" style={{ fontFamily: "var(--font-serif)" }}>500+</p>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#896B5E]">Happy Clients</p>
            <div className="flex items-center gap-1.5 mt-2">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-3 h-3 fill-[#E8A060]" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <p className="text-[11px] text-[#896B5E] ml-1">4.9 · 200+ Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="border-t border-[#EDD0C0] bg-[#FAF5F0] py-5 overflow-hidden">
        <div className="flex w-max" style={{ animation: "marquee 28s linear infinite" }}>
          {[...services, ...services].map((s, i) => (
            <span key={i} className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-[#896B5E] px-8 whitespace-nowrap">
              {s}
              <span className="text-[#C8705A]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

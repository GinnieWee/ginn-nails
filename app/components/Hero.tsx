import Image from "next/image";

const services = ["Gel Manicure", "Nail Extension", "Nail Art", "Gel Pedicure", "Spa Treatment", "Swarovski", "Art Design", "Callus Treatment"];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-[#FAF7F2] pt-20 overflow-hidden">
      {/* Main hero */}
      <div className="max-w-5xl mx-auto px-6 w-full py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left — staggered text entrance */}
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.35em] text-[#C9A09A] mb-8"
            style={{ animation: "fade-up 0.6s ease 0.1s both" }}
          >
            Nail Artist &nbsp;·&nbsp; Kuala Lumpur
          </p>
          <h1
            className="text-[3.5rem] md:text-[4.5rem] font-bold leading-[1.05] text-[#3D2B20] mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="block" style={{ animation: "fade-up 0.7s ease 0.2s both" }}>
              Your Dream
            </span>
            <span
              className="block italic text-[#C9A09A]"
              style={{ animation: "fade-up 0.7s ease 0.35s both" }}
            >
              Nails
            </span>
            <span className="block" style={{ animation: "fade-up 0.7s ease 0.5s both" }}>
              Start Here.
            </span>
          </h1>
          <div
            className="w-10 h-px bg-[#C9A09A] mb-8"
            style={{ animation: "fade-in 0.8s ease 0.65s both" }}
          />
          <p
            className="text-base text-[#6B4C40] leading-relaxed mb-10 max-w-sm"
            style={{ animation: "fade-up 0.7s ease 0.7s both" }}
          >
            The nail appointment you&apos;ve been waiting for. Sit back, pick your design, and let us take care of the rest.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{ animation: "fade-up 0.7s ease 0.85s both" }}
          >
            <a
              href="#contact"
              className="btn-shimmer inline-flex items-center justify-center px-8 py-3.5 rounded-full text-[#FAF7F2] text-xs tracking-[0.15em] uppercase"
            >
              Book an Appointment
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#3D2B20]/30 text-[#3D2B20] text-xs tracking-[0.15em] uppercase hover:border-[#C9A09A] hover:text-[#C9A09A] transition-colors duration-300"
            >
              View Prices
            </a>
          </div>
        </div>

        {/* Right — photo card slides in, badge floats */}
        <div
          className="relative flex justify-end"
          style={{ animation: "slide-in-right 0.9s ease 0.4s both" }}
        >
          {/* Main photo card */}
          <div className="w-72 h-[420px] rounded-3xl overflow-hidden relative shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=85&auto=format&fit=crop"
              alt="Beautiful gel manicure"
              fill
              className="object-cover"
              priority
              sizes="288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B20]/70 via-transparent to-transparent flex flex-col justify-end p-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#FAF7F2]/80 mb-1">Le Ginn&apos;s Nails</p>
              <p className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                Nail Artist
              </p>
            </div>
          </div>

          {/* Floating stat badge */}
          <div
            className="absolute top-8 -left-6 bg-white rounded-2xl px-5 py-4 shadow-sm border border-[#E8D5D0]"
            style={{ animation: "float 4s ease-in-out infinite, fade-in 0.6s ease 1s both" }}
          >
            <p className="text-[10px] uppercase tracking-widest text-[#8C7B74] mb-1">Happy clients</p>
            <p className="text-3xl font-bold text-[#3D2B20]" style={{ fontFamily: "var(--font-serif)" }}>500+</p>
          </div>

          {/* IG badge — delayed float */}
          <div
            className="absolute -bottom-4 -left-4 bg-[#3D2B20] rounded-2xl px-5 py-4"
            style={{ animation: "float 4s ease-in-out 2s infinite, fade-in 0.6s ease 1.1s both" }}
          >
            <p className="text-[10px] uppercase tracking-widest text-[#C9A09A] mb-1">IG</p>
            <p className="text-sm font-medium text-white">@ginn.nails</p>
          </div>
        </div>
      </div>

      {/* Auto-scrolling marquee strip */}
      <div className="border-t border-[#E8D5D0] py-5 overflow-hidden">
        <div className="flex w-max" style={{ animation: "marquee 28s linear infinite" }}>
          {[...services, ...services].map((s, i) => (
            <span key={i} className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-[#8C7B74] px-8 whitespace-nowrap">
              {s}
              <span className="text-[#C9A09A]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

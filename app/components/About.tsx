import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const highlights = [
  { label: "500+", desc: "Happy Clients" },
  { label: "5★", desc: "Average Rating" },
  { label: "3+", desc: "Years Experience" },
  { label: "100%", desc: "Cruelty-Free Products" },
];

export default function About() {
  return (
    <section id="about" className="bg-[#3D2B20] py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — image */}
          <ScrollReveal>
            <div className="relative">
              <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=85&auto=format&fit=crop"
                  alt="Le Ginn's Nails studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating tag */}
              <div className="absolute -bottom-5 -right-5 bg-[#FAF7F2] rounded-2xl px-6 py-4 shadow-lg">
                <p className="text-[10px] uppercase tracking-widest text-[#8C7B74] mb-1">Est.</p>
                <p className="text-2xl font-bold text-[#3D2B20]" style={{ fontFamily: "var(--font-serif)" }}>2022</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — text */}
          <ScrollReveal variant="right">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A09A] mb-4">Our Story</p>
            <h2 className="text-4xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              A quiet studio<br />
              <span className="italic text-[#C9A09A]">built for you</span>
            </h2>
            <p className="text-sm text-[#8C7B74] leading-relaxed mb-5">
              Le Ginn&apos;s Nails started with a simple belief — every person deserves to feel beautiful, cared for, and unhurried. We created a calm, intimate space where nail craft meets genuine care.
            </p>
            <p className="text-sm text-[#8C7B74] leading-relaxed mb-10">
              Every visit is personal. We take the time to understand what you want, use quality products, and make sure you leave loving your nails. No rush, no compromise.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5">
              {highlights.map((h) => (
                <div key={h.label} className="bg-[#4A3728] rounded-2xl px-5 py-4">
                  <p className="text-2xl font-bold text-[#C9A09A]" style={{ fontFamily: "var(--font-serif)" }}>{h.label}</p>
                  <p className="text-xs text-[#8C7B74] mt-1 uppercase tracking-wider">{h.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

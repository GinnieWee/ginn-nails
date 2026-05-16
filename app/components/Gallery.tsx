import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const photos = [
  { id: "1604654894610-df63bc536371", alt: "Gel manicure close-up" },
  { id: "1632345031435-8727f6897d53", alt: "Nail art design" },
  { id: "1610992015762-45dca7fa3a85", alt: "Pink manicure" },
  { id: "1612887390768-fb02affea7a6", alt: "Nail extension" },
  { id: "1607779097040-26e80aa78e66", alt: "Nail art detail" },
  { id: "1519014816548-bf5fe059798b", alt: "Beautiful manicure" },
];

export default function Gallery() {
  return (
    <section className="bg-[#FAF7F2] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8C7B74] mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3D2B20] leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Our work,<br /><span className="italic text-[#C9A09A]">up close</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="right">
            <a
              href="https://www.instagram.com/ginn.nails"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B4C40] hover:text-[#C9A09A] transition-colors"
            >
              See more on Instagram
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Tall left */}
          <ScrollReveal className="row-span-2" variant="scale" delay={0}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-full min-h-[480px]">
              <Image
                src={`https://images.unsplash.com/photo-${photos[0].id}?w=600&q=80&auto=format&fit=crop`}
                alt={photos[0].alt} fill className="object-cover" sizes="33vw"
              />
            </div>
          </ScrollReveal>

          {/* Top right 1 */}
          <ScrollReveal variant="scale" delay={100}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image
                src={`https://images.unsplash.com/photo-${photos[1].id}?w=600&q=80&auto=format&fit=crop`}
                alt={photos[1].alt} fill className="object-cover" sizes="33vw"
              />
            </div>
          </ScrollReveal>

          {/* Top right 2 */}
          <ScrollReveal variant="scale" delay={200}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image
                src={`https://images.unsplash.com/photo-${photos[2].id}?w=600&q=80&auto=format&fit=crop`}
                alt={photos[2].alt} fill className="object-cover" sizes="33vw"
              />
            </div>
          </ScrollReveal>

          {/* Bottom right 1 */}
          <ScrollReveal variant="scale" delay={300}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image
                src={`https://images.unsplash.com/photo-${photos[4].id}?w=600&q=80&auto=format&fit=crop`}
                alt={photos[4].alt} fill className="object-cover" sizes="33vw"
              />
            </div>
          </ScrollReveal>

          {/* Bottom right 2 */}
          <ScrollReveal variant="scale" delay={400}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image
                src={`https://images.unsplash.com/photo-${photos[5].id}?w=600&q=80&auto=format&fit=crop`}
                alt={photos[5].alt} fill className="object-cover" sizes="33vw"
              />
            </div>
          </ScrollReveal>

          {/* Full-width CTA banner */}
          <ScrollReveal className="col-span-2 md:col-span-3" delay={200}>
            <div className="gallery-img relative overflow-hidden rounded-2xl h-[200px] bg-[#E8D5D0]">
              <Image
                src={`https://images.unsplash.com/photo-${photos[3].id}?w=1200&q=80&auto=format&fit=crop`}
                alt={photos[3].alt} fill className="object-cover object-center" sizes="100vw"
              />
              <div className="absolute inset-0 bg-[#3D2B20]/40 flex items-center justify-center">
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-full border border-white text-white text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#3D2B20] transition-all duration-300 hover:scale-105"
                >
                  Book Your Visit
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

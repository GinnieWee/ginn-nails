import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const photos = [
  { src: "/portfolio/nail-6.jpg",  alt: "Floral rose nail art with Swarovski" },
  { src: "/portfolio/nail-7.jpg",  alt: "Glitter citrus nail art" },
  { src: "/portfolio/nail-8.jpg",  alt: "Crystal glitter stiletto nails" },
  { src: "/portfolio/nail-9.jpg",  alt: "Elegant nail art design" },
  { src: "/portfolio/nail-10.jpg", alt: "Delicate nail art" },
  { src: "/portfolio/nail-1.jpg",  alt: "Classic gel manicure" },
  { src: "/portfolio/nail-2.jpg",  alt: "Soft nail design" },
  { src: "/portfolio/nail-3.jpg",  alt: "Artistic nail design" },
  { src: "/portfolio/nail-4.jpg",  alt: "Elegant nail extension" },
  { src: "/portfolio/nail-5.jpg",  alt: "Premium nail art" },
];


export default function Gallery() {
  return (
    <section id="designs" className="bg-[#FAF7F2] py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8C7B74] mb-4">Portfolio</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#3D2B20] leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Our work,<br />
              <span className="italic text-[#C9A09A]">up close</span>
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

        {/* 3-column masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

          {/* Row 1: tall left + 2 square right */}
          <ScrollReveal className="row-span-2" variant="scale" delay={0}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-full min-h-[480px]">
              <Image src={photos[0].src} alt={photos[0].alt} fill
                className="object-cover object-top"
sizes="33vw" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={100}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[1].src} alt={photos[1].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={200}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[2].src} alt={photos[2].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={300}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[3].src} alt={photos[3].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={400}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[4].src} alt={photos[4].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          {/* Row 2: 3 uniform squares */}
          <ScrollReveal variant="scale" delay={100}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[5].src} alt={photos[5].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={200}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[6].src} alt={photos[6].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={300}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[7].src} alt={photos[7].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={100}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[8].src} alt={photos[8].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={200}>
            <div className="gallery-img relative overflow-hidden rounded-2xl bg-[#E8D5D0] h-[230px]">
              <Image src={photos[9].src} alt={photos[9].alt} fill
                className="object-cover"
sizes="33vw" />
            </div>
          </ScrollReveal>

          {/* Full-width Book CTA banner */}
          <ScrollReveal className="col-span-2 md:col-span-3" delay={200}>
            <div className="relative overflow-hidden rounded-2xl h-[120px] bg-[#3D2B20] flex items-center justify-center">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #C9A09A 0%, transparent 60%), radial-gradient(circle at 70% 50%, #8C7B74 0%, transparent 60%)" }}
              />
              <div className="relative flex flex-col sm:flex-row items-center gap-5">
                <p className="text-[#E8D5D0] text-sm tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
                  Love what you see? Let&apos;s create your dream nails.
                </p>
                <a
                  href="#contact"
                  className="px-7 py-2.5 rounded-full border border-[#C9A09A] text-[#C9A09A] text-xs uppercase tracking-[0.2em] hover:bg-[#C9A09A] hover:text-white transition-all duration-300 hover:scale-105 shrink-0"
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

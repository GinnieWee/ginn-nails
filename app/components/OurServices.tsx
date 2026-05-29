import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: "💅",
    title: "Gel Manicure",
    description: "Long-lasting gel polish with a mirror-finish shine. Chip-free for weeks.",
  },
  {
    icon: "🦶",
    title: "Gel Pedicure",
    description: "Gel polish treatment for beautiful, chip-free toes with a luxe finish.",
  },
  {
    icon: "✨",
    title: "Nail Extension",
    description: "Full set of acrylic or soft gel extensions tailored to your style.",
  },
  {
    icon: "🎨",
    title: "Nail Art & Design",
    description: "From minimalist lines to intricate floral art — every nail a canvas.",
  },
  {
    icon: "💎",
    title: "Accessories & Swarovski",
    description: "Charms, studs, and premium crystal embellishments for a luxe finish.",
  },
  {
    icon: "🌿",
    title: "Pedi Callus Treatment",
    description: "Spa soak, callus removal, organic scrub, whitening mask & more.",
  },
];

export default function OurServices() {
  return (
    <section id="services" className="bg-[#F0EAE0] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A09A] mb-3">What We Offer</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#3D2B20] leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Our <span className="italic text-[#C9A09A]">Services</span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-0.5 bg-[#C9A09A]" />
          <p className="mt-5 text-sm text-[#6B4C40] max-w-md mx-auto leading-relaxed">
            Everything you need for beautiful, healthy nails — crafted with care and precision.
          </p>
        </ScrollReveal>

        {/* Service cards grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <ScrollReveal
              key={svc.title}
              delay={((i % 3) * 100) as 0 | 100 | 200 | 300 | 400 | 500 | 600}
              variant="scale"
            >
              <div className="group bg-[#FAF7F2] rounded-2xl p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-full bg-[#E8D5D0] flex items-center justify-center text-2xl shrink-0">
                  {svc.icon}
                </div>
                <div>
                  <h3
                    className="font-semibold text-[#3D2B20] text-base mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-sm text-[#6B4C40] leading-relaxed">{svc.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA link to price list */}
        <ScrollReveal className="mt-12 text-center">
          <a
            href="#pricelist"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B4C40] hover:text-[#C9A09A] transition-colors"
          >
            See full price list
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const serviceCards = [
  {
    name: "Gel Manicure",
    description: "Long-lasting shine with chip-free colour that stays perfect for weeks.",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Nail Extension",
    description: "Add length and shape with elegant acrylic or soft-gel extensions.",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&auto=format&fit=crop&crop=top",
  },
  {
    name: "Nail Art",
    description: "Hand-painted designs from minimalist florals to intricate patterns.",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&auto=format&fit=crop&crop=bottom",
  },
  {
    name: "Pedicure",
    description: "Relaxing care for soft, healthy feet — gel polish or classic finish.",
    img: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Callus Treatment",
    description: "Spa soak · callus removal · leg scrub · whitening mask · lotion.",
    img: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400&q=80&auto=format&fit=crop&crop=top",
  },
  {
    name: "Swarovski & Accessories",
    description: "Premium crystals, charms and decorative accents for a luxe finish.",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&auto=format&fit=crop&crop=faces",
  },
];

const categories = [
  {
    category: "Mani & Pedi",
    items: [
      { name: "Gel Manicure", description: "Long-lasting gel polish with a mirror-finish shine.", price: "RM78" },
      { name: "Gel Pedicure", description: "Gel polish treatment for beautiful, chip-free toes.", price: "RM88" },
      { name: "Nail Extension", description: "Full set of acrylic or soft gel extensions.", price: "RM150" },
      { name: "Nail Extension (Per Nail)", description: "Single nail extension or repair.", price: "RM15" },
      { name: "Refilling Extension", description: "Infill and refresh your existing extensions.", price: "RM90" },
      { name: "Only Remove (Our Shop)", description: "Gentle removal of nails done at our studio.", price: "RM10" },
      { name: "Remove (Own Nail) Other Shop", description: "Safe removal of gel done at another salon.", price: "RM20" },
      { name: "Remove Extension Other Shop", description: "Safe removal of extensions from another salon.", price: "RM30" },
      { name: "Art Design", description: "Minimalist to intricate nail art, priced per design.", price: "RM3–9" },
      { name: "Accessories", description: "Charms, studs, and decorative accents.", price: "RM3–15" },
      { name: "Swarovski", description: "Premium crystal embellishments for a luxe finish.", price: "RM5–25" },
    ],
  },
  {
    category: "Treatment",
    items: [
      {
        name: "Pedi Callus Treatment",
        description: "Spa soak · softener · machine callus removal · organic leg scrub · whitening mask · nail trim · lotion",
        price: "RM68",
      },
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#F0EAE0] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A09A] mb-3">What We Offer</p>
          <h2 className="text-4xl font-bold text-[#3D2B20]" style={{ fontFamily: "var(--font-serif)" }}>
            Our Services
          </h2>
          <div className="mt-4 mx-auto w-12 h-0.5 bg-[#C9A09A]" />
        </ScrollReveal>

        {/* Intro paragraph */}
        <ScrollReveal className="mb-14 text-center max-w-xl mx-auto">
          <p className="text-sm text-[#6B4C40] leading-relaxed">
            From everyday gel polish to intricate nail art and spa treatments — everything is done with care, precision, and a personal touch. Pick a service below and let us do the rest.
          </p>
        </ScrollReveal>

        {/* Service photo cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-20">
          {serviceCards.map((card, i) => (
            <ScrollReveal key={card.name} delay={((i % 3) * 100) as 0 | 100 | 200}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={card.img}
                  alt={card.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B20]/80 via-[#3D2B20]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>{card.name}</p>
                  <p className="text-[11px] text-[#E8D5D0] mt-1 leading-relaxed">{card.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Price list header */}
        <ScrollReveal className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A09A] mb-3">Transparent Pricing</p>
          <h3 className="text-3xl font-bold text-[#3D2B20]" style={{ fontFamily: "var(--font-serif)" }}>
            Price List
          </h3>
          <div className="mt-4 mx-auto w-12 h-0.5 bg-[#C9A09A]" />
        </ScrollReveal>

        <div className="flex flex-col gap-14">
          {categories.map((cat) => (
            <div key={cat.category}>
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-2xl text-[#3D2B20] italic" style={{ fontFamily: "var(--font-serif)" }}>
                    {cat.category}
                  </h3>
                  <div className="flex-1 h-px bg-[#C9A09A]/40" />
                </div>
              </ScrollReveal>

              <div className="flex flex-col gap-3">
                {cat.items.map((item, i) => (
                  <ScrollReveal key={item.name} delay={((i % 4) * 100) as 0 | 100 | 200 | 300}>
                    <div className="bg-[#FAF7F2] rounded-xl px-6 py-4 flex items-start justify-between gap-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex-1">
                        <p className="font-semibold text-[#3D2B20] text-sm">{item.name}</p>
                        <p className="text-xs text-[#8C7B74] mt-1 leading-relaxed">{item.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#A0706A] whitespace-nowrap shrink-0">{item.price}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <ScrollReveal className="mt-10 text-center">
          <p className="text-xs text-[#8C7B74] tracking-wide">Prices are subject to change. Contact us for a personalised quote.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

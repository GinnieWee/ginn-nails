import ScrollReveal from "./ScrollReveal";

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
    <section id="pricelist" className="bg-[#F0EAE0] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A09A] mb-3">Transparent Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#3D2B20]" style={{ fontFamily: "var(--font-serif)" }}>
            Price <span className="italic text-[#C9A09A]">List</span>
          </h2>
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

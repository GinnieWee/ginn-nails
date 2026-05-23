import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    number: "01",
    title: "Crafted with care",
    description: "Every set is done with patience and precision — no rushing, no shortcuts. Your nails deserve real attention.",
  },
  {
    number: "02",
    title: "Clean & safe",
    description: "We sterilise all tools between every client. The studio is always fresh, calm, and spotlessly clean.",
  },
  {
    number: "03",
    title: "Just for you",
    description: "Small studio, personal service. We listen to what you want and make sure you leave happy every time.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-[#3D2B20] py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[#FAF7F2] leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Why clients<br />
              <span className="italic text-[#C9A09A]">keep coming back</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="right">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A09A] hover:text-[#E8D5D0] transition-colors shrink-0"
            >
              Book now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#4A3728]">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.number} delay={(i * 200) as 0 | 200 | 400}>
              <div className="bg-[#3D2B20] p-8 md:p-10 h-full hover:bg-[#4A3728] transition-colors duration-300">
                <p className="text-xs text-[#C9A09A] tracking-[0.3em] mb-6">{p.number}</p>
                <h3 className="text-xl font-semibold text-[#FAF7F2] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                  {p.title}
                </h3>
                <p className="text-sm text-[#8C7B74] leading-relaxed">{p.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

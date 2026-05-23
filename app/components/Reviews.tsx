import ScrollReveal from "./ScrollReveal";

const reviews = [
  {
    name: "Ploy S.",
    date: "March 2025",
    rating: 5,
    text: "I've been coming to Ginn Nails for six months and the quality is consistently amazing. The staff remember my preferences and the studio always feels so calm and clean.",
  },
  {
    name: "Mink T.",
    date: "April 2025",
    rating: 5,
    text: "The gel manicure lasted over three weeks without a single chip. The nail art options are beautiful — they did a delicate floral design that got so many compliments.",
  },
  {
    name: "Nam W.",
    date: "May 2025",
    rating: 5,
    text: "Such a peaceful atmosphere. I came in stressed from work and left feeling completely refreshed. The spa treatment is a must-try — my hands felt so soft afterward.",
  },
];

function StarIcon() {
  return (
    <svg className="w-3 h-3 fill-[#C8705A]" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-[#FAF5F0] py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#896B5E] mb-4">Client Stories</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D1912] leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              What they<br />
              <span className="italic text-[#C8705A]">say about us</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="right">
            <div className="text-right">
              <p className="text-3xl font-bold text-[#2D1912]" style={{ fontFamily: "var(--font-serif)" }}>5.0</p>
              <div className="flex gap-0.5 justify-end mt-1">{[1,2,3,4,5].map(i=><StarIcon key={i}/>)}</div>
              <p className="text-[10px] text-[#896B5E] mt-1 tracking-wider uppercase">Average rating</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={((i * 200)) as 0 | 200 | 400} variant="scale">
              <div
                className={`rounded-2xl p-8 flex flex-col gap-6 h-full hover:shadow-lg transition-shadow duration-300 ${
                  i === 1 ? "bg-[#2D1912] text-[#FAF5F0]" : "bg-[#F5ECE4] text-[#2D1912]"
                }`}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className={`text-sm leading-relaxed flex-1 ${i === 1 ? "text-[#EDD0C0]" : "text-[#5A3828]"}`}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className={`flex items-center gap-3 pt-5 border-t ${i === 1 ? "border-[#3A2216]" : "border-[#EDD0C0]"}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${
                    i === 1 ? "bg-[#3A2216] text-[#C8705A]" : "bg-[#EDD0C0] text-[#A8522E]"
                  }`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-[10px] tracking-wider uppercase text-[#896B5E]">{review.date}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

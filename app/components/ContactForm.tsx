"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

const SERVICES = [
  "Gel Manicure — RM78",
  "Gel Pedicure — RM88",
  "Nail Extension (Full Set) — RM150",
  "Nail Extension (Per Nail) — RM15",
  "Refilling Extension — RM90",
  "Art Design — RM3–9",
  "Accessories — RM3–15",
  "Swarovski — RM5–25",
  "Remove (Our Shop) — RM10",
  "Remove (Other Shop) — RM20",
  "Remove Extension (Other Shop) — RM30",
  "Pedi Callus Treatment — RM68",
];

const TIMES = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", phone: "", service: "", date: "", time: "", notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nail  = String.fromCodePoint(0x1F485); // 💅
    const spark = String.fromCodePoint(0x2728);  // ✨
    const msg = [
      `Hi Le Ginn's Nails! ${nail}${spark}`,
      ``,
      `Name: ${form.name}`,
      `Contact Number: ${form.phone}`,
      `Preferred Branch: Raub, Pahang`,
      `Preferred Date: ${form.date}`,
      `Preferred Time: ${form.time}`,
      `Service / Nail Design: ${form.service}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/601125784475?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[#E8D5D0] bg-white px-4 py-3 text-sm text-[#3D2B20] placeholder-[#8C7B74] focus:outline-none focus:border-[#C9A09A] focus:ring-1 focus:ring-[#C9A09A] transition";

  return (
    <section id="contact" className="bg-[#F0EAE0] py-24">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* Left: Photo card + info */}
        <div className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#C9A09A]">Book an Appointment</p>
          <h2
            className="text-4xl font-bold text-[#3D2B20]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Confirm Your<br />
            <span className="italic text-[#C9A09A]">Details</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A09A]" />

          {/* Photo with overlaid contact info */}
          <div className="relative rounded-2xl overflow-hidden h-[340px]">
            <Image
              src="/portfolio/nail-6.jpg"
              alt="Le Ginn's Nails portfolio"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B20]/90 via-[#3D2B20]/30 to-transparent" />

            {/* Contact info overlaid on photo */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#E8D5D0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs leading-tight">No.127 Lorong Bukit Idaman 3, Taman Bukit Idaman, 27600 Raub, Pahang</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#E8D5D0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs">+60 11 2578 4475</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#E8D5D0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs">Mon–Sat 10am–8pm &nbsp;·&nbsp; Sun 11am–6pm</span>
              </div>
            </div>
          </div>

          <p className="text-[#6B4C40] text-sm leading-relaxed">
            Fill in your details and hit <strong>Confirm on WhatsApp</strong> — we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Right: Booking Form */}
        <div className="bg-white rounded-2xl p-8 border border-[#E8D5D0]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8C7B74] mb-5">Booking Details</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Your Name *</label>
                <input
                  type="text" name="name" required
                  placeholder="e.g. Ginnie"
                  value={form.name} onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">WhatsApp No. *</label>
                <input
                  type="tel" name="phone" required
                  placeholder="e.g. 011-2578 4475"
                  value={form.phone} onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Service / Nail Design *</label>
              <select
                name="service" required
                value={form.service} onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Select a service...</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Date + Time */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Preferred Date *</label>
                <input
                  type="date" name="date" required
                  value={form.date} onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Preferred Time *</label>
                <select
                  name="time" required
                  value={form.time} onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">Select time...</option>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Special Requests <span className="text-[#8C7B74] font-normal">(optional)</span></label>
              <textarea
                name="notes" rows={3}
                placeholder="Any design inspo, allergies, or notes for us?"
                value={form.notes} onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit → opens WhatsApp */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#25D366] text-white text-sm font-medium tracking-wide hover:bg-[#1ebe5d] hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-1 flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Confirm Booking on WhatsApp
            </button>

            <p className="text-center text-[10px] text-[#8C7B74] tracking-wide">
              Opens WhatsApp with your details pre-filled. Hit send — then attach your reference photo if you have one 😊
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}

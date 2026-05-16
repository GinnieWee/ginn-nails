"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-xl border border-[#E8D5D0] bg-white px-4 py-3 text-sm text-[#3D2B20] placeholder-[#8C7B74] focus:outline-none focus:border-[#C9A09A] focus:ring-1 focus:ring-[#C9A09A] transition";

  return (
    <section id="contact" className="bg-[#F0EAE0] py-24">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#C9A09A] mb-3">Get in Touch</p>
          <h2
            className="text-4xl font-bold text-[#3D2B20] mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Book Your <br />Appointment
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A09A] mb-8" />
          <p className="text-[#6B4C40] text-sm leading-relaxed mb-10">
            Fill in the form and we&apos;ll get back to you within 24 hours to confirm your booking. We look forward to seeing you.
          </p>

          {/* Info blocks */}
          <div className="flex flex-col gap-5 text-sm text-[#6B4C40]">
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#E8D5D0] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-[#A0706A]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#3D2B20] mb-0.5">Location</p>
                <p>123 Beauty Lane, Sukhumvit<br />Bangkok 10110</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#E8D5D0] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-[#A0706A]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#3D2B20] mb-0.5">Phone</p>
                <p>+66 81 234 5678</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#E8D5D0] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-[#A0706A]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#3D2B20] mb-0.5">Hours</p>
                <p>Mon – Sat: 10:00 AM – 8:00 PM<br />Sunday: 11:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-2xl p-8 border border-[#E8D5D0]">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-[#E8D5D0] flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#A0706A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#3D2B20]" style={{ fontFamily: "var(--font-serif)" }}>
                Thank you, {form.name}!
              </h3>
              <p className="text-sm text-[#6B4C40]">
                We&apos;ve received your message and will be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#6B4C40] mb-1.5 block">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Which service are you interested in? Any preferred date or time?"
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#C9A09A] text-white text-sm tracking-wide hover:bg-[#A0706A] transition-colors mt-2"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

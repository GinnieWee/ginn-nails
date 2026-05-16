"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  variant?: "up" | "right" | "scale";
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600;
  threshold?: number;
}

const variantClass = {
  up: "reveal",
  right: "reveal-right",
  scale: "reveal-scale",
};

const delayClass: Record<number, string> = {
  0: "",
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
  600: "delay-600",
};

export default function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${variantClass[variant]} ${delayClass[delay]} ${className}`}
    >
      {children}
    </div>
  );
}

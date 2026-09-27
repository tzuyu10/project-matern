"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      className="mobile-back-to-top"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      })}
    >
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  );
}

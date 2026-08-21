import type { Config } from "tailwindcss";

/**
 * Design tokens. Everything visual — type scale, spacing rhythm, easing,
 * borders, shadows — is centralized here so sections stay consistent and a
 * change lands everywhere at once.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "redemption-red": "#C32C26",
        "restoration-red-dark": "#A91E23",
        "heritage-black": "#0B0D0E",
        "clean-white": "#FFFFFF",
        "steel-gray": "#605F5D",
        "warm-concrete": "#E5E1DE",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
        condensed: ["var(--font-pt-sans-narrow)", "Arial Narrow", "sans-serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial scale. Hero reaches ~110px at 1920, floors at 40px.
        hero: ["clamp(2.5rem, 6.2vw, 6.875rem)", { lineHeight: "0.96", letterSpacing: "-0.02em" }],
        "section-xl": ["clamp(2rem, 4.4vw, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        section: ["clamp(1.75rem, 3.2vw, 3.25rem)", { lineHeight: "1.06", letterSpacing: "-0.01em" }],
        subhead: ["clamp(1.375rem, 1.9vw, 2.375rem)", { lineHeight: "1.18" }],
        "body-lg": ["clamp(1.0625rem, 1.05vw, 1.3125rem)", { lineHeight: "1.62" }],
        "body-base": ["clamp(1rem, 0.85vw, 1.125rem)", { lineHeight: "1.65" }],
        label: ["clamp(0.8125rem, 0.72vw, 0.9375rem)", { lineHeight: "1.3", letterSpacing: "0.18em" }],
        // Oversized numerals for process steps and stat-style callouts
        numeral: ["clamp(3rem, 5.5vw, 6rem)", { lineHeight: "0.86", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        content: "1440px",
        measure: "34rem", // ~58 characters at body size
        "measure-lg": "40rem", // ~68 characters
      },
      spacing: {
        // Section rhythm — used as py-section etc.
        section: "clamp(4rem, 7vw, 8.5rem)",
        "section-lg": "clamp(5.5rem, 10vw, 12rem)",
        gutter: "clamp(1rem, 4vw, 4rem)",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(11,13,14,0.06), 0 12px 32px -12px rgba(11,13,14,0.28)",
        lift: "0 24px 60px -24px rgba(11,13,14,0.45)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        micro: "220ms",
        standard: "460ms",
        reveal: "760ms",
      },
      aspectRatio: {
        editorial: "3 / 2",
        portrait: "4 / 5",
        panel: "16 / 10",
      },
    },
  },
  plugins: [],
};

export default config;

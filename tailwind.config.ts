import type { Config } from "tailwindcss";

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
        display: ["var(--font-oswald)", "sans-serif"],
        condensed: ["var(--font-pt-sans-narrow)", "sans-serif"],
        body: ["var(--font-source-sans)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,13,14,0.08), 0 4px 12px rgba(11,13,14,0.06)",
      },
      keyframes: {
        "underline-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "underline-grow": "underline-grow 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;

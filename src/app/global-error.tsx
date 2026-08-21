"use client";

import { business } from "@/content/business";

/**
 * Last-resort boundary for a failure in the root layout itself. Next replaces
 * the entire document here, so this file must render its own <html> and
 * <body> — the layout's fonts and globals.css are not applied.
 *
 * Styling is therefore inline and dependency-free on purpose: if the root
 * layout just failed, anything that relies on it is not trustworthy. Brand
 * hex values are duplicated from tailwind.config.ts for that reason, and this
 * is the only place in the codebase where that duplication is acceptable.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "#FFFFFF",
          color: "#0B0D0E",
          fontFamily: "system-ui, -apple-system, Segoe UI, Arial, sans-serif",
        }}
      >
        <main style={{ maxWidth: "40rem", padding: "3rem 1.5rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#A91E23",
            }}
          >
            Something went wrong
          </p>
          <h1 style={{ margin: "1rem 0 0", fontSize: "2rem", lineHeight: 1.1 }}>
            {business.name} is temporarily unavailable.
          </h1>
          <p style={{ margin: "1.25rem 0 0", fontSize: "1.0625rem", lineHeight: 1.6, color: "#605F5D" }}>
            We&apos;re working on it. In the meantime, call or text and we&apos;ll take your
            property details directly.
          </p>
          <p style={{ margin: "1.75rem 0 0" }}>
            <a
              href={`tel:${business.phoneHref}`}
              style={{
                display: "inline-block",
                padding: "0.875rem 1.5rem",
                background: "#C32C26",
                color: "#FFFFFF",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Call {business.phoneDisplay}
            </a>
          </p>
          <p style={{ margin: "1.5rem 0 0" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "0.75rem 1.25rem",
                border: "1px solid #0B0D0E",
                background: "transparent",
                color: "#0B0D0E",
                font: "inherit",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </p>
        </main>
      </body>
    </html>
  );
}

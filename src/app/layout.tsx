import type { Metadata } from "next";
import { oswald, ptSansNarrow, sourceSans } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SkipLink } from "@/components/layout/SkipLink";
import { Analytics } from "@/components/Analytics";
import { ConsentBanner } from "@/components/ConsentBanner";
import { StructuredData } from "@/components/StructuredData";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";
import { siteUrl } from "@/content/business";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Redemption Cleanout Services | Rochester, MI Property Cleanouts",
    template: "%s | Redemption Cleanout Services",
  },
  description:
    "Complete residential and commercial property cleanouts for estates, inherited homes, distressed properties, severe clutter, and time-sensitive real-estate transitions in Rochester, Michigan.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${ptSansNarrow.variable} ${sourceSans.variable}`}>
      <body>
        <StructuredData data={[organizationJsonLd(), websiteJsonLd()]} />
        <SkipLink />
        <UtilityBar />
        <Header />
        <main id="main-content" className="pb-16 sm:pb-0">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}

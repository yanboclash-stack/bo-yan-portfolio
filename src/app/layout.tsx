import type { Metadata, Viewport } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MouseGlow } from "@/components/motion-ui";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Bo Yan — Electrical Engineering", template: "%s — Bo Yan" },
  description: "Electrical engineering portfolio of Bo Yan: hardware, signal processing, projects, and experience.",
};

export const viewport: Viewport = { themeColor: "#071827", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <MouseGlow />
        <div className="site-noise" aria-hidden="true" />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

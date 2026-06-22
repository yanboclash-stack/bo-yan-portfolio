import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>Have a circuit, signal, or stubborn system to solve?</p>
        <Link href="mailto:boyan@ucdavis.edu">Let&apos;s talk <ArrowUpRight size={18} /></Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Bo Yan</span>
        <span>Designed with intent. Engineered for motion.</span>
        <span>Davis, CA · PST</span>
      </div>
    </footer>
  );
}

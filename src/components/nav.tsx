"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/experience", "Experience"],
  ["/projects", "Projects"],
  ["/coursework", "Coursework"],
  ["/contact", "Contact"],
] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="Bo Yan — home">
          <span className="brand-mark"><i /><i /><b>BY</b></span>
          <span className="brand-copy">BO YAN<small>Electrical Engineering</small></span>
        </Link>

        <div className="desktop-links">
          {links.map(([href, label]) => {
            const active = pathname === href;
            return (
              <Link className={active ? "nav-link active" : "nav-link"} href={href} key={href}>
                {label}
                {active && <motion.span layoutId="nav-indicator" className="nav-indicator" />}
              </Link>
            );
          })}
        </div>

        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {links.map(([href, label], index) => (
              <motion.div key={href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                <Link className={pathname === href ? "mobile-link active" : "mobile-link"} href={href} onClick={() => setOpen(false)}>
                  <span>0{index + 1}</span>{label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

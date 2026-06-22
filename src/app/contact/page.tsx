import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageIntro, Reveal } from "@/components/motion-ui";
import { profile } from "@/data/portfolio";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PageIntro>
      <section className="contact-hero page-width">
        <div className="page-kicker"><span>05</span> CONTACT</div>
        <h1>Let&apos;s build the<br /><em>next signal.</em></h1>
        <p>I’m interested in engineering internships and hands-on roles across hardware testing, RF, power, controls, automation, and product engineering.</p>
        <Link className="contact-email" href={`mailto:${profile.email}`}><span>{profile.email}</span><ArrowUpRight /></Link>
      </section>

      <section className="contact-grid page-width">
        <Reveal className="contact-card"><Mail/><span>EMAIL</span><Link href={`mailto:${profile.email}`}>{profile.email}</Link><p>Best for opportunities and project conversations.</p></Reveal>
        <Reveal className="contact-card" delay={.07}><Phone/><span>PHONE</span><Link href={`tel:${profile.phone.replaceAll("-", "")}`}>{profile.phone}</Link><p>Available for scheduled calls.</p></Reveal>
        <Reveal className="contact-card" delay={.14}><MapPin/><span>LOCATION</span><strong>{profile.location}</strong><p>Open to relocation for the right opportunity.</p></Reveal>
      </section>

      <section className="contact-status page-width">
        <Reveal>
          <span className="status-dot" />
          <div><small>CURRENT STATUS</small><h2>Open to engineering opportunities</h2></div>
          <p>Response time: typically within 1–2 days</p>
        </Reveal>
      </section>
    </PageIntro>
  );
}

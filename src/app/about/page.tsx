import Link from "next/link";
import { Download, MapPin } from "lucide-react";
import { PageIntro, Reveal } from "@/components/motion-ui";
import { profile, skillGroups } from "@/data/portfolio";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageIntro>
      <section className="page-hero page-width">
        <div className="page-kicker"><span>01</span> ABOUT</div>
        <h1>I like finding the point<br />where theory meets <em>resistance.</em></h1>
        <div className="page-hero-bottom">
          <p>{profile.summary}</p>
          <div className="location-chip"><MapPin size={15} /> {profile.location}</div>
        </div>
      </section>

      <section className="about-story page-width">
        <Reveal className="story-index"><span>MY APPROACH / 2026</span></Reveal>
        <Reveal className="story-copy">
          <p className="lead">I’m an Electrical Engineering student at UC Davis who learns best by making systems tangible.</p>
          <p>That means probing a circuit instead of guessing, tracing a signal through the full chain, and staying with a stubborn fault until the evidence makes sense. My experience spans circuit testing, hardware troubleshooting, simulation, signal processing, and programming.</p>
          <p>Work in HVAC taught me how electrical theory behaves in the real world: under time pressure, around safety constraints, and inside systems that must perform reliably. Academic projects let me bring that same practical mindset to robotics, audio compression, and connected applications.</p>
          <Link className="resume-link" href="/Bo_Yan_Resume.docx"><Download size={17} /> Download résumé</Link>
        </Reveal>
      </section>

      <section className="skills-section page-width">
        <Reveal className="section-heading compact">
          <div><span className="section-index">02</span><p>Technical toolkit</p></div>
          <h2>Skills across the<br /><em>signal chain.</em></h2>
        </Reveal>
        <div className="skill-stack">
          {skillGroups.map((group, index) => (
            <Reveal className="skill-row" key={group.label} delay={index * .06}>
              <div className="skill-label"><span>0{index + 1}</span><h3>{group.label}</h3></div>
              <div className="skill-content">
                <div className="skill-bar"><i style={{ width: `${group.value}%` }} /></div>
                <div className="skill-items">{group.items.map(item => <span key={item}>{item}</span>)}</div>
              </div>
              <strong>{group.value}</strong>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="education-band">
        <Reveal className="education-inner page-width">
          <div><span>EDUCATION</span><h2>University of California, Davis</h2><p>B.S. Electrical Engineering</p></div>
          <div className="grad-year"><small>EXPECTED</small><strong>2027</strong><p>June graduation</p></div>
        </Reveal>
      </section>
    </PageIntro>
  );
}

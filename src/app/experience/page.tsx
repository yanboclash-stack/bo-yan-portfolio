import { BriefcaseBusiness, CheckCircle2, Gauge, Users } from "lucide-react";
import { PageIntro, Reveal } from "@/components/motion-ui";
import { experience } from "@/data/portfolio";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <PageIntro>
      <section className="page-hero page-width">
        <div className="page-kicker"><span>02</span> EXPERIENCE</div>
        <h1>Engineering instincts,<br />shaped by <em>real work.</em></h1>
        <div className="page-hero-bottom"><p>From control boards to customer conversations, each role has sharpened the way I diagnose, communicate, and deliver.</p><div className="location-chip"><BriefcaseBusiness size={15} /> 4 roles · 5+ years</div></div>
      </section>

      <section className="timeline page-width">
        {experience.map((item, index) => (
          <Reveal className="timeline-row" key={`${item.role}-${item.period}`} delay={index * .07}>
            <div className="timeline-period"><span>{item.index}</span><p>{item.period}</p></div>
            <div className="timeline-node"><i /></div>
            <div className="timeline-body">
              <div><p className="company">{item.company}</p><h2>{item.role}</h2><span className="work-location">{item.location}</span></div>
              <p className="timeline-detail">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="lessons page-width">
        <Reveal className="section-heading compact"><div><span className="section-index">03</span><p>What the work taught me</p></div><h2>Transferable by<br /><em>design.</em></h2></Reveal>
        <div className="lesson-grid">
          <Reveal className="lesson-card"><Gauge/><span>01</span><h3>Diagnose with evidence</h3><p>Start with measurements, isolate variables, and let the system reveal the fault.</p></Reveal>
          <Reveal className="lesson-card" delay={.08}><CheckCircle2/><span>02</span><h3>Finish the loop</h3><p>A repair is not done until performance is verified and the result is documented.</p></Reveal>
          <Reveal className="lesson-card" delay={.16}><Users/><span>03</span><h3>Communicate clearly</h3><p>Good technical work includes explaining what changed, why it matters, and what comes next.</p></Reveal>
        </div>
      </section>
    </PageIntro>
  );
}

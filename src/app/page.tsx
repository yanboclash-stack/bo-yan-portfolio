import Link from "next/link";
import { ArrowDown, ArrowUpRight, Cpu, Radio, Wrench } from "lucide-react";
import { CircuitVisual } from "@/components/circuit-visual";
import { MagneticArrow, PageIntro, Reveal } from "@/components/motion-ui";
import { ProjectVisual } from "@/components/project-visual";
import { profile, projects } from "@/data/portfolio";

export default function Home() {
  return (
    <PageIntro>
      <section className="hero page-width">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" />Available for engineering opportunities</div>
          <h1>Signals<br /><em>into motion.</em></h1>
          <p className="hero-lede">{profile.summary}</p>
          <div className="hero-actions">
            <Link className="button primary" href="/projects">Explore my work <MagneticArrow /></Link>
            <Link className="button text-button" href="/about">More about me <ArrowUpRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-visual"><CircuitVisual /></div>
        <div className="hero-meta">
          <div><span>FIELD</span><strong>Electrical Engineering</strong></div>
          <div><span>BASED IN</span><strong>Davis, California</strong></div>
          <div><span>STATUS</span><strong>UC Davis · Class of 2027</strong></div>
        </div>
        <a className="scroll-cue" href="#selected"><ArrowDown size={16} /><span>SCROLL TO DISCOVER</span></a>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>HARDWARE <i/> SIGNAL PROCESSING <i/> EMBEDDED SYSTEMS <i/> DEBUGGING <i/> RF FUNDAMENTALS <i/> AUTOMATION <i/> HARDWARE <i/> SIGNAL PROCESSING <i/></div>
      </div>

      <section className="selected-work page-width" id="selected">
        <Reveal className="section-heading">
          <div><span className="section-index">01</span><p>Selected engineering work</p></div>
          <h2>Built to understand.<br />Tested to <em>work.</em></h2>
        </Reveal>
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal className="project-row" delay={index * .08} key={project.id}>
              <div className="project-number">/{project.id}</div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
              <ProjectVisual type={project.visual} />
              <Link className="round-link" href={`/projects#${project.slug}`} aria-label={`View ${project.title}`}><ArrowUpRight /></Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="capabilities page-width">
        <Reveal className="section-heading compact">
          <div><span className="section-index">02</span><p>How I work</p></div>
          <h2>One engineer.<br /><em>Multiple layers.</em></h2>
        </Reveal>
        <div className="capability-grid">
          <Reveal className="capability-card" delay={.05}><span>01</span><Wrench /><h3>Build</h3><p>Assembly, soldering, wiring, and practical system integration.</p></Reveal>
          <Reveal className="capability-card" delay={.12}><span>02</span><Radio /><h3>Measure</h3><p>Voltage, continuity, signals, performance, and careful documentation.</p></Reveal>
          <Reveal className="capability-card" delay={.19}><span>03</span><Cpu /><h3>Debug</h3><p>Structured troubleshooting across hardware, software, and their interface.</p></Reveal>
        </div>
      </section>

      <section className="home-cta page-width">
        <Reveal>
          <span className="cta-kicker">NEXT SIGNAL</span>
          <h2>Curious by nature.<br /><em>Practical by training.</em></h2>
          <div className="cta-row"><p>I’m looking for opportunities to learn fast, contribute early, and help turn ambitious engineering ideas into reliable systems.</p><Link className="button primary" href="/contact">Start a conversation <MagneticArrow /></Link></div>
        </Reveal>
      </section>
    </PageIntro>
  );
}

import { BookOpen, RadioTower, Sigma } from "lucide-react";
import { PageIntro, Reveal } from "@/components/motion-ui";
import { coursework } from "@/data/portfolio";

export const metadata = { title: "Coursework" };

export default function CourseworkPage() {
  return (
    <PageIntro>
      <section className="page-hero page-width">
        <div className="page-kicker"><span>04</span> COURSEWORK</div>
        <h1>Building depth from<br />circuits to <em>fields.</em></h1>
        <div className="page-hero-bottom"><p>My academic path connects the mathematical foundation of electrical engineering to increasingly physical, high-frequency systems.</p><div className="location-chip"><BookOpen size={15} /> UC Davis · B.S. EE</div></div>
      </section>

      <section className="learning-path page-width">
        <Reveal className="path-visual">
          <div className="path-grid" />
          <svg viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
            <path className="path-base" d="M0 180 C150 180 140 80 290 80 S420 175 560 120 S720 45 1000 45" />
            <path className="path-live" d="M0 180 C150 180 140 80 290 80 S420 175 560 120 S720 45 1000 45" />
          </svg>
          <span className="path-label p-start">FOUNDATION</span><span className="path-label p-mid">SIGNALS</span><span className="path-label p-end">RF / ANTENNAS</span>
        </Reveal>
      </section>

      <section className="course-groups page-width">
        <Reveal className="course-group">
          <div className="course-group-title"><span>01 / COMPLETED</span><Sigma /><h2>Core electrical engineering</h2></div>
          <div className="course-list">{coursework.completed.map((course, i) => <div key={course}><span>0{i + 1}</span><h3>{course}</h3><i>COMPLETE</i></div>)}</div>
        </Reveal>
        <Reveal className="course-group" delay={.08}>
          <div className="course-group-title"><span>02 / APPLIED</span><BookOpen /><h2>Working foundations</h2></div>
          <div className="course-list">{coursework.foundations.map((course, i) => <div key={course}><span>0{i + 1}</span><h3>{course}</h3><i>ACTIVE</i></div>)}</div>
        </Reveal>
        <Reveal className="course-group future" delay={.12}>
          <div className="course-group-title"><span>03 / NEXT</span><RadioTower /><h2>High-frequency direction</h2></div>
          <div className="course-list">{coursework.planned.map((course, i) => <div key={course}><span>0{i + 1}</span><h3>{course}</h3><i>PLANNED</i></div>)}</div>
        </Reveal>
      </section>
    </PageIntro>
  );
}

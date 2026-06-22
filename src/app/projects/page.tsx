import { ArrowDownRight } from "lucide-react";
import { PageIntro, Reveal } from "@/components/motion-ui";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/portfolio";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageIntro>
      <section className="page-hero page-width">
        <div className="page-kicker"><span>03</span> PROJECTS</div>
        <h1>Ideas become useful<br />when they survive <em>testing.</em></h1>
        <div className="page-hero-bottom"><p>Three projects, each exploring a different interface between signals, software, and physical behavior.</p><div className="location-chip"><ArrowDownRight size={15} /> Explore the builds</div></div>
      </section>

      <section className="project-detail-list page-width">
        {projects.map((project, index) => (
          <article className="project-detail" id={project.slug} key={project.id}>
            <Reveal className="project-detail-head">
              <div className="project-id">PROJECT / {project.id}</div>
              <h2>{project.title}</h2>
              <p>{project.subtitle}</p>
            </Reveal>
            <div className="project-detail-grid">
              <Reveal className="project-large-art"><ProjectVisual type={project.visual} /><span className="axis x-axis">X / {index + 1}</span><span className="axis y-axis">SIGNAL FLOW</span></Reveal>
              <Reveal className="project-narrative" delay={.08}>
                <div><span className="detail-label">THE BUILD</span><p>{project.description}</p></div>
                <div><span className="detail-label">THE RESULT</span><p>{project.outcome}</p></div>
                <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </Reveal>
            </div>
          </article>
        ))}
      </section>
    </PageIntro>
  );
}

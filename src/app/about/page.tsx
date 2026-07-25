export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="about-3d-shell" aria-label="Interactive 3D introduction">
      <iframe
        className="about-3d-frame"
        src="/about-3d/index.html?embed=1"
        title="Bo Yan interactive 3D introduction"
        loading="eager"
        allow="fullscreen"
      />
    </section>
  );
}

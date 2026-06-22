export function ProjectVisual({ type }: { type: "robot" | "wave" | "cloud" }) {
  if (type === "wave") {
    return (
      <div className="project-art wave-art" aria-hidden="true">
        {Array.from({ length: 34 }, (_, i) => <i key={i} style={{ height: `${18 + Math.abs(Math.sin(i * .62)) * 64}%`, animationDelay: `${i * -0.045}s` }} />)}
        <span className="art-code">DFT × DCT</span>
      </div>
    );
  }
  if (type === "cloud") {
    return (
      <div className="project-art cloud-art" aria-hidden="true">
        <span className="cloud-core">CLOUD<br/><b>SYNC</b></span>
        <i className="orbit o1" /><i className="orbit o2" /><i className="orbit o3" />
        <span className="packet p1" /><span className="packet p2" /><span className="packet p3" />
      </div>
    );
  }
  return (
    <div className="project-art robot-art" aria-hidden="true">
      <span className="sound-ring s1" /><span className="sound-ring s2" /><span className="sound-ring s3" />
      <div className="robot-body"><i/><i/><b>μC</b></div>
      <span className="wheel left" /><span className="wheel right" />
      <span className="target-dot" />
    </div>
  );
}

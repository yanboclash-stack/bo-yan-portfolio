"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ReactNode, useEffect, useRef } from "react";

type SceneProps = {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  align?: "left" | "right" | "center";
  first?: boolean;
  last?: boolean;
  label: string;
  number: string;
};

function JourneyScene({
  children,
  progress,
  range,
  align = "left",
  first = false,
  last = false,
  label,
  number,
}: SceneProps) {
  const [start, end] = range;
  const opacity = useTransform(
    progress,
    first
      ? [start, end - 0.045, end]
      : last
        ? [start, start + 0.05, end]
        : [start, start + 0.045, end - 0.045, end],
    first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    first
      ? [start, end - 0.055, end]
      : last
        ? [start, start + 0.06, end]
        : [start, start + 0.05, end - 0.055, end],
    first ? [1, 1.035, 1.3] : last ? [0.73, 1, 1.07] : [0.72, 1, 1.07, 1.3],
  );
  const y = useTransform(
    progress,
    first
      ? [start, end - 0.055, end]
      : last
        ? [start, start + 0.06, end]
        : [start, start + 0.05, end - 0.055, end],
    first ? [0, -8, -90] : last ? [90, 0, -18] : [90, 0, -24, -105],
  );
  const filter = useTransform(
    progress,
    first
      ? [start, end - 0.055, end]
      : last
        ? [start, start + 0.06, end]
        : [start, start + 0.05, end - 0.055, end],
    first
      ? ["blur(0px)", "blur(0px)", "blur(17px)"]
      : last
        ? ["blur(18px)", "blur(0px)", "blur(0px)"]
        : ["blur(18px)", "blur(0px)", "blur(1px)", "blur(18px)"],
  );
  const pointerEvents = useTransform(opacity, value => value > 0.55 ? "auto" : "none");

  return (
    <motion.section
      className={`journey-scene scene-${align}`}
      style={{ opacity, scale, y, filter, pointerEvents }}
      aria-label={label}
    >
      <div className="scene-coordinate"><span>{number}</span>{label}</div>
      {children}
    </motion.section>
  );
}

function RobotArt() {
  return (
    <svg className="engineering-svg robot-svg" viewBox="0 0 620 500" aria-hidden="true">
      <defs>
        <linearGradient id="robotBody" x1="0" x2="1"><stop stopColor="#e9f4ff"/><stop offset="1" stopColor="#9dcaff"/></linearGradient>
        <filter id="robotGlow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g className="art-shadow"><ellipse cx="310" cy="430" rx="190" ry="27" /></g>
      <g className="robot-waves" fill="none" stroke="#2b78ff" strokeWidth="3">
        <path d="M98 138c-41 35-41 91 0 126"/><path d="M63 104c-65 55-65 144 0 198"/><path d="M522 138c41 35 41 91 0 126"/><path d="M557 104c65 55 65 144 0 198"/>
      </g>
      <g className="robot-machine">
        <path d="M204 145h212l42 198H162z" fill="url(#robotBody)" stroke="#dcecff" strokeWidth="3"/>
        <path d="M222 174h176l21 95H201z" fill="#0b2034" stroke="#4488e8" strokeWidth="2"/>
        <circle cx="267" cy="221" r="25" fill="#071827" stroke="#66adff" strokeWidth="3"/>
        <circle cx="353" cy="221" r="25" fill="#071827" stroke="#66adff" strokeWidth="3"/>
        <circle cx="267" cy="221" r="7" fill="#91d0ff" filter="url(#robotGlow)"/>
        <circle cx="353" cy="221" r="7" fill="#91d0ff" filter="url(#robotGlow)"/>
        <path d="M273 298h74" stroke="#134575" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="193" cy="359" r="65" fill="#07131f" stroke="#4878a6" strokeWidth="8"/>
        <circle cx="427" cy="359" r="65" fill="#07131f" stroke="#4878a6" strokeWidth="8"/>
        <circle cx="193" cy="359" r="24" fill="#173653"/><circle cx="427" cy="359" r="24" fill="#173653"/>
        <path d="M248 145l-27-67M372 145l27-67" stroke="#bedcff" strokeWidth="5"/>
        <circle cx="218" cy="71" r="14" fill="#1e5bff" stroke="#b9dcff" strokeWidth="3"/>
        <circle cx="402" cy="71" r="14" fill="#1e5bff" stroke="#b9dcff" strokeWidth="3"/>
      </g>
    </svg>
  );
}

function BreadboardArt() {
  const holes = Array.from({ length: 13 * 8 }, (_, index) => {
    const col = index % 13;
    const row = Math.floor(index / 13);
    return <circle key={index} cx={130 + col * 29} cy={132 + row * 30} r="4.5" />;
  });
  return (
    <svg className="engineering-svg breadboard-svg" viewBox="0 0 620 500" aria-hidden="true">
      <defs><filter id="boardShadow"><feDropShadow dx="0" dy="24" stdDeviation="18" floodOpacity=".35"/></filter></defs>
      <g filter="url(#boardShadow)" transform="rotate(-6 310 250)">
        <rect x="82" y="74" width="456" height="350" rx="25" fill="#edf3f7" stroke="#9cb8cc" strokeWidth="3"/>
        <path d="M110 102h400M110 392h400" stroke="#e43f53" strokeWidth="3"/><path d="M110 112h400M110 382h400" stroke="#2563eb" strokeWidth="3"/>
        <g fill="#38546a">{holes}</g>
        <path d="M120 246h380" stroke="#b5c5d0" strokeWidth="12"/>
        <g className="board-chip"><rect x="257" y="202" width="106" height="86" rx="5" fill="#101a24"/><path d="M267 192v20m17-20v20m17-20v20m17-20v20m17-20v20m17-20v20M267 278v20m17-20v20m17-20v20m17-20v20m17-20v20m17-20v20" stroke="#aebcc7" strokeWidth="5"/><circle cx="310" cy="245" r="7" fill="#458cff"/></g>
        <g className="board-led"><circle cx="434" cy="224" r="17" fill="#61c6ff"/><circle cx="434" cy="224" r="8" fill="white"/></g>
        <g className="jumper red" fill="none" stroke="#ff4e66" strokeWidth="7" strokeLinecap="round"><path d="M159 163C207 45 373 50 455 161"/></g>
        <g className="jumper blue" fill="none" stroke="#1e5bff" strokeWidth="7" strokeLinecap="round"><path d="M188 343c37-109 171-105 237-7"/></g>
      </g>
    </svg>
  );
}

function MultimeterArt() {
  return (
    <svg className="engineering-svg meter-svg" viewBox="0 0 620 500" aria-hidden="true">
      <defs><linearGradient id="meterBody" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffe24f"/><stop offset="1" stopColor="#e8aa16"/></linearGradient></defs>
      <ellipse className="art-shadow" cx="300" cy="443" rx="175" ry="24"/>
      <g className="probe-wire" fill="none" strokeWidth="8" strokeLinecap="round"><path d="M214 378C84 419 69 289 128 197" stroke="#e84b58"/><path d="M392 385c139 29 151-93 103-184" stroke="#202d39"/></g>
      <g className="meter-body">
        <path d="M190 58h226c23 0 42 19 42 42v318H148V100c0-23 19-42 42-42z" fill="url(#meterBody)" stroke="#fff1a6" strokeWidth="4"/>
        <rect x="184" y="101" width="238" height="112" rx="8" fill="#17232c"/>
        <rect x="202" y="119" width="202" height="75" rx="4" fill="#b9e1ce"/>
        <text x="303" y="174" textAnchor="middle" fill="#152c31" fontSize="55" fontFamily="monospace">12.48</text>
        <text x="385" y="141" fill="#152c31" fontSize="13" fontFamily="monospace">V DC</text>
        <circle cx="303" cy="300" r="68" fill="#1c252d" stroke="#fff3a5" strokeWidth="5"/>
        <circle cx="303" cy="300" r="42" fill="#303b44"/>
        <path d="M303 300l-8-34h16z" fill="#fff"/>
        <g fill="#18232c"><circle cx="221" cy="391" r="15"/><circle cx="303" cy="391" r="15"/><circle cx="385" cy="391" r="15"/></g>
      </g>
      <g className="probe-tips"><path d="M118 220l22-90" stroke="#e84b58" strokeWidth="10"/><path d="M504 220l-14-90" stroke="#26343f" strokeWidth="10"/><path d="M140 130l7-30M490 130l-4-30" stroke="#d9e8f3" strokeWidth="5"/></g>
    </svg>
  );
}

function ScopeArt() {
  return (
    <svg className="engineering-svg scope-svg" viewBox="0 0 620 500" aria-hidden="true">
      <defs><filter id="scopeGlow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <ellipse className="art-shadow" cx="315" cy="428" rx="220" ry="25"/>
      <g className="scope-body">
        <rect x="70" y="83" width="480" height="328" rx="24" fill="#dbe5eb" stroke="#f8fcff" strokeWidth="4"/>
        <rect x="104" y="118" width="318" height="223" rx="8" fill="#06131f" stroke="#7896aa" strokeWidth="3"/>
        <g stroke="#193653" strokeWidth="1"><path d="M104 174h318M104 230h318M104 286h318M183 118v223M263 118v223M342 118v223"/></g>
        <path className="scope-wave" d="M105 236c35 0 37-68 72-68s41 135 79 135 38-129 77-129 42 62 89 62" fill="none" stroke="#5fc5ff" strokeWidth="5" filter="url(#scopeGlow)"/>
        <g fill="#213545"><circle cx="475" cy="151" r="24"/><circle cx="475" cy="222" r="24"/><circle cx="475" cy="293" r="24"/></g>
        <g fill="none" stroke="#67a8dd" strokeWidth="4"><circle cx="475" cy="151" r="11"/><circle cx="475" cy="222" r="11"/><circle cx="475" cy="293" r="11"/></g>
        <rect x="106" y="360" width="60" height="18" rx="9" fill="#1e5bff"/><circle cx="472" cy="368" r="12" fill="#54e9a7"/>
      </g>
    </svg>
  );
}

function SignalPulse({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, .18, .38, .58, .78, 1], ["11vw", "68vw", "20vw", "77vw", "24vw", "82vw"]);
  const y = useTransform(progress, [0, .18, .38, .58, .78, 1], ["73vh", "43vh", "61vh", "55vh", "29vh", "22vh"]);
  const opacity = useTransform(progress, [0, .02, .965, 1], [0, .48, .48, 0]);
  const scale = useTransform(progress, [0, .2, .4, .6, .8, 1], [.64, 1.08, .76, 1.18, .82, .55]);

  return (
    <motion.div className="traveling-signal" style={{ x, y, opacity, scale }} aria-hidden="true">
      <i className="pulse-core" />
      <i className="pulse-ring ring-a" />
      <i className="pulse-ring ring-b" />
      <i className="pulse-ring ring-c" />
    </motion.div>
  );
}

function SkillList({ items }: { items: string[] }) {
  return <div className="scene-skills">{items.map((item, index) => <span key={item}><i>0{index + 1}</i>{item}</span>)}</div>;
}

function EngineeringMountain({ progress }: { progress: MotionValue<number> }) {
  const orbitRotation = useTransform(progress, [0, .23], [0, 138]);
  const counterRotation = useTransform(progress, [0, .23], [0, -138]);
  const mountainScale = useTransform(progress, [0, .15, .23], [.88, 1, 1.16]);
  const mountainY = useTransform(progress, [0, .23], [24, -20]);

  return (
    <motion.div className="engineering-mountain" style={{ scale: mountainScale, y: mountainY }} aria-hidden="true">
      <motion.div className="mountain-orbit" style={{ rotate: orbitRotation }}>
        <motion.div className="mountain-info mountain-hardware" style={{ rotate: counterRotation }}><i>01</i><span>HARDWARE</span><small>BUILD · SOLDER · WIRE</small></motion.div>
        <motion.div className="mountain-info mountain-embedded" style={{ rotate: counterRotation }}><i>02</i><span>EMBEDDED</span><small>SENSE · DECIDE · ACT</small></motion.div>
        <motion.div className="mountain-info mountain-testing" style={{ rotate: counterRotation }}><i>03</i><span>TESTING</span><small>MEASURE · ISOLATE · VERIFY</small></motion.div>
        <motion.div className="mountain-info mountain-signals" style={{ rotate: counterRotation }}><i>04</i><span>SIGNALS</span><small>MODEL · TRANSFORM · UNDERSTAND</small></motion.div>
      </motion.div>

      <svg className="mountain-svg" viewBox="0 0 720 600" role="presentation">
        <defs>
          <linearGradient id="mountainFace" x1="0" y1="0" x2="0.8" y2="1">
            <stop stopColor="#173b5f"/><stop offset=".48" stopColor="#0c263e"/><stop offset="1" stopColor="#07131f"/>
          </linearGradient>
          <linearGradient id="mountainRidge" x1="0" x2="1"><stop stopColor="#8bcaff"/><stop offset=".5" stopColor="#2b78ff"/><stop offset="1" stopColor="#153d68"/></linearGradient>
          <filter id="summitGlow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <ellipse className="mountain-shadow" cx="360" cy="537" rx="290" ry="34"/>
        <path className="mountain-face" d="M42 520L162 350l76 61L358 128l91 187 62-70 167 275z" fill="url(#mountainFace)"/>
        <path className="mountain-side" d="M358 128l91 187 62-70 167 275H358z"/>
        <g className="mountain-ridges" fill="none" stroke="url(#mountainRidge)">
          <path d="M42 520L162 350l76 61L358 128l91 187 62-70 167 275"/>
          <path d="M358 128L304 302l54 218M358 128l47 210-47 182M162 350l42 88 154 82M511 245l17 157 150 118"/>
          <path d="M96 473l102-40 75 35 85-198 70 123 83-86 105 166"/>
        </g>
        <g className="mountain-contours" fill="none">
          <path d="M79 504c98-48 160-6 240-45s132-71 290 19"/>
          <path d="M116 454c82-37 139 1 211-48s143-65 243 0"/>
          <path d="M156 405c56-23 92 10 157-42s122-43 199-8"/>
        </g>
        <g className="summit-beacon" filter="url(#summitGlow)"><circle cx="358" cy="128" r="8"/><path d="M358 110V74M337 89l21-15 21 15"/></g>
        <g className="mountain-nodes"><circle cx="162" cy="350" r="5"/><circle cx="238" cy="411" r="5"/><circle cx="449" cy="315" r="5"/><circle cx="511" cy="245" r="5"/></g>
      </svg>
      <div className="mountain-base-label"><span>ENGINEERING SUMMIT</span><small>Scroll to orbit the skill set</small></div>
    </motion.div>
  );
}

export function SignalJourney() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 65, damping: 24, mass: 0.42 });
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);
  const background = useTransform(
    smoothProgress,
    [0, .2, .4, .6, .8, 1],
    ["#080b10", "#0b172b", "#12233b", "#0c1d2c", "#101827", "#09131e"],
  );
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const gridScale = useTransform(smoothProgress, [0, .2, .4, .6, .8, 1], [1, 1.22, .88, 1.28, .9, 1.12]);
  const gridRotate = useTransform(smoothProgress, [0, .35, .7, 1], [0, 1.5, -1.2, 0.8]);
  const mistOpacity = useTransform(
    smoothProgress,
    [0, .155, .2, .245, .355, .4, .445, .555, .6, .645, .755, .8, .845, 1],
    [0, .05, .82, .06, .05, .86, .06, .05, .84, .06, .05, .82, .04, 0],
  );
  const mistScale = useTransform(smoothProgress, [0, .2, .4, .6, .8, 1], [.82, 1.45, .86, 1.5, .88, 1.28]);
  const mistX = useTransform(smoothProgress, [0, .25, .5, .75, 1], ["-16%", "9%", "-8%", "12%", "-4%"]);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    const snapPoints = [0, .29, .5, .7, .9];
    const intentThreshold = 180;
    let accumulatedDelta = 0;
    let locked = false;
    let unlockTimer: number | undefined;

    const metrics = () => {
      const top = journey.offsetTop;
      const span = Math.max(1, journey.offsetHeight - window.innerHeight);
      const progress = (window.scrollY - top) / span;
      return { top, span, progress };
    };

    const nextPoint = (progress: number, direction: number) => {
      if (direction > 0) return snapPoints.find(point => point > progress + .035);
      return [...snapPoints].reverse().find(point => point < progress - .035);
    };

    const moveTo = (point: number, top: number, span: number) => {
      locked = true;
      accumulatedDelta = 0;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: top + point * span, behavior: reducedMotion ? "auto" : "smooth" });
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => { locked = false; }, reducedMotion ? 120 : 950);
    };

    const onWheel = (event: WheelEvent) => {
      const { top, span, progress } = metrics();
      const insideJourney = window.scrollY >= top - 2 && window.scrollY <= top + span + 2;
      if (!insideJourney || event.deltaY === 0) return;

      const direction = Math.sign(event.deltaY);
      const atFirstScene = direction < 0 && progress <= .005;
      const leavingLastScene = direction > 0 && progress >= snapPoints.at(-1)! - .012;
      if (atFirstScene || leavingLastScene) {
        accumulatedDelta = 0;
        return;
      }

      event.preventDefault();
      if (locked) return;

      if (accumulatedDelta !== 0 && Math.sign(accumulatedDelta) !== direction) accumulatedDelta = 0;
      accumulatedDelta += event.deltaY;
      if (Math.abs(accumulatedDelta) < intentThreshold) return;

      const target = nextPoint(progress, direction);
      if (target !== undefined) moveTo(target, top, span);
      else accumulatedDelta = 0;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(unlockTimer);
    };
  }, []);

  return (
    <div className="signal-journey" ref={journeyRef}>
      <motion.div className="journey-viewport" style={{ backgroundColor: background }}>
        <div className="journey-noise" aria-hidden="true" />
        <motion.div className="journey-depth-grid" style={{ scale: gridScale, rotate: gridRotate }} aria-hidden="true" />
        <motion.div className="mist-transition mist-back" style={{ opacity: mistOpacity, scale: mistScale, x: mistX }} aria-hidden="true"><i/><i/><i/></motion.div>
        <motion.div className="mist-transition mist-front" style={{ opacity: mistOpacity, scale: mistScale, x: mistX }} aria-hidden="true"><i/><i/></motion.div>
        <svg className="signal-path" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
          <path className="signal-path-base" d="M65 565C167 585 196 244 352 238S504 592 635 551 727 204 934 182" />
          <motion.path className="signal-path-live" d="M65 565C167 585 196 244 352 238S504 592 635 551 727 204 934 182" style={{ pathLength }} />
        </svg>
        <SignalPulse progress={smoothProgress} />

        <div className="journey-progress" aria-hidden="true">
          <span>01</span><div><motion.i style={{ height: progressHeight }} /></div><span>05</span>
        </div>
        <Link className="skip-journey" href="/projects">Skip journey <ArrowUpRight size={14}/></Link>

        <JourneyScene progress={smoothProgress} range={[0, .23]} first align="left" number="01" label="Engineering skill map">
          <EngineeringMountain progress={smoothProgress} />
          <div className="journey-copy intro-copy">
            <p className="scene-eyebrow"><span/> Electrical engineering · skill map</p>
            <h1>Build.<br/>Measure.<br/><em>Decode.</em></h1>
            <p className="scene-lede">I work across the complete engineering loop: turning physical inputs into useful behavior, then proving the system with measurements.</p>
            <div className="intro-skill-line"><span>Hardware</span><span>Signals</span><span>Testing</span><span>Code</span></div>
            <div className="journey-scroll"><ArrowDown size={16}/><span>Enter the skill set</span></div>
          </div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.16, .43]} align="left" number="02" label="Embedded systems">
          <motion.div className="journey-object object-right object-robot"><RobotArt/></motion.div>
          <div className="journey-copy">
            <p className="scene-eyebrow"><span/> Embedded intelligence</p>
            <h2>Sense.<br/>Decide. <em>Act.</em></h2>
            <p>I connect sensors, analog conditioning, control logic, and physical outputs into one responsive system.</p>
            <SkillList items={["Sensor inputs", "Op-amp conditioning", "Microcontroller logic", "Motor control"]}/>
          </div>
          <div className="scene-spec spec-bottom"><span>SKILL LOOP</span><strong>INPUT → ACTION</strong></div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.36, .63]} align="right" number="03" label="Circuit integration">
          <motion.div className="journey-object object-left object-board"><BreadboardArt/></motion.div>
          <div className="journey-copy">
            <p className="scene-eyebrow"><span/> Hardware integration</p>
            <h2>Build.<br/>Connect. <em>Debug.</em></h2>
            <p>I move from schematics and individual components to reliable assemblies, checking each block before full integration.</p>
            <SkillList items={["Circuit assembly", "Soldering + wiring", "Component verification", "Board-level debugging"]}/>
          </div>
          <div className="scene-spec spec-top"><span>WORK MODE</span><strong>HANDS-ON</strong></div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.56, .83]} align="left" number="04" label="Testing and troubleshooting">
          <motion.div className="journey-object object-right object-meter"><MultimeterArt/></motion.div>
          <div className="journey-copy">
            <p className="scene-eyebrow"><span/> Evidence-driven troubleshooting</p>
            <h2>Measure.<br/>Isolate. <em>Verify.</em></h2>
            <p>I turn symptoms into evidence, isolate the fault, apply the fix, and verify that the complete system performs correctly.</p>
            <SkillList items={["Voltage + continuity", "Fault isolation", "Safe test practice", "Performance verification"]}/>
          </div>
          <div className="scene-spec spec-bottom"><span>METHOD</span><strong>TEST → PROVE</strong></div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.76, 1]} last align="right" number="05" label="Signals and simulation">
          <motion.div className="journey-object object-left object-scope"><ScopeArt/></motion.div>
          <div className="journey-copy">
            <p className="scene-eyebrow"><span/> Analysis + modeling</p>
            <h2>Model.<br/>Transform. <em>Understand.</em></h2>
            <p>I use simulation and code to reveal system behavior, compare tradeoffs, and connect mathematical results to physical meaning.</p>
            <SkillList items={["Python · NumPy · SciPy", "MATLAB + App Designer", "DFT / DCT analysis", "LTspice + Cadence"]}/>
          </div>
          <div className="scene-spec spec-top"><span>TOOLCHAIN</span><strong>CODE + SIMULATION</strong></div>
        </JourneyScene>
      </motion.div>
    </div>
  );
}

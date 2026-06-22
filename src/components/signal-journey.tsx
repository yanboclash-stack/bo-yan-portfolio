"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Radio } from "lucide-react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ReactNode, useRef } from "react";

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
  const scale = useTransform(progress, [start, end], [first ? 1 : 0.94, last ? 1 : 1.055]);
  const y = useTransform(progress, [start, end], [first ? 0 : 34, last ? 0 : -34]);
  const pointerEvents = useTransform(opacity, value => value > 0.55 ? "auto" : "none");

  return (
    <motion.section
      className={`journey-scene scene-${align}`}
      style={{ opacity, scale, y, pointerEvents }}
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
        <g className="jumper red" fill="none" stroke="#ff4e66" strokeWidth="7" strokeLinecap="round"><path d="M159 163C207 45 373 50 455 161"/></g>
        <g className="jumper blue" fill="none" stroke="#1e5bff" strokeWidth="7" strokeLinecap="round"><path d="M188 343c37-109 171-105 237-7"/></g>
        <g className="board-chip"><rect x="257" y="202" width="106" height="86" rx="5" fill="#101a24"/><path d="M267 192v20m17-20v20m17-20v20m17-20v20m17-20v20m17-20v20M267 278v20m17-20v20m17-20v20m17-20v20m17-20v20m17-20v20" stroke="#aebcc7" strokeWidth="5"/><circle cx="310" cy="245" r="7" fill="#458cff"/></g>
        <g className="board-led"><circle cx="434" cy="224" r="17" fill="#61c6ff"/><circle cx="434" cy="224" r="8" fill="white"/></g>
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
  const x = useTransform(progress, [0, .12, .28, .43, .59, .75, .9, 1], ["10vw", "67vw", "76vw", "18vw", "78vw", "24vw", "77vw", "86vw"]);
  const y = useTransform(progress, [0, .12, .28, .43, .59, .75, .9, 1], ["73vh", "47vh", "29vh", "60vh", "57vh", "29vh", "53vh", "25vh"]);
  const opacity = useTransform(progress, [0, .015, .955, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, .15, .35, .55, .75, 1], [.7, 1.15, .8, 1.25, .86, .6]);

  return (
    <motion.div className="traveling-signal" style={{ x, y, opacity, scale }} aria-hidden="true">
      <i className="pulse-core" />
      <i className="pulse-ring ring-a" />
      <i className="pulse-ring ring-b" />
      <i className="pulse-ring ring-c" />
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
    [0, .22, .42, .62, .82, 1],
    ["#080b10", "#0b1730", "#0d2341", "#111923", "#111b2b", "#07131f"],
  );
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="signal-journey" ref={journeyRef}>
      <motion.div className="journey-viewport" style={{ backgroundColor: background }}>
        <div className="journey-noise" aria-hidden="true" />
        <svg className="signal-path" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
          <path className="signal-path-base" d="M65 565C167 585 196 244 352 238S504 592 635 551 727 204 934 182" />
          <motion.path className="signal-path-live" d="M65 565C167 585 196 244 352 238S504 592 635 551 727 204 934 182" style={{ pathLength }} />
        </svg>
        <SignalPulse progress={smoothProgress} />

        <div className="journey-progress" aria-hidden="true">
          <span>01</span><div><motion.i style={{ height: progressHeight }} /></div><span>06</span>
        </div>
        <Link className="skip-journey" href="/projects">Skip journey <ArrowUpRight size={14}/></Link>

        <JourneyScene progress={smoothProgress} range={[0, .17]} first align="left" number="01" label="Signal source">
          <div className="intro-orbit" aria-hidden="true"><i/><i/><i/><Radio/></div>
          <div className="journey-copy intro-copy">
            <p className="scene-eyebrow"><span/> Electrical engineering · UC Davis</p>
            <h1>Follow<br/>the <em>signal.</em></h1>
            <p className="scene-lede">A scroll-driven journey through the systems I build, measure, debug, and bring to life.</p>
            <div className="journey-scroll"><ArrowDown size={16}/><span>Scroll to transmit</span></div>
          </div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.12, .34]} align="left" number="02" label="Sound-seeking robot">
          <motion.div className="journey-object object-right object-robot"><RobotArt/></motion.div>
          <div className="journey-copy">
            <p className="scene-eyebrow"><span/> Sensing + motion</p>
            <h2>Audio in.<br/><em>Motion out.</em></h2>
            <p>Microphones capture the signal. Op-amps shape it. A microcontroller decides where the robot moves next.</p>
            <Link className="scene-link" href="/projects#sound-seeking-robot">See the robot <ArrowUpRight size={16}/></Link>
          </div>
          <div className="scene-spec spec-bottom"><span>RANGE</span><strong>≈ 2 FT</strong></div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.29, .51]} align="right" number="03" label="Breadboard and circuits">
          <motion.div className="journey-object object-left object-board"><BreadboardArt/></motion.div>
          <div className="journey-copy">
            <p className="scene-eyebrow"><span/> Assembly + integration</p>
            <h2>Components<br/>become a <em>system.</em></h2>
            <p>Resistors, capacitors, microphones, headers, and jumper wires—assembled carefully, then tested section by section.</p>
            <Link className="scene-link" href="/about">Explore my toolkit <ArrowUpRight size={16}/></Link>
          </div>
          <div className="scene-spec spec-top"><span>BUILD MODE</span><strong>HANDS-ON</strong></div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.46, .68]} align="left" number="04" label="Measurement and testing">
          <motion.div className="journey-object object-right object-meter"><MultimeterArt/></motion.div>
          <div className="journey-copy">
            <p className="scene-eyebrow"><span/> Measurement + debugging</p>
            <h2>Measure.<br/>Isolate. <em>Verify.</em></h2>
            <p>From HVAC control boards to student circuits, I use voltage, continuity, and signal checks to turn symptoms into evidence.</p>
            <Link className="scene-link" href="/experience">View experience <ArrowUpRight size={16}/></Link>
          </div>
          <div className="scene-spec spec-bottom"><span>READING</span><strong>12.48 VDC</strong></div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.63, .84]} align="right" number="05" label="Signal processing">
          <motion.div className="journey-object object-left object-scope"><ScopeArt/></motion.div>
          <div className="journey-copy">
            <p className="scene-eyebrow"><span/> Python + DSP</p>
            <h2>See what the<br/>signal <em>keeps.</em></h2>
            <p>DFT and DCT compression, reconstruction, SNR, mean squared error, retained energy—and the sound of the result.</p>
            <Link className="scene-link" href="/projects#audio-compression">Open the analysis <ArrowUpRight size={16}/></Link>
          </div>
          <div className="scene-spec spec-top"><span>DOMAIN</span><strong>TIME ↔ FREQUENCY</strong></div>
        </JourneyScene>

        <JourneyScene progress={smoothProgress} range={[.79, 1]} last align="center" number="06" label="Next connection">
          <div className="final-rings" aria-hidden="true"><i/><i/><i/><i/></div>
          <div className="journey-copy final-copy">
            <p className="scene-eyebrow"><span/> Signal received</p>
            <h2>The next system<br/>starts with a <em>connection.</em></h2>
            <p>I’m looking for opportunities across hardware testing, RF, power, controls, automation, and product engineering.</p>
            <div className="final-actions">
              <Link className="journey-primary" href="/contact">Start a conversation <ArrowUpRight size={17}/></Link>
              <Link className="scene-link" href="/projects">View all projects <ArrowUpRight size={16}/></Link>
            </div>
          </div>
        </JourneyScene>
      </motion.div>
    </div>
  );
}

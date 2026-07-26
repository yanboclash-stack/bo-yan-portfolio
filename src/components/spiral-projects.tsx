"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Mouse,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";
import { projects } from "@/data/portfolio";

const STEP_ANGLE = 54;
const STEP_RISE = 56;
const VISIBLE_STEPS = 17;
const ROTATION_SPRING = {
  type: "spring" as const,
  stiffness: 190,
  damping: 25,
  mass: .48,
};
const LIFT_SPRING = {
  type: "spring" as const,
  stiffness: 180,
  damping: 24,
  mass: .5,
};
const ELECTRONS = Array.from({ length: 24 }, (_, index) => ({
  angle: (index * 137.5) % 360,
  delay: -(index * 0.19),
  radius: 42 + ((index * 29) % 98),
  size: 3 + (index % 3),
  y: 6 + ((index * 17) % 88),
}));
const CYLINDER_FACES = Array.from({ length: 18 }, (_, index) => ({
  angle: index * 20,
  brightness: .28 + Math.max(0, Math.cos((index * 20 * Math.PI) / 180)) * .72,
  phase: (index * 19) % 92,
  spark: 8 + ((index * 31) % 84),
}));
const CORE_PLANES = Array.from({ length: 4 }, (_, index) => ({
  angle: index * 45,
  delay: -(index * .11),
}));
const FILAMENT_PLANES = [0, 60, 120];
const CORE_LIGHTNING = {
  body: "M34 -18L38 34L33 72L41 116L29 166L36 214L25 271L33 320L22 376L37 425L28 481L40 535L31 589L36 643L27 702L34 820L45 820L42 702L49 643L45 589L53 535L42 481L50 425L35 376L45 320L38 271L50 214L43 166L54 116L45 72L51 34L46 -18Z",
  line: "M40 -18L45 34L39 72L48 116L36 166L43 214L31 271L39 320L29 376L44 425L35 481L47 535L38 589L43 643L34 702L40 820",
} as const;
const VERTICAL_LIGHTNING_PATHS = [
  "M42 -30L37 42L47 86L35 142L43 199L31 254L40 313L29 369L44 430L34 486L45 543L36 602L42 661L33 720L39 830",
  "M37 -20L45 51L34 106L43 158L30 221L39 275L32 336L46 392L37 452L43 509L31 568L40 625L35 689L44 742L38 820",
  "M43 -24L34 39L41 98L30 151L45 209L36 263L47 324L33 383L42 441L29 499L39 558L32 615L45 674L36 733L41 824",
] as const;
const VERTICAL_FILAMENTS = [
  {
    angle: 12, delay: -.08, height: 29, path: 0, radius: 68, top: 8, width: 24,
  },
  {
    angle: 49, delay: -.34, height: 21, path: 1, radius: 106, top: 46, width: 19,
  },
  {
    angle: 91, delay: -.17, height: 27, path: 2, radius: 83, top: 17, width: 22,
  },
  {
    angle: 132, delay: -.48, height: 18, path: 0, radius: 113, top: 68, width: 18,
  },
  {
    angle: 174, delay: -.27, height: 34, path: 1, radius: 58, top: 34, width: 25,
  },
  {
    angle: 216, delay: -.61, height: 20, path: 2, radius: 101, top: 9, width: 18,
  },
  {
    angle: 253, delay: -.41, height: 27, path: 0, radius: 77, top: 61, width: 21,
  },
  {
    angle: 297, delay: -.72, height: 23, path: 1, radius: 116, top: 28, width: 18,
  },
  {
    angle: 338, delay: -.54, height: 19, path: 2, radius: 63, top: 72, width: 20,
  },
] as const;

function modulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

export function SpiralProjects() {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const wheelAccumulator = useRef(0);
  const wheelLocked = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const activeIndex = modulo(virtualIndex, projects.length);
  const activeProject = projects[activeIndex];

  const move = useCallback((direction: number) => {
    if (!direction) return;
    setVirtualIndex((current) => current + Math.sign(direction));
  }, []);

  const jumpToProject = useCallback((targetIndex: number) => {
    setVirtualIndex((current) => {
      const currentIndex = modulo(current, projects.length);
      let distance = targetIndex - currentIndex;
      if (distance > projects.length / 2) distance -= projects.length;
      if (distance < -projects.length / 2) distance += projects.length;
      return current + distance;
    });
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (wheelLocked.current) return;

      wheelAccumulator.current += event.deltaY;
      if (Math.abs(wheelAccumulator.current) < 42) return;

      move(wheelAccumulator.current);
      wheelAccumulator.current = 0;
      wheelLocked.current = true;
      window.setTimeout(() => {
        wheelLocked.current = false;
      }, reducedMotion ? 70 : 255);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        move(1);
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
    };
  }, [move, reducedMotion]);

  const steps = useMemo(() => {
    const radius = Math.floor(VISIBLE_STEPS / 2);
    return Array.from(
      { length: VISIBLE_STEPS },
      (_, index) => virtualIndex + index - radius,
    );
  }, [virtualIndex]);

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartY.current === null) return;
    const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
    const distance = touchStartY.current - endY;
    touchStartY.current = null;
    if (Math.abs(distance) > 34) move(distance);
  };

  return (
    <section
      className="spiral-home"
      aria-label="Infinite project staircase"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="spiral-home-grid">
        <div className="spiral-stage" aria-hidden="true">
          <div className="spiral-ambient ambient-one" />
          <div className="spiral-ambient ambient-two" />
          <div className="spiral-floor-ring ring-near" />
          <div className="spiral-floor-ring ring-far" />

          <div className="spiral-stage-label">
            <span>PROJECT SPIRAL</span>
            <small>SCROLL TO ROTATE / NO END POINT</small>
          </div>

          <div className="spiral-camera">
            <div className="energy-core-anchor">
              <motion.div
                animate={{ rotateY: -virtualIndex * STEP_ANGLE }}
                className="energy-core"
                initial={false}
                transition={reducedMotion ? { duration: 0 } : ROTATION_SPRING}
              >
                <div className="infinite-light">
                  <div className="plasma-cylinder-shell">
                    {CYLINDER_FACES.map((face, index) => {
                      const style = {
                        "--face-angle": `${face.angle}deg`,
                        "--face-brightness": face.brightness,
                        "--face-phase": `${face.phase}px`,
                        "--spark-y": `${face.spark}%`,
                      } as CSSProperties;
                      return <i className="plasma-cylinder-face" key={index} style={style} />;
                    })}
                  </div>

                  <div className="plasma-bolt-volume">
                    {CORE_PLANES.map((plane, index) => {
                      const style = {
                        "--plane-angle": `${plane.angle}deg`,
                        "--plane-delay": `${plane.delay}s`,
                      } as CSSProperties;

                      return (
                        <svg
                          className="plasma-bolt-plane"
                          key={index}
                          preserveAspectRatio="xMidYMid slice"
                          style={style}
                          viewBox="0 0 80 800"
                        >
                          <path className="plasma-bolt-bloom" d={CORE_LIGHTNING.body} />
                          <path className="plasma-bolt-body" d={CORE_LIGHTNING.body} />
                          <path className="plasma-bolt-hotline" d={CORE_LIGHTNING.line} />
                        </svg>
                      );
                    })}
                  </div>

                  <i className="plasma-depth-ring plasma-ring-top" />
                  <i className="plasma-depth-ring plasma-ring-middle" />
                  <i className="plasma-depth-ring plasma-ring-bottom" />
                </div>

                <div className="vertical-lightning-field">
                  {VERTICAL_FILAMENTS.map((filament, filamentIndex) => {
                    const filamentStyle = {
                      "--filament-angle": `${filament.angle}deg`,
                      "--filament-delay": `${filament.delay}s`,
                      "--filament-height": `${filament.height}%`,
                      "--filament-radius": `${filament.radius}px`,
                      "--filament-top": `${filament.top}%`,
                      "--filament-width": `${filament.width}px`,
                    } as CSSProperties;

                    return (
                      <div
                        className="vertical-lightning-filament"
                        key={filamentIndex}
                        style={filamentStyle}
                      >
                        {FILAMENT_PLANES.map((planeAngle) => {
                          const planeStyle = {
                            "--filament-plane": `${planeAngle}deg`,
                          } as CSSProperties;

                          return (
                            <svg
                              className="vertical-filament-plane"
                              key={planeAngle}
                              preserveAspectRatio="xMidYMid meet"
                              style={planeStyle}
                              viewBox="0 0 80 800"
                            >
                              <path
                                className="vertical-filament-glow"
                                d={VERTICAL_LIGHTNING_PATHS[filament.path]}
                              />
                              <path
                                className="vertical-filament-core"
                                d={VERTICAL_LIGHTNING_PATHS[filament.path]}
                              />
                              <path
                                className="vertical-filament-hotline"
                                d={VERTICAL_LIGHTNING_PATHS[filament.path]}
                              />
                            </svg>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="electron-field">
                  {ELECTRONS.map((electron, index) => {
                    const style = {
                      "--electron-angle": `${electron.angle}deg`,
                      "--electron-delay": `${electron.delay}s`,
                      "--electron-radius": `${electron.radius}px`,
                      "--electron-size": `${electron.size}px`,
                      "--electron-y": `${electron.y}%`,
                    } as CSSProperties;
                    return <i className="electron" key={index} style={style} />;
                  })}
                </div>
                <i className="energy-orbit orbit-top" />
                <i className="energy-orbit orbit-middle" />
                <i className="energy-orbit orbit-bottom" />
              </motion.div>
            </div>

            <motion.div
              animate={{
                rotateY: -virtualIndex * STEP_ANGLE,
                y: -virtualIndex * STEP_RISE,
              }}
              className="spiral-steps"
              initial={false}
              transition={reducedMotion
                ? { duration: 0 }
                : { rotateY: ROTATION_SPRING, y: LIFT_SPRING }}
            >
              {steps.map((slot) => {
                const projectIndex = modulo(slot, projects.length);
                const project = projects[projectIndex];
                const distance = Math.abs(slot - virtualIndex);
                const isActive = slot === virtualIndex;
                const inactiveOpacity = Math.max(.12, .76 * Math.pow(.8, distance - 1));
                const inactiveBrightness = Math.max(.76, .97 - distance * .03);
                const inactiveSaturation = Math.max(.62, .96 - distance * .04);
                const style = {
                  "--step-angle": `${slot * STEP_ANGLE}deg`,
                  "--step-y": `${slot * STEP_RISE}px`,
                  "--step-y-mobile": `${slot * 42}px`,
                  "--project-accent": project.accent,
                  opacity: isActive ? 1 : inactiveOpacity,
                  filter: isActive
                    ? "none"
                    : `brightness(${inactiveBrightness}) saturate(${inactiveSaturation}) contrast(.96)`,
                } as CSSProperties;

                return (
                  <div
                    className="spiral-step"
                    data-active={isActive ? "true" : "false"}
                    key={slot}
                    style={style}
                  >
                    <span className="step-index">{project.id}</span>
                    <span className="step-title">{project.title}</span>
                    <span className="step-signal" />
                  </div>
                );
              })}
            </motion.div>
          </div>

          <AnimatePresence initial={false} mode="sync">
            <motion.div
              className="active-stair-name"
              key={activeProject.id}
              initial={reducedMotion ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: reducedMotion ? 0 : .25 }}
            >
              <span>ACTIVE TREAD / {activeProject.id}</span>
              <strong>{activeProject.title}</strong>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="project-panel" aria-live="polite">
          <div className="project-panel-topline">
            <span className="status-dot" />
            <span>SELECTED PROJECT</span>
            <strong>
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </strong>
          </div>

          <motion.article
            className="project-panel-content"
            key={activeProject.id}
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="project-panel-kicker">PROJECT / {activeProject.id}</p>
            <h1>{activeProject.title}</h1>
            <p className="project-panel-subtitle">{activeProject.subtitle}</p>
            <p className="project-panel-description">{activeProject.description}</p>

            <div className="project-panel-result">
              <span>RESULT</span>
              <p>{activeProject.outcome}</p>
            </div>

            <div className="project-panel-tags">
              {activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>

            <Link className="project-panel-link" href={`/projects#${activeProject.slug}`}>
              View project <ArrowUpRight size={17} />
            </Link>
          </motion.article>

          <div className="spiral-controls">
            <div className="scroll-instruction">
              <Mouse size={16} />
              <span>Scroll or swipe<br /><strong>to climb</strong></span>
            </div>

            <div className="project-dots" aria-label="Choose a project">
              {projects.map((project, index) => (
                <button
                  aria-label={`Show ${project.title}`}
                  className={index === activeIndex ? "active" : ""}
                  key={project.id}
                  onClick={() => jumpToProject(index)}
                  type="button"
                >
                  <span>{project.id}</span>
                </button>
              ))}
            </div>

            <div className="step-buttons">
              <button aria-label="Previous project" onClick={() => move(-1)} type="button">
                <ChevronUp size={18} />
              </button>
              <button aria-label="Next project" onClick={() => move(1)} type="button">
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/portfolio";

const mod = (value: number, length: number) => ((value % length) + length) % length;

export function InfiniteProjectStaircase() {
  const [step, setStep] = useState(0);
  const wheelTotal = useRef(0);
  const wheelLocked = useRef(false);
  const touchY = useRef<number | null>(null);
  const root = useRef<HTMLElement>(null);

  const move = useCallback((direction: number) => {
    setStep((current) => current + direction);
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      wheelTotal.current += event.deltaY;
      if (wheelLocked.current || Math.abs(wheelTotal.current) < 28) return;
      move(wheelTotal.current > 0 ? 1 : -1);
      wheelTotal.current = 0;
      wheelLocked.current = true;
      window.setTimeout(() => { wheelLocked.current = false; }, 360);
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [move]);

  const active = projects[mod(step, projects.length)];
  const cards = useMemo(() => Array.from({ length: 13 }, (_, index) => index - 6), []);

  return (
    <section
      ref={root}
      className="infinite-staircase"
      aria-label="Infinite project staircase"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") move(1);
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") move(-1);
      }}
      onTouchStart={(event) => { touchY.current = event.touches[0]?.clientY ?? null; }}
      onTouchEnd={(event) => {
        if (touchY.current === null) return;
        const endY = event.changedTouches[0]?.clientY ?? touchY.current;
        if (Math.abs(touchY.current - endY) > 36) move(touchY.current > endY ? 1 : -1);
        touchY.current = null;
      }}
    >
      <div className="stair-grid" aria-hidden="true" />

      <div className="spiral-side">
        <div className="spiral-instruction">
          <i />
          <div><strong>PROJECT SPIRAL</strong><span>SCROLL TO ROTATE / NO END POINT</span></div>
        </div>

        <div className="spiral-orbit orbit-a" aria-hidden="true" />
        <div className="spiral-orbit orbit-b" aria-hidden="true" />
        <div className="spiral-core" aria-hidden="true">
          <div className="core-glow" />
          <svg viewBox="0 0 80 700" preserveAspectRatio="none">
            <path d="M43 0 28 103 47 177 31 252 48 331 27 406 49 490 30 567 42 700" />
            <path className="core-echo" d="M18 8 10 117 20 209 8 292 22 378 11 485 17 596 10 690" />
            <path className="core-echo" d="M65 22 57 145 68 238 58 349 70 444 60 540 67 680" />
          </svg>
        </div>

        <div className="spiral-deck" aria-live="polite">
          {cards.map((offset) => {
            const project = projects[mod(step + offset, projects.length)];
            const angle = offset * 0.94;
            const x = Math.sin(angle) * 250;
            const y = offset * 112;
            const z = Math.cos(angle) * 165 - Math.abs(offset) * 22;
            const scale = Math.max(0.56, 1 - Math.abs(offset) * 0.075);
            const opacity = Math.max(0.08, 1 - Math.abs(offset) * 0.145);

            return (
              <button
                key={`${step}-${offset}`}
                className={offset === 0 ? "spiral-project active" : "spiral-project"}
                style={{
                  transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${-angle * 24}deg) scale(${scale})`,
                  opacity,
                  zIndex: 30 - Math.abs(offset),
                }}
                onClick={() => offset === 0 ? undefined : move(offset > 0 ? 1 : -1)}
                aria-label={offset === 0 ? `${project.title}, selected` : `Select ${project.title}`}
              >
                <span>{project.id}</span>
                <strong>{project.title}</strong>
                <i aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="active-tread"><span>ACTIVE TREAD /</span><strong>{active.id}</strong><i /></div>
      </div>

      <article className="selected-project" key={active.id}>
        <div className="selection-state"><i /><span>SELECTED PROJECT</span></div>
        <div className="project-count">PROJECT / {active.id}</div>
        <h1>{active.title}</h1>
        <p className="selected-subtitle">{active.subtitle}</p>
        <p className="selected-description">{active.description}</p>
        <div className="selected-result"><span>RESULT</span><p>{active.outcome}</p></div>
        <div className="selected-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <Link className="selected-link" href={`/projects#${active.slug}`}>VIEW PROJECT <ArrowUpRight size={17} /></Link>
        <div className="stair-controls" aria-label="Project controls">
          <button onClick={() => move(-1)} aria-label="Previous project"><ChevronUp size={17} /></button>
          <span>{active.id} / 03</span>
          <button onClick={() => move(1)} aria-label="Next project"><ChevronDown size={17} /></button>
        </div>
      </article>
    </section>
  );
}

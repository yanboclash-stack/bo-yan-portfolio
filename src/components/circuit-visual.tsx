"use client";

import { motion, useReducedMotion } from "motion/react";

const nodes = [
  [56, 72], [142, 72], [142, 134], [222, 134], [222, 66], [306, 66],
  [82, 216], [164, 216], [164, 292], [252, 292], [252, 220], [330, 220],
] as const;

export function CircuitVisual() {
  const reduced = useReducedMotion();
  return (
    <div className="circuit-visual" aria-hidden="true">
      <div className="visual-ring ring-one" />
      <div className="visual-ring ring-two" />
      <svg viewBox="0 0 390 360" role="presentation">
        <defs>
          <linearGradient id="trace" x1="0" x2="1">
            <stop offset="0" stopColor="#16395b" />
            <stop offset=".52" stopColor="#1e5bff" />
            <stop offset="1" stopColor="#7dc4ff" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g className="circuit-static">
          <path d="M56 72h86v62h80V66h84" />
          <path d="M82 216h82v76h88v-72h78" />
          <path d="M142 101h-38v80h60" />
          <path d="M222 134v48h30v38" />
        </g>
        <motion.path
          d="M56 72h86v62h80V66h84"
          className="circuit-live"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 2.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M82 216h82v76h88v-72h78"
          className="circuit-live"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 2.2, delay: reduced ? 0 : .45, ease: "easeInOut" }}
        />
        {nodes.map(([cx, cy], i) => (
          <motion.g key={`${cx}-${cy}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: reduced ? 0 : .45 + i * .07 }}>
            <circle cx={cx} cy={cy} r="7" className="node-outer" />
            <circle cx={cx} cy={cy} r="2.5" className="node-inner" />
          </motion.g>
        ))}
        <motion.circle
          r="5"
          fill="#fff"
          filter="url(#glow)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: "path('M56 72h86v62h80V66h84')" }}
        />
      </svg>
      <div className="visual-readout readout-a"><span>INPUT</span><strong>02.14 V</strong></div>
      <div className="visual-readout readout-b"><span>STATUS</span><strong>LOCKED</strong></div>
      <div className="visual-label">SIGNAL / 01</div>
    </div>
  );
}

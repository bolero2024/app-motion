import  { useRef, useEffect, useCallback,   } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

// ── Ellipse geometry ───────────────────────────────────────────────────────
const RX = 600;          // horizontal radius
const RY = 195;          // vertical  radius – larger → deeper arc
const CARD_W = 200;
const CARD_H = 175;
const NUM_CARDS = 15;
const DEG_STEP = 360 / NUM_CARDS;   // 24°

// Container only reveals the top arc
const CONTAINER_H = RY + CARD_H + 24;

// ── Card data ─────────────────────────────────────────────────────────────
type CardDef = {
  id: string;
  label: string;
  scene:   React.ReactNode;
};

const CARDS: CardDef[] = [
  {
    id: "travel",
    label: "Create a travel itinerary from my tabs",
    scene: <Scene_Sunset />,
  },
  {
    id: "shoes",
    label: "Find a deal on these shoes",
    scene: <Scene_Shoes />,
  },
  {
    id: "resume",
    label: "Adapt my CV for this post",
    scene: <Scene_Doc shade="#047857" />,
  },
  {
    id: "article",
    label: "Explain this article",
    scene: <Scene_Lens />,
  },
  {
    id: "options",
    label: "Compare all my options",
    scene: <Scene_Split />,
  },
  {
    id: "birthday",
    label: "Write a birthday message",
    scene: <Scene_Envelope hue="#be123c" />,
  },
  {
    id: "code",
    label: "Debug my code snippet",
    scene: <Scene_Terminal />,
  },
  {
    id: "email",
    label: "Draft a professional email",
    scene: <Scene_Envelope hue="#0f766e" />,
  },
  {
    id: "recipe",
    label: "Find a recipe with what I have",
    scene: <Scene_Sunset />,
  },
  {
    id: "social",
    label: "Write a social media caption",
    scene: <Scene_Lens />,
  },
  {
    id: "report",
    label: "Summarize this long report",
    scene: <Scene_Doc shade="#065f46" />,
  },
  {
    id: "workout",
    label: "Plan my weekly workout",
    scene: <Scene_Split />,
  },
  {
    id: "data",
    label: "Analyze this spreadsheet",
    scene: <Scene_Terminal />,
  },
  {
    id: "slides",
    label: "Create a presentation outline",
    scene: <Scene_Shoes />,
  },
  {
    id: "research",
    label: "Research this topic in depth",
    scene: <Scene_Envelope hue="#1d4ed8" />,
  },
];

// ── Scene visuals ─────────────────────────────────────────────────────────

function Scene_Sunset() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      {/* Sky */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="60%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#dc2626"/>
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c2410c"/>
          <stop offset="100%" stopColor="#7c2d12"/>
        </linearGradient>
      </defs>
      <rect width="200" height="100" fill="url(#sky)"/>
      <rect y="100" width="200" height="40" fill="url(#sea)"/>
      {/* Sun */}
      <circle cx="100" cy="90" r="28" fill="#fef08a" opacity="0.9"/>
      <circle cx="100" cy="90" r="20" fill="#fde047"/>
      {/* Horizon light rays */}
      <line x1="100" y1="62" x2="100" y2="20" stroke="#fef9c3" strokeWidth="1.5" opacity="0.5"/>
      <line x1="82" y1="68" x2="55" y2="32" stroke="#fef9c3" strokeWidth="1" opacity="0.35"/>
      <line x1="118" y1="68" x2="145" y2="32" stroke="#fef9c3" strokeWidth="1" opacity="0.35"/>
      {/* Reflection */}
      <rect x="85" y="102" width="30" height="28" rx="2" fill="#fde047" opacity="0.25"/>
      {/* Silhouette hills */}
      <path d="M0 100 Q50 78 100 95 Q150 78 200 100 L200 140 L0 140Z" fill="#431407" opacity="0.6"/>
      {/* Person silhouette */}
      <ellipse cx="72" cy="96" rx="4" ry="6" fill="#1c0a00" opacity="0.8"/>
      <line x1="72" y1="102" x2="72" y2="114" stroke="#1c0a00" strokeWidth="2"/>
      <line x1="72" y1="106" x2="65" y2="112" stroke="#1c0a00" strokeWidth="2"/>
      <line x1="72" y1="106" x2="79" y2="112" stroke="#1c0a00" strokeWidth="2"/>
      <line x1="72" y1="114" x2="67" y2="124" stroke="#1c0a00" strokeWidth="2"/>
      <line x1="72" y1="114" x2="77" y2="124" stroke="#1c0a00" strokeWidth="2"/>
    </svg>
  );
}

function Scene_Shoes() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="shbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eff6ff"/>
          <stop offset="100%" stopColor="#bfdbfe"/>
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#shbg)"/>
      {/* Ground shadow */}
      <ellipse cx="100" cy="118" rx="68" ry="8" fill="#93c5fd" opacity="0.3"/>
      {/* Shoe body */}
      <path d="M25 96 Q42 64 72 60 Q96 58 118 67 L145 79 Q158 86 153 93 Q148 99 130 99 L38 101 Q23 101 25 96Z"
            fill="white" opacity="0.97"/>
      {/* Shoe tongue + laces */}
      <path d="M72 60 Q84 46 108 50 L130 62 L118 67 Q96 58 72 60Z" fill="#3b82f6" opacity="0.5"/>
      <line x1="82" y1="54" x2="112" y2="60" stroke="white" strokeWidth="1.5" opacity="0.9"/>
      <line x1="80" y1="62" x2="110" y2="68" stroke="white" strokeWidth="1.5" opacity="0.9"/>
      <line x1="80" y1="70" x2="108" y2="74" stroke="white" strokeWidth="1.5" opacity="0.9"/>
      {/* Sole */}
      <path d="M25 96 Q38 105 130 99 L153 93 Q148 105 130 106 L38 108 Q20 108 25 96Z"
            fill="#1e40af" opacity="0.7"/>
      {/* Heel logo dot */}
      <circle cx="135" cy="88" r="5" fill="#60a5fa" opacity="0.9"/>
      {/* Price tag */}
      <rect x="6" y="30" width="54" height="24" rx="5" fill="#1d4ed8"/>
      <text x="33" y="41" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" fontFamily="system-ui">DEAL</text>
      <text x="33" y="50" textAnchor="middle" fontSize="9" fontWeight="700" fill="#bfdbfe" fontFamily="system-ui">$49.99</text>
      <line x1="32" y1="30" x2="32" y2="22" stroke="#1d4ed8" strokeWidth="1.5"/>
      <circle cx="32" cy="21" r="2" fill="#1d4ed8"/>
    </svg>
  );
}

function Scene_Doc({ shade }: { shade: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="docbg" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#f0fdf4"/>
          <stop offset="100%" stopColor="#dcfce7"/>
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#docbg)"/>
      {/* Doc shadow */}
      <rect x="48" y="18" width="108" height="100" rx="10" fill={shade} opacity="0.12" transform="translate(4,4)"/>
      {/* Doc surface */}
      <rect x="44" y="14" width="112" height="104" rx="10" fill="white" opacity="0.94"/>
      {/* Header accent */}
      <rect x="44" y="14" width="112" height="22" rx="10" fill={shade} opacity="0.18"/>
      {/* Person icon */}
      <circle cx="68" cy="25" r="7" fill={shade} opacity="0.35"/>
      {/* Name line */}
      <rect x="80" y="20" width="62" height="6" rx="3" fill={shade} opacity="0.45"/>
      <rect x="80" y="30" width="42" height="4" rx="2" fill={shade} opacity="0.25"/>
      {/* Body lines */}
      <rect x="54" y="46" width="92" height="4" rx="2" fill={shade} opacity="0.22"/>
      <rect x="54" y="55" width="80" height="4" rx="2" fill={shade} opacity="0.18"/>
      <rect x="54" y="64" width="86" height="4" rx="2" fill={shade} opacity="0.22"/>
      <rect x="54" y="73" width="70" height="4" rx="2" fill={shade} opacity="0.15"/>
      <rect x="54" y="82" width="82" height="4" rx="2" fill={shade} opacity="0.2"/>
      <rect x="54" y="91" width="75" height="4" rx="2" fill={shade} opacity="0.15"/>
      <rect x="54" y="100" width="60" height="4" rx="2" fill={shade} opacity="0.12"/>
      {/* Check badge */}
      <circle cx="140" cy="24" r="9" fill={shade} opacity="0.22"/>
      <path d="M136 24 L139 27 L146 20" stroke={shade} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Scene_Lens() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="lbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb"/>
          <stop offset="100%" stopColor="#fef3c7"/>
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#lbg)"/>
      {/* Article lines (background text) */}
      <rect x="14" y="16" width="172" height="5" rx="2.5" fill="#a16207" opacity="0.14"/>
      <rect x="14" y="25" width="150" height="4" rx="2" fill="#a16207" opacity="0.1"/>
      <rect x="14" y="33" width="162" height="4" rx="2" fill="#a16207" opacity="0.1"/>
      <rect x="14" y="41" width="140" height="4" rx="2" fill="#a16207" opacity="0.1"/>
      <rect x="14" y="49" width="155" height="4" rx="2" fill="#a16207" opacity="0.1"/>
      <rect x="14" y="57" width="148" height="4" rx="2" fill="#a16207" opacity="0.1"/>
      {/* Magnifying glass */}
      <circle cx="90" cy="80" r="36" fill="#fef9c3" opacity="0.75"/>
      <circle cx="90" cy="80" r="32" stroke="#d97706" strokeWidth="6" fill="white" opacity="0.9"/>
      <circle cx="90" cy="80" r="20" fill="#fef9c3" opacity="0.6"/>
      {/* Handle */}
      <line x1="114" y1="104" x2="138" y2="128" stroke="#92400e" strokeWidth="8" strokeLinecap="round"/>
      {/* Highlighted lines under lens */}
      <rect x="72" y="72" width="36" height="4" rx="2" fill="#d97706" opacity="0.4"/>
      <rect x="68" y="80" width="44" height="4" rx="2" fill="#d97706" opacity="0.3"/>
      <rect x="75" y="88" width="30" height="4" rx="2" fill="#d97706" opacity="0.25"/>
    </svg>
  );
}

function Scene_Split() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="spa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f3ff"/>
          <stop offset="100%" stopColor="#ede9fe"/>
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#spa)"/>
      {/* Left panel */}
      <rect x="8" y="14" width="86" height="115" rx="10" fill="white" opacity="0.85"/>
      <rect x="8" y="14" width="86" height="18" rx="10" fill="#7c3aed" opacity="0.22"/>
      <rect x="16" y="42" width="70" height="5" rx="2.5" fill="#7c3aed" opacity="0.32"/>
      <rect x="16" y="52" width="58" height="4" rx="2" fill="#7c3aed" opacity="0.18"/>
      <rect x="16" y="61" width="64" height="4" rx="2" fill="#7c3aed" opacity="0.15"/>
      <rect x="16" y="70" width="52" height="4" rx="2" fill="#7c3aed" opacity="0.18"/>
      <rect x="16" y="79" width="60" height="4" rx="2" fill="#7c3aed" opacity="0.15"/>
      {/* Left score */}
      <rect x="16" y="100" width="70" height="18" rx="6" fill="#7c3aed" opacity="0.12"/>
      <text x="51" y="113" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed" fontFamily="system-ui">Option A</text>
      {/* Right panel */}
      <rect x="106" y="14" width="86" height="115" rx="10" fill="white" opacity="0.85"/>
      <rect x="106" y="14" width="86" height="18" rx="10" fill="#7c3aed" opacity="0.22"/>
      <rect x="114" y="42" width="70" height="5" rx="2.5" fill="#7c3aed" opacity="0.32"/>
      <rect x="114" y="52" width="58" height="4" rx="2" fill="#7c3aed" opacity="0.18"/>
      <rect x="114" y="61" width="64" height="4" rx="2" fill="#7c3aed" opacity="0.15"/>
      <rect x="114" y="70" width="52" height="4" rx="2" fill="#7c3aed" opacity="0.18"/>
      <rect x="114" y="79" width="60" height="4" rx="2" fill="#7c3aed" opacity="0.15"/>
      <rect x="114" y="100" width="70" height="18" rx="6" fill="#7c3aed" opacity="0.12"/>
      <text x="149" y="113" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed" fontFamily="system-ui">Option B</text>
      {/* VS badge */}
      <circle cx="100" cy="72" r="12" fill="#7c3aed"/>
      <text x="100" y="76" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="system-ui">VS</text>
    </svg>
  );
}

function Scene_Envelope({ hue }: { hue: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="envbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fafafa"/>
          <stop offset="100%" stopColor="#f1f5f9"/>
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#envbg)"/>
      {/* Shadow */}
      <rect x="26" y="36" width="148" height="82" rx="14" fill={hue} opacity="0.08" transform="translate(3,4)"/>
      {/* Envelope body */}
      <rect x="24" y="32" width="152" height="82" rx="14" fill="white" opacity="0.95"/>
      {/* Fold lines */}
      <path d="M24 46 L100 84 L176 46" stroke={hue} strokeWidth="1.5" opacity="0.3"/>
      <path d="M24 114 L76 76" stroke={hue} strokeWidth="1" opacity="0.2"/>
      <path d="M176 114 L124 76" stroke={hue} strokeWidth="1" opacity="0.2"/>
      {/* Content hint */}
      <rect x="48" y="60" width="104" height="5" rx="2.5" fill={hue} opacity="0.2"/>
      <rect x="56" y="70" width="88" height="4" rx="2" fill={hue} opacity="0.15"/>
      <rect x="62" y="79" width="76" height="4" rx="2" fill={hue} opacity="0.12"/>
      {/* Sender avatar */}
      <circle cx="46" cy="42" r="8" fill={hue} opacity="0.2"/>
      <circle cx="46" cy="39" r="4" fill={hue} opacity="0.35"/>
      <path d="M38 50 Q46 46 54 50" stroke={hue} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round"/>
      {/* Star / badge */}
      <circle cx="154" cy="42" r="9" fill={hue} opacity="0.15"/>
      <path d="M154 35 L156 41 L162 41 L157 45 L159 51 L154 47 L149 51 L151 45 L146 41 L152 41Z"
            fill={hue} opacity="0.6"/>
    </svg>
  );
}

function Scene_Terminal() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="tmbg" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#0f172a"/>
          <stop offset="100%" stopColor="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#tmbg)" rx="0"/>
      {/* Window chrome */}
      <rect x="0" y="0" width="200" height="22" fill="#334155" opacity="0.7"/>
      <circle cx="14" cy="11" r="5" fill="#f87171" opacity="0.82"/>
      <circle cx="28" cy="11" r="5" fill="#fbbf24" opacity="0.82"/>
      <circle cx="42" cy="11" r="5" fill="#4ade80" opacity="0.82"/>
      <text x="100" y="15" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">terminal</text>
      {/* Code lines */}
      <text x="14" y="38" fontSize="9" fill="#4ade80" fontFamily="monospace">$ npm run dev</text>
      <text x="14" y="52" fontSize="9" fill="#94a3b8" fontFamily="monospace">  ready in 382ms</text>
      <text x="14" y="66" fontSize="9" fill="#f87171" fontFamily="monospace">ERROR: undefined</text>
      <text x="14" y="80" fontSize="9" fill="#94a3b8" fontFamily="monospace">  at App.tsx:42:8</text>
      <text x="14" y="94" fontSize="9" fill="#60a5fa" fontFamily="monospace">→ const data = <tspan fill="#fbbf24">await</tspan></text>
      <text x="14" y="108" fontSize="9" fill="#94a3b8" fontFamily="monospace">    fetch('/api')</text>
      {/* Cursor */}
      <rect x="14" y="118" width="7" height="10" rx="1" fill="#60a5fa" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite"/>
      </rect>
    </svg>
  );
}

// ── Single ellipse card ───────────────────────────────────────────────────
function EllipseCard({
  card,
  baseAngleDeg,
  wheelRot,
}: {
  card: CardDef;
  baseAngleDeg: number;
  wheelRot: ReturnType<typeof useMotionValue<number>>;
}) {
  const toRad = (d: number) => (d * Math.PI) / 180;

  // x,y on the ellipse (wheel-pivot at origin)
  const x = useTransform(wheelRot, (v) => Math.sin(toRad(baseAngleDeg + v)) * RX);
  const y = useTransform(wheelRot, (v) => -Math.cos(toRad(baseAngleDeg + v)) * RY);

  // cos of current angle → depth proxy
  const cosA = useTransform(wheelRot, (v) => Math.cos(toRad(baseAngleDeg + v)));

  // Depth scale: prominent center, smaller at sides
  const scale = useTransform(cosA, (c) => 0.48 + 0.52 * Math.max(c, 0));

  // Opacity: full at top, gone below horizon
  const opacity = useTransform(cosA, (c) =>
    c > 0.1 ? Math.min(1, 0.35 + 0.75 * c) : Math.max(0, c * 2 + 0.2)
  );

  // Tilt: cards LEAN with the arc (not counter-rotated) — matches the screenshot
  const rotate = useTransform(wheelRot, (v) => {
    const a = toRad(baseAngleDeg + v);
    return -Math.sin(a) * 26;
  });

  // z-index driven by depth
  const zIndex = useTransform(cosA, (c) => Math.round(60 + c * 60));

  // Offset card center to (x, y)
  const lx = useTransform(x, (v) => v - CARD_W / 2);
  const ly = useTransform(y, (v) => v - CARD_H / 2);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: CARD_W,
        height: CARD_H,
        x: lx,
        y: ly,
        scale,
        opacity,
        rotate,
        zIndex,
        transformOrigin: "center center",
      }}
    >
      {/* Card shell */}
      <div
        className="w-full h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          boxShadow: "0 18px 52px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)",
          background: "#fff",
        }}
      >
        {/* Full-bleed scene image */}
        <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          {card.scene}
        </div>

        {/* Label strip — slightly frosted */}
        <div
          className="flex-shrink-0 px-3 py-2.5"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderTop: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <p
            className="font-medium leading-snug italic"
            style={{ fontSize: "0.72rem", color: "#374151", lineHeight: 1.3 }}
          >
            {card.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Hero component ───────────────────────────────────────────────────
export default function HeroCards() {
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velRef = useRef<{ time: number; velocity: number }>({ time: 0, velocity: 0 });
  const momentumAnim = useRef<ReturnType<typeof animate> | null>(null);
  const autoAnim = useRef<ReturnType<typeof animate> | null>(null);

  const startAutoRotate = useCallback(() => {
    autoAnim.current?.stop();
    autoAnim.current = animate(rotation, rotation.get() - 360 * 6, {
      duration: 150,
      ease: "linear",
      repeat: Infinity,
    });
  }, [rotation]);

  useEffect(() => {
    const t = setTimeout(startAutoRotate, 1400);
    return () => clearTimeout(t);
  }, [startAutoRotate]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    autoAnim.current?.stop();
    momentumAnim.current?.stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current = true;
    lastX.current = e.clientX;
    velRef.current = { time: Date.now(), velocity: 0 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    const now = Date.now();
    const dt = Math.max(now - velRef.current.time, 1);
    const delta = dx * 0.17;
    velRef.current = { time: now, velocity: (delta / dt) * 16 };
    rotation.set(rotation.get() + delta);
    lastX.current = e.clientX;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const v = velRef.current.velocity;
    const target = rotation.get() + v * 26;
    momentumAnim.current = animate(rotation, target, {
      type: "spring",
      velocity: v,
      stiffness: 24,
      damping: 18,
      restDelta: 0.01,
      onComplete: () => setTimeout(startAutoRotate, 2200),
    });
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center overflow-hidden"
      style={{ background: "linear-gradient(170deg,#fdf4ee 0%,#f6e8df 50%,#ede1d8 100%)" }}
    >
      {/* Soft ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,200,165,0.28) 0%, transparent 70%)",
        }}
      />

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-between px-8 py-5 max-w-5xl mx-auto z-20"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold"
            style={{ background: "linear-gradient(135deg,#0078d4,#0050a0)" }}
          >
            AI
          </div>
          <span className="font-semibold text-sm" style={{ color: "#3d2b1f" }}>
            Copilot Hero
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium px-4 py-2 rounded-full" style={{ color: "#5a3a2c" }}>
            Personal
          </button>
          <button className="text-sm font-medium px-4 py-2 rounded-full bg-white/60 border border-black/8">
            Professional
          </button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm font-semibold px-5 py-2.5 rounded-full text-white shadow-md"
            style={{ background: "linear-gradient(135deg,#0078d4,#0050a0)" }}
          >
            Get started
          </motion.button>
        </div>
      </motion.header>

      {/* ── Hero text ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.15 }}
        className="text-center mt-4 mb-5 z-20 px-4"
      >
        <h1
          className="font-bold leading-tight mb-3"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
            color: "#150d07",
            letterSpacing: "-0.025em",
          }}
        >
          What starts here,
          <br />
          becomes reality
        </h1>
        <p className="text-base max-w-sm mx-auto" style={{ color: "#9a7060" }}>
          Drag to explore what Copilot can do for you
        </p>
      </motion.div>

      {/* ── Search bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3 }}
        className="relative z-20 mb-8"
      >
        <div
          className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-white/95"
          style={{
            border: "1px solid rgba(180,140,120,0.22)",
            minWidth: 340,
            maxWidth: 500,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 0 0 1px rgba(255,255,255,0.9)",
          }}
        >
          {/* Copilot coloured ring icon */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none">
            <circle cx="12" cy="12" r="10" stroke="url(#cp)" strokeWidth="2.5" fill="none"/>
            <defs>
              <linearGradient id="cp" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0078d4"/>
                <stop offset="50%" stopColor="#8b5cf6"/>
                <stop offset="100%" stopColor="#ec4899"/>
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="3" fill="#0078d4" opacity="0.6"/>
          </svg>
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#2d1f17" }}
            placeholder="Write to Copilot..."
          />
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 opacity-35" fill="none" stroke="#555" strokeWidth="2">
              <path d="M12 1v22M1 12h22" strokeLinecap="round"/>
            </svg>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#0078d4,#0050a0)" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Ellipse wheel ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="relative w-full z-10 flex-shrink-0"
        style={{ height: CONTAINER_H, cursor: "grab", userSelect: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Pivot at bottom-center */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", width: 0, height: 0 }}>
          {CARDS.map((card, i) => (
            <EllipseCard
              key={card.id}
              card={card}
              baseAngleDeg={i * DEG_STEP}
              wheelRot={rotation}
            />
          ))}
        </div>

        {/* Horizon fade */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: 100,
            background: "linear-gradient(to bottom, transparent 0%, rgba(237,225,216,0.97) 100%)",
          }}
        />
        {/* Left edge fade */}
        <div
          className="absolute top-0 left-0 h-full w-36 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(246,232,223,0.95) 0%, transparent 100%)",
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute top-0 right-0 h-full w-36 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(246,232,223,0.95) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      <div className="flex-1" />
    </div>
  );
}

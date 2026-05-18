import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, Beer, Fish, Package, RotateCcw, X, Clock, Sparkles, PartyPopper } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BARS_ON_ROUTE = [
  { name: "Bar Pod Złotym Karpiem", street: "ul. Panieńska", x: 28, y: 62, delay: 1500 },
  { name: "Knajpa U Wujka Staszka", street: "ul. Grodzka", x: 45, y: 48, delay: 2000 },
  { name: "Piwiarnia Na Rogu", street: "ul. Kurkowa", x: 58, y: 35, delay: 1800 },
  { name: "Whisky Bar Dno", street: "ul. Mostowa", x: 72, y: 55, delay: 2200 },
  { name: "Stacja Paliw (z barem)", street: "ul. Łucznicza", x: 82, y: 28, delay: 1600 },
];

const DELIVERY_PATH = [
  { x: 15, y: 78 },
  { x: 28, y: 62 },
  { x: 45, y: 48 },
  { x: 58, y: 35 },
  { x: 72, y: 55 },
  { x: 82, y: 28 },
  { x: 90, y: 15 },
];

type StepType = "order" | "warehouse" | "select" | "bar" | "thought" | "riding" | "delivered";

interface DeliveryStep {
  text: string;
  icon: string;
  delay: number;
  type: StepType;
  barIndex?: number;
}

const generateOrderId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "UF-";
  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const getElapsedTime = (startTime: number | null) => {
  if (!startTime) return "0:00";
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const STEP_COLORS: Record<StepType, { bg: string; border: string; text: string; iconBg: string; glow: string }> = {
  order: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", iconBg: "bg-emerald-500/20", glow: "shadow-[0_0_12px_rgba(16,185,129,0.3)]" },
  warehouse: { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-400", iconBg: "bg-sky-500/20", glow: "shadow-[0_0_12px_rgba(14,165,233,0.3)]" },
  select: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", iconBg: "bg-violet-500/20", glow: "shadow-[0_0_12px_rgba(139,92,246,0.3)]" },
  bar: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", iconBg: "bg-amber-500/20", glow: "shadow-[0_0_12px_rgba(245,158,11,0.3)]" },
  thought: { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400", iconBg: "bg-pink-500/20", glow: "shadow-[0_0_12px_rgba(236,72,153,0.3)]" },
  riding: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", iconBg: "bg-orange-500/20", glow: "shadow-[0_0_12px_rgba(249,115,22,0.3)]" },
  delivered: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", iconBg: "bg-green-500/20", glow: "shadow-[0_0_12px_rgba(34,197,94,0.3)]" },
};

const STEP_ENTRANCE = [
  { initial: { opacity: 0, x: -40, scale: 0.8 }, animate: { opacity: 1, x: 0, scale: 1 } },
  { initial: { opacity: 0, y: 20, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } },
  { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 } },
  { initial: { opacity: 0, x: 40, scale: 0.8 }, animate: { opacity: 1, x: 0, scale: 1 } },
  { initial: { opacity: 0, y: -20, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } },
];

const ConfettiParticles = () => {
  const colors = ["#f59e0b", "#ef4444", "#ec4899", "#8b5cf6", "#06b6d4", "#22c55e", "#f97316"];
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${5 + Math.random() * 90}%`,
    delay: Math.random() * 1.5,
    size: 4 + Math.random() * 6,
    duration: 1.5 + Math.random() * 1.5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: p.left,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const SzczecinMap = ({ activeBars, fishPosition, visitedBarIndices }: {
  activeBars: typeof BARS_ON_ROUTE;
  fishPosition: { x: number; y: number } | null;
  visitedBarIndices: Set<number>;
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a2e]" />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="35" cy="25" rx="8" ry="5" fill="#2d5a3d" opacity="0.4" />
        <ellipse cx="60" cy="20" rx="6" ry="4" fill="#2d5a3d" opacity="0.3" />
        <ellipse cx="75" cy="70" rx="7" ry="5" fill="#2d5a3d" opacity="0.35" />
      </svg>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="50%" stopColor="#244b7a" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </linearGradient>
        </defs>
        <path
          d="M -5 100 Q 15 85 20 70 Q 25 55 30 45 Q 35 35 40 30 Q 50 20 60 15 Q 70 10 80 5 Q 90 0 105 -5 L 105 20 Q 90 15 80 20 Q 70 25 60 30 Q 50 35 40 45 Q 35 55 30 65 Q 25 75 20 85 Q 15 95 -5 110 Z"
          fill="url(#riverGrad)"
          opacity="0.8"
        />
        <path
          d="M -5 100 Q 15 85 20 70 Q 25 55 30 45 Q 35 35 40 30 Q 50 20 60 15 Q 70 10 80 5 Q 90 0 105 -5"
          fill="none"
          stroke="#3a6b9f"
          strokeWidth="0.3"
          opacity="0.5"
        />
      </svg>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <line x1="10" y1="80" x2="90" y2="15" stroke="#3a3a4a" strokeWidth="1.2" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="#3a3a4a" strokeWidth="1" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="#3a3a4a" strokeWidth="1" />
        <line x1="15" y1="90" x2="85" y2="10" stroke="#3a3a4a" strokeWidth="0.8" />
        <line x1="25" y1="95" x2="75" y2="5" stroke="#3a3a4a" strokeWidth="0.6" />
        <line x1="20" y1="70" x2="80" y2="20" stroke="#2a2a3a" strokeWidth="0.5" />
        <line x1="35" y1="85" x2="65" y2="15" stroke="#2a2a3a" strokeWidth="0.5" />
        <line x1="10" y1="35" x2="90" y2="35" stroke="#2a2a3a" strokeWidth="0.5" />
        <line x1="40" y1="95" x2="40" y2="5" stroke="#2a2a3a" strokeWidth="0.5" />
        <line x1="60" y1="95" x2="60" y2="5" stroke="#2a2a3a" strokeWidth="0.5" />
        <line x1="15" y1="60" x2="85" y2="60" stroke="#2a2a3a" strokeWidth="0.4" />
        <line x1="20" y1="40" x2="80" y2="40" stroke="#2a2a3a" strokeWidth="0.4" />
        <text x="52" y="48" fill="#6a6a7a" fontSize="2.5" fontFamily="monospace" transform="rotate(-40, 52, 48)">ul. Panieńska</text>
        <text x="52" y="52" fill="#6a6a7a" fontSize="2.5" fontFamily="monospace">ul. Grodzka</text>
        <text x="51" y="30" fill="#6a6a7a" fontSize="2.5" fontFamily="monospace">ul. Kurkowa</text>
        <text x="52" y="58" fill="#6a6a7a" fontSize="2.5" fontFamily="monospace">ul. Mostowa</text>
        <text x="82" y="26" fill="#6a6a7a" fontSize="2.5" fontFamily="monospace">ul. Łucznicza</text>
        <text x="52" y="65" fill="#6a6a7a" fontSize="2.5" fontFamily="monospace">ul. Zamkowa</text>
      </svg>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {[
          { x: 22, y: 55, w: 4, h: 3 },
          { x: 30, y: 50, w: 3, h: 4 },
          { x: 38, y: 42, w: 5, h: 3 },
          { x: 48, y: 38, w: 3, h: 4 },
          { x: 55, y: 45, w: 4, h: 3 },
          { x: 65, y: 50, w: 3, h: 5 },
          { x: 75, y: 35, w: 4, h: 3 },
          { x: 85, y: 22, w: 3, h: 4 },
          { x: 42, y: 55, w: 4, h: 3 },
          { x: 58, y: 60, w: 3, h: 4 },
          { x: 35, y: 65, w: 5, h: 3 },
          { x: 68, y: 42, w: 3, h: 4 },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="#2a2a3a" opacity="0.6" rx="0.3" />
        ))}
      </svg>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4a017" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4a017" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polyline
          points={DELIVERY_PATH.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="1.5"
          strokeDasharray="2 1.5"
          filter="url(#glow)"
          opacity="0.8"
        />
      </svg>

      <div className="absolute" style={{ left: "15%", top: "78%" }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-green-600/60 border border-green-500 flex items-center justify-center">
            <span className="text-[6px]">📦</span>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[8px] text-green-400/80 whitespace-nowrap font-mono">
            Magazyn
          </div>
        </div>
      </div>

      <div className="absolute" style={{ left: "90%", top: "15%" }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 rounded-full bg-beer-gold/30 border-2 border-beer-gold animate-pulse flex items-center justify-center">
            <span className="text-[8px]">🏠</span>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[8px] text-beer-gold/80 whitespace-nowrap font-mono">
            ul. Łucznicza
          </div>
        </div>
      </div>

      {activeBars.map((bar, i) => {
        const isVisited = visitedBarIndices.has(i);
        return (
          <motion.div
            key={bar.name}
            className="absolute"
            style={{ left: `${bar.x}%`, top: `${bar.y}%` }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.3, type: "spring", stiffness: 260, damping: 15 }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2 group">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                isVisited
                  ? "bg-amber-500/40 border border-amber-400/60 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                  : "bg-beer-dark/60 border border-beer-amber/30"
              }`}>
                <Beer className={`h-3 w-3 transition-all duration-300 ${isVisited ? "text-amber-400 animate-beer-cheers" : "text-beer-amber/50"}`} />
              </div>
              {isVisited && (
                <div className="absolute inset-0 rounded-full animate-pulse-ring border border-amber-400/30" />
              )}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-beer-dark/90 text-[9px] text-beer-foam/80 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-amber-500/30 backdrop-blur-sm">
                <div className="font-semibold text-amber-400">{bar.name}</div>
                <div className="text-[7px] text-amber-400/60">{bar.street}</div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {fishPosition && (
        <motion.div
          className="absolute z-10"
          animate={{
            left: `${fishPosition.x}%`,
            top: `${fishPosition.y}%`,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2 animate-wiggle">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg animate-pulse scale-[2]" />
            <div className="absolute inset-0 bg-amber-400/15 rounded-full blur-md animate-pulse scale-150" />
            <Fish className="h-7 w-7 md:h-9 md:w-9 text-cyan-400 relative z-10 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
          </div>
        </motion.div>
      )}

      <div className="absolute bottom-2 left-2 px-2 py-1 bg-beer-dark/80 rounded text-[7px] font-mono backdrop-blur-sm border border-cyan-500/20">
        <span className="text-cyan-400/80">Szczecin</span> <span className="text-muted-foreground/40">·</span> <span className="text-violet-400/80">Stare Miasto</span> <span className="text-muted-foreground/40">·</span> <span className="text-amber-400/60">[symulacja]</span>
      </div>

      <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center animate-spin-slow">
        <svg viewBox="0 0 24 24" className="w-full h-full opacity-60">
          <polygon points="12,2 14,12 12,10 10,12" fill="#06b6d4" />
          <polygon points="12,22 10,12 12,14 14,12" fill="#8b5cf6" />
          <text x="12" y="6" textAnchor="middle" fontSize="3" fill="#06b6d4" fontWeight="bold">N</text>
        </svg>
      </div>
    </div>
  );
};

const DeliveryTracker = () => {
  const [started, setStarted] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [steps, setSteps] = useState<DeliveryStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [fiszThought, setFiszThought] = useState("");
  const [orderId] = useState(() => generateOrderId());
  const [activeBars, setActiveBars] = useState<typeof BARS_ON_ROUTE>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState("0:00");
  const [visitedBarIndices, setVisitedBarIndices] = useState<Set<number>>(new Set());

  const FISZ_THOUGHTS = [
    "Fisz ładuje paczkę na bagażnik 🚲",
    "Fisz sprawdza adres... hmm, gdzie to jest?",
    `Fisz mija ${BARS_ON_ROUTE[0].name}... tylko rzucę okiem 👀`,
    "Fisz wziął jednego na drogę. To rozgrzewka! 🍺",
    "Fisz mówi: 'Jeszcze jeden browar i jadę' 🍻",
    "Fisz wsiada na rower... po 3 kuflach. To będzie ciekawe.",
    "Fisz wraca do baru... zapomniał kapelusza! 🎩",
    "Fisz znowu w barze. Kurierem jest, prawa ma. 🐟",
    "Fisz gubi paczkę. Szuka pod stołem. 📦",
    "Fisz znalazł paczkę! Kierunek — Twój dom! 🏠",
    "Fisz sprawdza ciśnienie w oponach... sprawdza też ciśnienie w kuflu.",
    "OSTATECZNIE Fisz jedzie do Ciebie! (Po 5 piwach to już na serio)",
  ];

  const generateSteps = () => {
    const result: DeliveryStep[] = [
      { text: "Przyjęto zamówienie — Fisz dostał cynk!", icon: "📋", delay: 500, type: "order" },
      { text: "Fisz idzie do magazynu", icon: "🏭", delay: 1000, type: "warehouse" },
      { text: "Wybiera najlepsze butelki", icon: "🍾", delay: 1200, type: "select" },
    ];

    const numBars = 2 + Math.floor(Math.random() * 4);
    const shuffled = [...BARS_ON_ROUTE].sort(() => Math.random() - 0.5).slice(0, numBars);
    setActiveBars(shuffled);

    for (let i = 0; i < numBars; i++) {
      result.push({
        text: `Fisz zatrzymuje się w: ${shuffled[i].name}`,
        icon: "🍺",
        delay: shuffled[i].delay,
        type: "bar",
        barIndex: i,
      });
      if (Math.random() > 0.5) {
        result.push({
          text: FISZ_THOUGHTS[Math.floor(Math.random() * FISZ_THOUGHTS.length)],
          icon: "🤔",
          delay: 1000 + Math.random() * 2000,
          type: "thought",
        });
      }
    }

    result.push({ text: "Fisz jedzie prosto do Ciebie! 🚀", icon: "🚴", delay: 2000, type: "riding" });
    result.push({ text: "Paczka dostarczona! Fisz oddaje pokłon płetwą 🐟🎩", icon: "✅", delay: 500, type: "delivered" });

    return result;
  };

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!started || delivered) return;
    const interval = setInterval(() => {
      setElapsed(getElapsedTime(startTimeRef.current));
    }, 1000);
    return () => clearInterval(interval);
  }, [started, delivered]);

  useEffect(() => {
    if (currentStep >= 0 && stepsContainerRef.current) {
      const activeEl = stepsContainerRef.current.querySelector(`[data-step="${currentStep}"]`);
      if (activeEl) {
        setTimeout(() => {
          activeEl.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
      }
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep >= 0 && steps.length > 0) {
      const newVisited = new Set<number>();
      for (let i = 0; i <= currentStep; i++) {
        if (steps[i].type === "bar" && steps[i].barIndex !== undefined) {
          newVisited.add(steps[i].barIndex);
        }
      }
      setVisitedBarIndices(newVisited);
    }
  }, [currentStep, steps]);

  const startDelivery = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStarted(true);
    setDelivered(false);
    setCurrentStep(-1);
    setVisitedBarIndices(new Set());
    setStartTime(Date.now());
    startTimeRef.current = Date.now();
    setElapsed("0:00");
    const newSteps = generateSteps();
    setSteps(newSteps);

    let totalDelay = 0;
    newSteps.forEach((step, i) => {
      totalDelay += step.delay;
      const id = setTimeout(() => {
        setCurrentStep(i);
        setFiszThought(
          FISZ_THOUGHTS[Math.floor(Math.random() * FISZ_THOUGHTS.length)]
        );
        if (i === newSteps.length - 1) {
          setDelivered(true);
        }
      }, totalDelay);
      timersRef.current.push(id);
    });
  };

  const cancelDelivery = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStarted(false);
    setDelivered(false);
    setCurrentStep(-1);
    setSteps([]);
    setFiszThought("");
    setStartTime(null);
    startTimeRef.current = null;
    setElapsed("0:00");
    setVisitedBarIndices(new Set());
  };

  const barStepsCount = useMemo(() => steps.filter(s => s.type === "bar").length, [steps]);
  const visitedBarsCount = visitedBarIndices.size;
  const progress = steps.length > 0 && currentStep >= 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  const fishPathIndex = useMemo(() => {
    if (currentStep < 0) return 0;
    let barCount = 0;
    for (let i = 0; i <= currentStep; i++) {
      if (steps[i]?.type === "bar") barCount++;
    }
    return Math.min(barCount + 1, DELIVERY_PATH.length - 1);
  }, [currentStep, steps]);

  const fishPosition = started && !delivered ? DELIVERY_PATH[fishPathIndex] : null;

  const statusLabel = useMemo(() => {
    if (!started) return "Oczekiwanie";
    if (delivered) return "Dostarczono";
    const current = steps[currentStep];
    if (!current) return "Przygotowanie...";
    switch (current.type) {
      case "order": return "📋 Przyjęto zamówienie";
      case "warehouse": return "🏭 W magazynie";
      case "select": return "🍾 Wybór produktów";
      case "bar": return "🍺 Postój w barze";
      case "thought": return "🤔 Fisz się zastanawia...";
      case "riding": return "🚴 W drodze do Ciebie";
      default: return "📦 W dostawie";
    }
  }, [started, delivered, currentStep, steps]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <section className="relative pt-28 pb-16 min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-beer-dark via-beer-stout/20 to-beer-dark pointer-events-none" />
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

        <div className="relative container mx-auto px-4 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10 text-cyan-400 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-cyan-500/20 tracking-widest uppercase">
              <Truck className="h-3.5 w-3.5 animate-truck-drive" />
              Dostawca Fisz
              <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient-ocean">Śledź swoją</span>{" "}
              <span className="shimmer-text">paczkę</span>
            </h1>
            <p className="text-sm max-w-md mx-auto">
              <span className="text-cyan-400/70">Fisz</span>{" "}
              <span className="text-muted-foreground">osobiście dostarcza Twoje zamówienie... podobno.</span>{" "}
              <span className="text-amber-400/70">Śledź</span>{" "}
              <span className="text-muted-foreground">jego (mniej więcej) trasę.</span>{" "}
              <span className="text-violet-400/70">🐟📦</span>
            </p>
            {started && (
              <p className="text-xs mt-2 font-mono">
                <span className="text-violet-400/60">Zamówienie:</span>{" "}
                <span className="text-cyan-400/80 animate-rainbow-text">{orderId}</span>
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-5 md:p-8 border border-beer-gold/15"
          >
            {started && (
              <div className="mb-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-cyan-400/70 font-semibold">Postęp dostawy</span>
                    <span className="text-xs text-amber-400/70 font-mono">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-beer-dark/50" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${delivered ? "bg-green-500" : "bg-cyan-400 animate-pulse"}`} />
                    <span className={`font-semibold ${delivered ? "text-green-400" : "text-cyan-400"}`}>{statusLabel}</span>
                  </div>
                  <div className="flex items-center gap-1 text-violet-400/60">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono">{elapsed}</span>
                  </div>
                </div>

                {barStepsCount > 0 && (
                  <div className="flex items-center gap-2 text-xs text-amber-400/60">
                    <Beer className="h-3 w-3 animate-beer-cheers" />
                    <span>Postoje w barach: <span className="text-amber-400 font-bold">{visitedBarsCount}</span>/<span className="text-amber-400/60">{barStepsCount}</span></span>
                  </div>
                )}
              </div>
            )}

            <div className="relative rounded-2xl overflow-hidden mb-6 border border-beer-gold/10 bg-beer-dark/50" style={{ aspectRatio: '1 / 1', minHeight: '200px' }}>
              {!started ? (
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-cyan-400/40 mx-auto mb-2 animate-bounce" />
                  <p className="text-xs">
                    <span className="text-violet-400/60">Mapa</span>{" "}
                    <span className="text-cyan-400/60">Szczecina</span>{" "}
                    <span className="text-amber-400/40">[symulacja]</span>
                  </p>
                </div>
              ) : (
                <SzczecinMap
                  activeBars={activeBars}
                  fishPosition={fishPosition}
                  visitedBarIndices={visitedBarIndices}
                />
              )}
            </div>

            {!started ? (
              <div className="text-center">
                <Button
                  onClick={startDelivery}
                  className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 hover:from-cyan-400 hover:via-violet-400 hover:to-pink-400 text-white font-bold gap-2 px-8 min-h-[44px] shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300"
                >
                  <Package className="h-4 w-4" />
                  Rozpocznij śledzenie paczki
                  <Sparkles className="h-3.5 w-3.5" />
                </Button>
                <p className="text-[11px] mt-3 italic">
                  <span className="text-pink-400/50">*</span>{" "}
                  <span className="text-cyan-400/50">Fisz</span>{" "}
                  <span className="text-muted-foreground/50">nie gwarantuje szybkości, trzeźwości ani dotarcia paczki</span>{" "}
                  <span className="text-amber-400/50">🚲🍺</span>
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Truck className="h-3.5 w-3.5 text-cyan-400 animate-truck-drive" />
                    <span className="text-gradient-neon">Historia dostawy:</span>
                  </div>
                  {!delivered && (
                    <Button
                      onClick={cancelDelivery}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-muted-foreground/60 hover:text-red-400 min-h-[32px]"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Anuluj
                    </Button>
                  )}
                </div>

                <div ref={stepsContainerRef} className="max-h-[50vh] overflow-y-auto pr-1 space-y-3">
                  <AnimatePresence mode="sync">
                    {steps.slice(0, currentStep + 1).map((step, i) => {
                      const done = i < currentStep;
                      const active = i === currentStep && !delivered;
                      const isDeliveredStep = i === currentStep && delivered;
                      const colors = STEP_COLORS[step.type] || STEP_COLORS.order;
                      const entrance = STEP_ENTRANCE[i % STEP_ENTRANCE.length];

                      return (
                        <motion.div
                          key={`step-${i}`}
                          data-step={i}
                          initial={entrance.initial}
                          animate={entrance.animate}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          layout
                          className="flex items-start gap-3"
                        >
                          <motion.div
                            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm flex-shrink-0 ${
                              done || isDeliveredStep
                                ? `${colors.iconBg} border ${colors.border} ${colors.text}`
                                : `${colors.iconBg} border-2 ${colors.border} ${colors.text} ${colors.glow}`
                            }`}
                            animate={
                              active
                                ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }
                                : { scale: 1, rotate: 0 }
                            }
                            transition={
                              active
                                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                                : { duration: 0.3 }
                            }
                          >
                            {done || isDeliveredStep ? "✓" : step.icon}
                          </motion.div>
                          <div className="flex-1 pt-0.5 min-w-0">
                            <p
                              className={`text-sm break-words font-semibold ${
                                done || isDeliveredStep
                                  ? `${colors.text} opacity-70 line-through decoration-1 decoration-current/30`
                                  : `${colors.text}`
                              }`}
                            >
                              {step.text}
                              {active && step.type === "thought" && (
                                <span className="inline-block ml-1">
                                  <span className="typing-dot-1">.</span>
                                  <span className="typing-dot-2">.</span>
                                  <span className="typing-dot-3">.</span>
                                </span>
                              )}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {currentStep >= 0 && !delivered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`thought-${currentStep}`}
                    className="mt-4 p-3 rounded-xl bg-gradient-to-r from-pink-500/5 via-violet-500/5 to-cyan-500/5 border border-pink-500/15 text-center"
                  >
                    <p className="text-xs italic">
                      <span className="text-pink-400/80">💭</span>{" "}
                      <span className="text-violet-400/70">{fiszThought}</span>
                    </p>
                  </motion.div>
                )}

                {delivered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mt-5 text-center relative overflow-hidden"
                  >
                    <ConfettiParticles />
                    <motion.div
                      className="text-4xl mb-2"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.5, repeat: 2, repeatDelay: 0.3 }}
                    >
                      📦🐟🎩
                    </motion.div>
                    <p className="font-display text-xl font-bold text-gradient-neon">
                      Paczka dostarczona!
                    </p>
                    <p className="text-xs mt-1">
                      <span className="text-green-400/70">Fisz zrobił to... jakoś.</span>{" "}
                      <span className="text-amber-400/70">Twój trunek czeka na otwarcie!</span>{" "}
                      <span className="text-pink-400/70">🎉</span>
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Button
                        onClick={startDelivery}
                        variant="ghost"
                        className="text-xs text-cyan-400/70 hover:text-cyan-400 min-h-[44px] group"
                      >
                        <RotateCcw className="h-3 w-3 mr-1 group-hover:animate-spin" />
                        Śledź kolejną paczkę
                        <PartyPopper className="h-3.5 w-3.5 ml-1 text-amber-400/70" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeliveryTracker;

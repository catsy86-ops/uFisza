import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, Beer, Fish, Package, RotateCcw, X, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BARS_ON_ROUTE = [
  { name: "Bar Pod Złotym Karpiem", street: "ul. Panieńska", x: 28, y: 62 },
  { name: "Knajpa U Wujka Staszka", street: "ul. Grodzka", x: 45, y: 48 },
  { name: "Piwiarnia Na Rogu", street: "ul. Kurkowa", x: 58, y: 35 },
  { name: "Whisky Bar Dno", street: "ul. Mostowa", x: 72, y: 55 },
  { name: "Stacja Paliw (z barem)", street: "ul. Łucznicza", x: 82, y: 28 },
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

const SzczecinMap = ({ activeBars, fishPosition, visitedBarIndices }: {
  activeBars: typeof BARS_ON_ROUTE;
  fishPosition: { x: number; y: number } | null;
  visitedBarIndices: Set<number>;
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a2e]" />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <ellipse cx="35" cy="25" rx="8" ry="5" fill="#2d5a3d" opacity="0.4" />
        <ellipse cx="60" cy="20" rx="6" ry="4" fill="#2d5a3d" opacity="0.3" />
        <ellipse cx="75" cy="70" rx="7" ry="5" fill="#2d5a3d" opacity="0.35" />
      </svg>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
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

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
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

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
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

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.3, type: "spring" }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2 group">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                isVisited ? "bg-beer-gold/30 border border-beer-gold/50" : "bg-beer-dark/60 border border-beer-amber/30"
              }`}>
                <Beer className={`h-3 w-3 ${isVisited ? "text-beer-gold" : "text-beer-amber/50"}`} />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-beer-dark/90 text-[9px] text-beer-foam/80 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-beer-gold/20 backdrop-blur-sm">
                <div className="font-semibold">{bar.name}</div>
                <div className="text-[7px] text-beer-gold/60">{bar.street}</div>
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
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 bg-beer-gold/20 rounded-full blur-md animate-pulse scale-150" />
            <Fish className="h-7 w-7 md:h-9 md:w-9 text-beer-gold relative z-10 drop-shadow-[0_0_8px_rgba(212,160,23,0.5)]" />
          </div>
        </motion.div>
      )}

      <div className="absolute bottom-2 left-2 px-2 py-1 bg-beer-dark/80 rounded text-[7px] text-muted-foreground/60 font-mono backdrop-blur-sm border border-beer-gold/10">
        Szczecin · Stare Miasto [symulacja]
      </div>

      <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-full h-full opacity-40">
          <polygon points="12,2 14,12 12,10 10,12" fill="#d4a017" />
          <polygon points="12,22 10,12 12,14 14,12" fill="#6a6a7a" />
          <text x="12" y="6" textAnchor="middle" fontSize="3" fill="#d4a017">N</text>
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
      setElapsed(getElapsedTime(startTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [started, delivered, startTime]);

  useEffect(() => {
    if (currentStep >= 0 && stepsContainerRef.current) {
      const activeEl = stepsContainerRef.current.querySelector(`[data-step="${currentStep}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
    setElapsed("0:00");
    setVisitedBarIndices(new Set());
  };

  const barStepsCount = useMemo(() => steps.filter(s => s.type === "bar").length, [steps]);
  const visitedBarsCount = visitedBarIndices.size;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

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
      case "order": return "Przyjęto zamówienie";
      case "warehouse": return "W magazynie";
      case "select": return "Wybór produktów";
      case "bar": return "Postój w barze";
      case "thought": return "Fisz się zastanawia...";
      case "riding": return "W drodze do Ciebie";
      default: return "W dostawie";
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
            <div className="inline-flex items-center gap-2 bg-beer-gold/10 text-beer-gold text-xs font-bold px-4 py-2 rounded-full mb-4 border border-beer-gold/20 tracking-widest uppercase">
              <Truck className="h-3.5 w-3.5" />
              Dostawca Fisz
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Śledź swoją <span className="shimmer-text">paczkę</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Fisz osobiście dostarcza Twoje zamówienie... podobno. Śledź jego (mniej więcej) trasę. 🐟📦
            </p>
            {started && (
              <p className="text-muted-foreground/50 text-xs mt-2 font-mono">
                Zamówienie: {orderId}
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
                    <span className="text-xs text-beer-gold/70 font-semibold">Postęp dostawy</span>
                    <span className="text-xs text-beer-gold/70 font-mono">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-beer-dark/50" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${delivered ? "bg-green-500" : "bg-beer-gold animate-pulse"}`} />
                    <span className="text-beer-gold font-semibold">{statusLabel}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono">{elapsed}</span>
                  </div>
                </div>

                {barStepsCount > 0 && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                    <Beer className="h-3 w-3" />
                    <span>Postoje w barach: {visitedBarsCount}/{barStepsCount}</span>
                  </div>
                )}
              </div>
            )}

            <div className="relative rounded-2xl overflow-hidden mb-6 border border-beer-gold/10 min-h-[200px] md:min-h-[280px] aspect-square sm:aspect-[4/3] md:aspect-video bg-beer-dark/50 flex items-center justify-center">
              {!started ? (
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-beer-gold/40 mx-auto mb-2" />
                  <p className="text-muted-foreground text-xs">Mapa Szczecina [symulacja]</p>
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
                  className="bg-beer-gold hover:bg-beer-gold/90 text-beer-dark font-bold gap-2 px-8 min-h-[44px]"
                >
                  <Package className="h-4 w-4" />
                  Rozpocznij śledzenie paczki
                </Button>
                <p className="text-muted-foreground/60 text-[11px] mt-3 italic">
                  * Fisz nie gwarantuje szybkości, trzeźwości ani dotarcia paczki
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-beer-gold text-xs font-bold uppercase tracking-wider">
                    <Truck className="h-3.5 w-3.5" />
                    Historia dostawy:
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
                  <AnimatePresence mode="popLayout">
                    {steps.slice(0, currentStep + 1).map((step, i) => {
                      const done = i < currentStep;
                      const active = i === currentStep && !delivered;
                      const isDeliveredStep = i === currentStep && delivered;

                      return (
                        <motion.div
                          key={`step-${i}`}
                          data-step={i}
                          initial={{ opacity: 0, x: -20, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: "auto" }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm flex-shrink-0 ${
                              done || isDeliveredStep
                                ? "bg-beer-gold/20 border border-beer-gold/30 text-beer-gold"
                                : "bg-beer-gold/30 border-2 border-beer-gold text-beer-gold animate-pulse"
                            }`}
                          >
                            {done || isDeliveredStep ? "✓" : step.icon}
                          </div>
                          <div className="flex-1 pt-0.5 min-w-0">
                            <p
                              className={`text-sm break-words ${
                                done || isDeliveredStep
                                  ? "text-foreground font-semibold"
                                  : "animate-pulse text-beer-gold font-semibold"
                              }`}
                            >
                              {step.text}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {currentStep >= 0 && !delivered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={currentStep}
                    className="mt-4 p-3 rounded-xl bg-beer-gold/5 border border-beer-gold/10 text-center"
                  >
                    <p className="text-xs text-beer-gold/70 italic">💭 {fiszThought}</p>
                  </motion.div>
                )}

                {delivered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mt-5 text-center"
                  >
                    <p className="text-4xl mb-2">📦🐟🎩</p>
                    <p className="font-display text-xl font-bold text-beer-gold">
                      Paczka dostarczona!
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Fisz zrobił to... jakoś. Twój trunek czeka na otwarcie!
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Button
                        onClick={startDelivery}
                        variant="ghost"
                        className="text-xs text-beer-gold/70 hover:text-beer-gold min-h-[44px]"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Śledź kolejną paczkę
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

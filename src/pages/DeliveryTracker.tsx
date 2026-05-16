import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, Beer, Fish, Package, RotateCcw, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BARS_ON_ROUTE = [
  { name: "Bar Pod Złotym Karpiem", lat: 53.435, lng: 14.560, delay: 2000, x: 20, y: 75 },
  { name: "Knajpa U Wujka Staszka", lat: 53.440, lng: 14.555, delay: 3000, x: 35, y: 55 },
  { name: "Piwiarnia Na Rogu", lat: 53.430, lng: 14.565, delay: 1500, x: 50, y: 40 },
  { name: "Whisky Bar Dno", lat: 53.445, lng: 14.550, delay: 4000, x: 70, y: 60 },
  { name: "Stacja Paliw (z barem)", lat: 53.438, lng: 14.558, delay: 1000, x: 85, y: 25 },
];

const DELIVERY_PATH = [
  { x: 10, y: 85 },
  { x: 20, y: 75 },
  { x: 35, y: 55 },
  { x: 50, y: 40 },
  { x: 70, y: 60 },
  { x: 85, y: 25 },
  { x: 92, y: 10 },
];

interface DeliveryStep {
  text: string;
  icon: string;
  delay: number;
}

const generateOrderId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "UF-";
  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const DeliveryTracker = () => {
  const [started, setStarted] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [steps, setSteps] = useState<DeliveryStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [fiszThought, setFiszThought] = useState("");
  const [orderId] = useState(() => generateOrderId());
  const [activeBars, setActiveBars] = useState<typeof BARS_ON_ROUTE>([]);

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
      { text: "Przyjęto zamówienie — Fisz dostał cynk!", icon: "📋", delay: 500 },
      { text: "Fisz idzie do magazynu", icon: "🏭", delay: 1000 },
      { text: "Wybiera najlepsze butelki", icon: "🍾", delay: 1200 },
    ];

    const numBars = 2 + Math.floor(Math.random() * 4);
    const shuffled = [...BARS_ON_ROUTE].sort(() => Math.random() - 0.5).slice(0, numBars);
    setActiveBars(shuffled);

    for (let i = 0; i < numBars; i++) {
      result.push({
        text: `Fisz zatrzymuje się w: ${shuffled[i].name}`,
        icon: "🍺",
        delay: shuffled[i].delay,
      });
      if (Math.random() > 0.5) {
        result.push({
          text: FISZ_THOUGHTS[Math.floor(Math.random() * FISZ_THOUGHTS.length)],
          icon: "🤔",
          delay: 1000 + Math.random() * 2000,
        });
      }
    }

    result.push({ text: "Fisz jedzie prosto do Ciebie! 🚀", icon: "🚴", delay: 2000 });
    result.push({ text: "Paczka dostarczona! Fisz oddaje pokłon płetwą 🐟🎩", icon: "✅", delay: 500 });

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
    if (currentStep >= 0 && stepsContainerRef.current) {
      const activeEl = stepsContainerRef.current.querySelector(`[data-step="${currentStep}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentStep]);

  const startDelivery = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStarted(true);
    setDelivered(false);
    setCurrentStep(-1);
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
  };

  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  const fishPosition = currentStep >= 0 ? DELIVERY_PATH[Math.min(currentStep, DELIVERY_PATH.length - 1)] : null;

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
            {started && !delivered && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-beer-gold/70 font-semibold">Postęp dostawy</span>
                  <span className="text-xs text-beer-gold/70 font-mono">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-beer-dark/50" />
              </div>
            )}

            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden mb-6 border border-beer-gold/10 min-h-[200px] md:min-h-[280px] aspect-square sm:aspect-[4/3] md:aspect-video bg-beer-dark/50 flex items-center justify-center">
              {!started ? (
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-beer-gold/40 mx-auto mb-2" />
                  <p className="text-muted-foreground text-xs">Mapa Szczecina [symulacja]</p>
                </div>
              ) : (
                <div className="absolute inset-0">
                  {/* Grid lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-10">
                    {[...Array(10)].map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="hsl(var(--beer-gold))" strokeWidth="0.5" />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <line key={`v-${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="hsl(var(--beer-gold))" strokeWidth="0.5" />
                    ))}
                  </svg>

                  {/* Route path */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--beer-gold))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--beer-gold))" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <polyline
                      points={DELIVERY_PATH.map(p => `${p.x}%,${p.y}%`).join(' ')}
                      fill="none"
                      stroke="url(#routeGradient)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="opacity-60"
                    />
                  </svg>

                  {/* Bar markers */}
                  {activeBars.map((bar, i) => (
                    <motion.div
                      key={bar.name}
                      className="absolute"
                      style={{ left: `${bar.x}%`, top: `${bar.y}%` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.3, type: "spring" }}
                    >
                      <div className="relative group">
                        <Beer className="h-4 w-4 text-beer-amber/60" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-beer-dark text-[10px] text-beer-foam/80 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-beer-gold/20">
                          {bar.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Start point */}
                  <div className="absolute" style={{ left: "10%", top: "85%" }}>
                    <div className="w-3 h-3 rounded-full bg-beer-hop/60 border border-beer-hop" />
                  </div>

                  {/* End point */}
                  <div className="absolute" style={{ left: "92%", top: "10%" }}>
                    <div className="w-4 h-4 rounded-full bg-beer-gold/40 border border-beer-gold animate-pulse" />
                  </div>

                  {/* Fish on route */}
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
                        <div className="absolute inset-0 bg-beer-gold/20 rounded-full blur-md animate-pulse" />
                        <Fish className="h-8 w-8 md:h-10 md:w-10 text-beer-gold relative z-10" />
                      </div>
                    </motion.div>
                  )}
                </div>
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
                    Status dostawy:
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
                  <AnimatePresence>
                    {steps.map((step, i) => {
                      const done = i <= currentStep;
                      const active = i === currentStep && !delivered;
                      return (
                        <motion.div
                          key={i}
                          data-step={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: i <= currentStep + 1 ? 1 : 0, x: 0 }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm flex-shrink-0 ${
                              done
                                ? "bg-beer-gold/20 border border-beer-gold/30 text-beer-gold"
                                : "bg-muted/30 border border-border/20 text-muted-foreground"
                            }`}
                          >
                            {done ? "✓" : step.icon}
                          </div>
                          <div className="flex-1 pt-0.5 min-w-0">
                            <p
                              className={`text-sm break-words ${
                                done ? "text-foreground font-semibold" : "text-muted-foreground"
                              } ${active ? "animate-pulse text-beer-gold" : ""}`}
                            >
                              {step.text}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Fisz's thought */}
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

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Beer, Factory, FlaskConical, Crown, Star, Zap, ChevronUp } from "lucide-react";
import { fireConfetti } from "@/lib/confetti";

interface Upgrade {
  id: string;
  name: string;
  emoji: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  bps: number;
  owned: number;
}

const UPGRADES: Omit<Upgrade, "owned">[] = [
  { id: "kufel", name: "Kufel", emoji: "🍻", description: "+1 🍺/s", baseCost: 15, costMultiplier: 1.15, bps: 1 },
  { id: "browar", name: "Mini Browar", emoji: "🏭", description: "+5 🍺/s", baseCost: 100, costMultiplier: 1.15, bps: 5 },
  { id: "laboratorium", name: "Lab Chmielu", emoji: "🧪", description: "+25 🍺/s", baseCost: 500, costMultiplier: 1.15, bps: 25 },
  { id: "piwny_sfinks", name: "Piwny Sfinks", emoji: "🏆", description: "+100 🍺/s", baseCost: 3000, costMultiplier: 1.15, bps: 100 },
  { id: "fisz_empire", name: "Imperium Fisza", emoji: "👑", description: "+500 🍺/s", baseCost: 15000, costMultiplier: 1.15, bps: 500 },
];

const MILESTONES = [
  { count: 100, title: "Pierwsze 100 piw!", emoji: "🍺", reward: "Fisz kiwa płetwą" },
  { count: 1000, title: "Tysiąc!", emoji: "🎉", reward: "Fisz stawia rundę" },
  { count: 10000, title: "Piwny koneser", emoji: "🍷", reward: "Złoty kufel odznaka" },
  { count: 100000, title: "Piwny cesarz!", emoji: "👑", reward: "Fisz oddaje kapelusz" },
  { count: 1000000, title: "MILION!", emoji: "🏆", reward: "Legendarny status 🐟" },
];

const CLICK_MESSAGES = [
  "Glug glug!", "Bul bul!", "Piwko!", "Fisz kiwa!", "🍻", "Prosto do kufla!",
  "Jedno więcej!", "Fisz aprobuje!", "Klasa!", "Płynne złoto!", "Aaaach!", "^_^",
];

const LS_KEY = "fisz_clicker";

interface ClickerState {
  beers: number;
  totalBeers: number;
  bps: number;
  upgrades: Record<string, number>;
  milestones: number[];
}

const loadState = (): ClickerState => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return {
        beers: data.beers ?? 0,
        totalBeers: data.totalBeers ?? 0,
        bps: data.bps ?? 0,
        upgrades: data.upgrades ?? {},
        milestones: data.milestones ?? [],
      };
    }
  } catch {}
  return { beers: 0, totalBeers: 0, bps: 0, upgrades: {}, milestones: [] };
};

const saveState = (state: ClickerState) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {}
};

const FiszClicker = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ClickerState>(loadState);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [shakeKey, setShakeKey] = useState(0);
  const clickCountRef = useRef(0);
  const counterRef = useRef(0);

  const getUpgradeCost = (upgrade: typeof UPGRADES[number]) => {
    const owned = state.upgrades[upgrade.id] ?? 0;
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, owned));
  };

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickPower = 1 + Math.floor(state.totalBeers / 5000);
    const msg = CLICK_MESSAGES[Math.floor(Math.random() * CLICK_MESSAGES.length)];

    setState((prev) => {
      const newBeers = prev.beers + clickPower;
      const newTotal = prev.totalBeers + clickPower;
      const newMilestones = [...prev.milestones];

      MILESTONES.forEach((m) => {
        if (newTotal >= m.count && !prev.milestones.includes(m.count)) {
          newMilestones.push(m.count);
        }
      });

      if (newMilestones.length > prev.milestones.length) {
        fireConfetti(window.innerWidth / 2, window.innerHeight / 3, 80);
      }

      return { ...prev, beers: newBeers, totalBeers: newTotal, milestones: newMilestones };
    });

    const id = counterRef.current++;
    setFloatingTexts((prev) => [...prev, { id, text: `+${clickPower} ${msg}`, x: x + (Math.random() - 0.5) * 40, y }]);
    setTimeout(() => setFloatingTexts((prev) => prev.filter((t) => t.id !== id)), 1200);

    clickCountRef.current++;
    if (clickCountRef.current % 10 === 0) {
      setShakeKey((k) => k + 1);
    }
  }, [state.totalBeers]);

  const buyUpgrade = (upgrade: typeof UPGRADES[number]) => {
    const cost = getUpgradeCost(upgrade);
    if (state.beers < cost) return;

    setState((prev) => {
      const newBeers = prev.beers - cost;
      const newUpgrades = { ...prev.upgrades, [upgrade.id]: (prev.upgrades[upgrade.id] ?? 0) + 1 };
      const newBps = Object.entries(newUpgrades).reduce((total, [id, count]) => {
        const u = UPGRADES.find((u) => u.id === id);
        return total + (u ? u.bps * count : 0);
      }, 0);

      return { ...prev, beers: newBeers, bps: newBps, upgrades: newUpgrades };
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        beers: prev.beers + prev.bps / 10,
        totalBeers: prev.totalBeers + prev.bps / 10,
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => saveState(state), 5000);
    return () => clearInterval(timer);
  }, [state]);

  const formatBeers = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return Math.floor(n).toString();
  };

  const clickPower = 1 + Math.floor(state.totalBeers / 5000);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="pointer-events-auto relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-beer-gold to-amber-600 text-beer-dark text-2xl shadow-xl border-2 border-yellow-300/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        title="Fisz Clicker!"
      >
        🍺
        {state.bps > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 flex items-center justify-center h-5 min-w-5 rounded-full bg-yellow-400 text-beer-dark text-[10px] font-bold px-1 border-2 border-background"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {formatBeers(state.bps)}/s
          </motion.span>
        )}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-yellow-400/50"
          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-beer-dark/70 backdrop-blur-sm z-[200]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-md glass-card rounded-3xl border border-beer-gold/30 shadow-2xl overflow-hidden"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
              >
                <div className="relative bg-gradient-to-r from-beer-gold/20 to-beer-amber/20 p-4 border-b border-beer-gold/20">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <h2 className="font-display text-xl font-bold">Fisz Clicker 🍺</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Klikaj, produkuj, zdobywaj!</p>
                </div>

                <div className="p-5">
                  <div className="text-center mb-5">
                    <motion.div
                      key={shakeKey}
                      className="relative inline-block cursor-pointer select-none"
                      whileTap={{ scale: 0.85, rotate: -10 }}
                      onClick={handleClick}
                    >
                      <motion.div
                        className="text-7xl"
                        animate={{ rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        🐟
                      </motion.div>
                      <div className="absolute -top-1 -right-1 text-xl">🎩</div>
                      {floatingTexts.map((ft) => (
                        <motion.div
                          key={ft.id}
                          className="absolute pointer-events-none text-sm font-bold text-beer-gold whitespace-nowrap"
                          style={{ left: ft.x, top: ft.y }}
                          initial={{ opacity: 1, y: 0, scale: 1 }}
                          animate={{ opacity: 0, y: -60, scale: 0.7 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                          {ft.text}
                        </motion.div>
                      ))}
                    </motion.div>

                    <div className="mt-3">
                      <motion.p
                        key={Math.floor(state.beers)}
                        className="font-display text-3xl font-bold text-beer-gold"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.1 }}
                      >
                        {formatBeers(state.beers)} 🍺
                      </motion.p>
                      <p className="text-xs text-muted-foreground">
                        Moc kliknięcia: <strong>+{clickPower}</strong> 🍺 | {formatBeers(state.bps)}/s
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-beer-gold/50 flex items-center gap-1.5">
                      <TrendingUp className="h-3 w-3" /> Ulepszenia
                    </p>
                    {UPGRADES.map((upgrade) => {
                      const owned = state.upgrades[upgrade.id] ?? 0;
                      const cost = getUpgradeCost(upgrade);
                      const canAfford = state.beers >= cost;
                      return (
                        <motion.button
                          key={upgrade.id}
                          onClick={() => buyUpgrade(upgrade)}
                          disabled={!canAfford}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            canAfford
                              ? "border-beer-gold/30 bg-beer-gold/5 hover:bg-beer-gold/10 hover:border-beer-gold/50"
                              : "border-border/20 bg-muted/20 opacity-50 cursor-not-allowed"
                          }`}
                          whileTap={canAfford ? { scale: 0.97 } : {}}
                        >
                          <span className="text-2xl">{upgrade.emoji}</span>
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm">{upgrade.name}</span>
                              {owned > 0 && (
                                <span className="text-[10px] font-bold bg-beer-gold/20 text-beer-gold px-1.5 py-0.5 rounded">
                                  x{owned}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground">{upgrade.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-beer-amber">{formatBeers(cost)}</div>
                            <div className="text-[9px] text-muted-foreground">🍺</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {state.milestones.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-beer-gold/50 flex items-center gap-1.5">
                        <Star className="h-3 w-3" /> Osiągnięcia
                      </p>
                      {MILESTONES.filter((m) => state.milestones.includes(m.count)).map((m) => (
                        <div key={m.count} className="flex items-center gap-2 p-2 rounded-lg bg-beer-gold/5 border border-beer-gold/15">
                          <span className="text-lg">{m.emoji}</span>
                          <div>
                            <p className="text-xs font-bold">{m.title}</p>
                            <p className="text-[10px] text-muted-foreground">{m.reward}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {MILESTONES.filter((m) => !state.milestones.includes(m.count)).length > 0 && (
                    <div className="mt-3 text-center text-[10px] text-muted-foreground">
                      Następny cel: <strong className="text-beer-gold">{formatBeers(MILESTONES.filter((m) => !state.milestones.includes(m.count))[0].count)}</strong> 🍺
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FiszClicker;
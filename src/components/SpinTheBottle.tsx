import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, X, Gift, Sparkles } from "lucide-react";
import { useConfetti } from "@/lib/confetti";
import { toast } from "sonner";
import { AVAILABLE_COUPONS } from "@/stores/cartStore";
import { useCartStore } from "@/stores/cartStore";

const SpinTheBottle = () => {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<{ discount: string; message: string } | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(() => {
    try {
      const data = localStorage.getItem("fisz_spins_left");
      if (data) {
        const parsed = JSON.parse(data) as { count: number; date: string };
        const today = new Date().toDateString();
        if (parsed.date === today) return parsed.count;
      }
    } catch {}
    return 3;
  });
  const { fire } = useConfetti();
  const applyCoupon = useCartStore((s) => s.applyCoupon);

  const saveSpinsLeft = (count: number) => {
    setSpinsLeft(count);
    try {
      localStorage.setItem("fisz_spins_left", JSON.stringify({ count, date: new Date().toDateString() }));
    } catch {}
  };

  const prizes = [
    { discount: "FISZ10", message: "10% rabatu! Fisz daje ci okazyjną cenę! 🍺", probability: 0.25 },
    { discount: "BEER20", message: "20% na piwa! Fisz jest pod wrażeniem twojego szczęścia! 🍻", probability: 0.15 },
    { discount: "WELCOME", message: "Powitalny rabat! Fisz wita cię otwartym kuflem! 🎉", probability: 0.2 },
    { discount: "PIWOSZ50", message: "50 zł przy zamówieniu 200 zł! Królewskie łupy! 👑", probability: 0.1 },
    { discount: "HAPPYHOUR", message: "Happy Hour u Fisza! Czas na szaleństwo! 🎊", probability: 0.1 },
    { discount: "", message: "Ooo, butelka wskazała na Fisza! 🐟 Spróbuj jeszcze raz — Fisz wierzy w ciebie!", probability: 0.15 },
    { discount: "RYBKA", message: "Złota rybka! 15% z kodem RYBKA! 🐟✨", probability: 0.05 },
  ];

  const spin = useCallback(() => {
    if (spinning || spinsLeft <= 0) return;

    setSpinning(true);
    setResult(null);

    const newRotation = rotation + 1440 + Math.random() * 720;
    setRotation(newRotation);
    saveSpinsLeft(spinsLeft - 1);

    setTimeout(() => {
      setSpinning(false);

      let random = Math.random();
      let cumulative = 0;
      let won = prizes[prizes.length - 1];

      for (const prize of prizes) {
        cumulative += prize.probability;
        if (random <= cumulative) {
          won = prize;
          break;
        }
      }

      if (won.discount) {
        setResult({ discount: won.discount, message: won.message });
        fire(window.innerWidth / 2, window.innerHeight / 3, 120);
      } else {
        setResult({ discount: "", message: won.message });
      }
    }, 3000);
  }, [spinning, rotation, spinsLeft, fire]);

  const applyPrize = () => {
    if (!result?.discount) return;
    const res = applyCoupon(result.discount);
    if (res.ok) {
      toast.success(`Kod ${result.discount} zastosowany! 🎉`);
      fire(window.innerWidth / 2, window.innerHeight / 2, 60);
    } else {
      toast.error(res.message);
    }
    setResult(null);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="pointer-events-auto relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-beer-copper to-beer-amber text-beer-foam text-2xl shadow-xl border-2 border-beer-foam/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
        title="Kręć butelką!"
      >
        🍾
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-beer-gold"
          animate={{ opacity: [0.7, 0, 0.7], scale: [1, 1.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
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
              onClick={() => { if (!spinning) setOpen(false); }}
            />
            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-sm glass-card rounded-3xl p-6 border border-beer-gold/30 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => { if (!spinning) setOpen(false); }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="text-center mb-5">
                  <div className="text-4xl mb-2">🍾</div>
                  <h2 className="font-display text-2xl font-bold text-beer-foam">
                    Kręć butelką!
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Wylosuj kod rabatowy od Fisza
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-beer-gold">
                    <Gift className="h-3.5 w-3.5" />
                    Pozostało obrotów: <strong>{spinsLeft}</strong>
                  </div>
                </div>

                <div className="relative w-56 h-56 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full border-4 border-beer-gold/20" />
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-beer-gold/10" />

                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <div
                      key={deg}
                      className="absolute w-2 h-2 rounded-full bg-beer-gold/40"
                      style={{
                        left: `${50 + 44 * Math.cos((deg * Math.PI) / 180)}%`,
                        top: `${50 + 44 * Math.sin((deg * Math.PI) / 180)}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                    />
                  ))}

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center origin-center"
                    animate={{ rotate: rotation }}
                    transition={spinning ? {
                      duration: 3,
                      ease: [0.17, 0.67, 0.12, 0.99],
                    } : { duration: 0 }}
                    style={{ willChange: "transform" }}
                  >
                    <div className="text-6xl" style={{ transform: "translateY(-50px) rotate(180deg)" }}>
                      🍺
                    </div>
                  </motion.div>

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-beer-gold" />
                  </div>
                </div>

                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className={`text-center mb-4 p-4 rounded-xl border ${
                        result.discount
                          ? "bg-beer-hop/10 border-beer-hop/30"
                          : "bg-muted/30 border-border/30"
                      }`}
                    >
                      <p className="font-body text-sm leading-snug text-foreground">
                        {result.message}
                      </p>
                      {result.discount && (
                        <div className="mt-3 flex flex-col items-center gap-2">
                          <div className="px-4 py-2 rounded-lg bg-beer-gold/20 border border-beer-gold/30 font-mono text-lg font-bold text-beer-gold tracking-wider">
                            {result.discount}
                          </div>
                          <motion.button
                            onClick={applyPrize}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl btn-beer text-sm font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Zastosuj rabat
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={spin}
                  disabled={spinning || spinsLeft <= 0}
                  className="w-full py-3 rounded-xl btn-beer font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {spinning ? (
                    <>
                      <motion.div
                        className="h-4 w-4 border-2 border-beer-dark/30 border-t-beer-dark rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Kręcę...
                    </>
                  ) : spinsLeft <= 0 ? (
                    "Brak obrotów — wróć jutro! 🐟"
                  ) : (
                    <>
                      <RotateCcw className="h-4 w-4" />
                      Kręć butelką!
                    </>
                  )}
                </button>

                {spinsLeft > 0 && (
                  <button
                    onClick={() => { if (!spinning) setOpen(false); }}
                    className="w-full mt-2 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Może później
                  </button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpinTheBottle;
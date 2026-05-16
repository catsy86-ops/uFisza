import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, X, PartyPopper } from "lucide-react";
import { fireConfetti } from "@/lib/confetti";

const LS_KEY = "fisz_party_mode";

type PartyStyle = "disco" | "rave" | "chill" | "neon";

const PARTY_STYLES: Record<PartyStyle, { label: string; emoji: string; filter: string; bg: string; speed: number }> = {
  disco: { label: "Disco", emoji: "🪩", filter: "hue-rotate(0deg)", bg: "linear-gradient(45deg, #ff0066, #ff6600, #ffcc00, #33cc33, #0099ff, #6633cc)", speed: 2 },
  rave: { label: "Rave", emoji: "🎧", filter: "hue-rotate(90deg) saturate(200%)", bg: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)", speed: 1 },
  chill: { label: "Chill", emoji: "🎶", filter: "sepia(30%) saturate(80%) brightness(95%)", bg: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)", speed: 4 },
  neon: { label: "Neon", emoji: "💜", filter: "contrast(120%) saturate(150%) hue-rotate(260deg)", bg: "linear-gradient(90deg, #00ff41, #ff00ff, #00ffff, #ff0041)", speed: 1.5 },
};

const DJ_MESSAGES = [
  "Fisz na decksach! 🎧",
  "BASSEDROOOOP 💥",
  "Muza jak na piątkowej imprezie!",
  "Piwo, muzyka, przyjaciele! 🍻",
  "DJ Fisz w domu!",
  "Rytm piwny! 🎵",
  "Tańczysz? Fisz też! 🕺",
  "Bas aż wibracuje! 🔊",
];

const PartyMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(() => {
    try { return localStorage.getItem(LS_KEY) === "true"; } catch { return false; }
  });
  const [style, setStyle] = useState<PartyStyle>("disco");
  const [message, setMessage] = useState<string | null>(null);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, String(isActive)); } catch {}
    if (isActive) {
      document.body.setAttribute("data-party", style);
    } else {
      document.body.removeAttribute("data-party");
    }
    return () => { document.body.removeAttribute("data-party"); };
  }, [isActive, style]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setBeat((b) => b + 1);
    }, PARTY_STYLES[style].speed * 500);
    return () => clearInterval(interval);
  }, [isActive, style]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setMessage(DJ_MESSAGES[Math.floor(Math.random() * DJ_MESSAGES.length)]);
      setTimeout(() => setMessage(null), 2500);
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleParty = useCallback(() => {
    const newVal = !isActive;
    setIsActive(newVal);
    if (newVal) {
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 60);
    }
  }, [isActive]);

  const currentStyle = PARTY_STYLES[style];

  return (
    <>
      <motion.button
        onClick={toggleParty}
        className="pointer-events-auto relative flex items-center justify-center h-11 w-11 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white shadow-xl border-2 border-white/20"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        animate={isActive ? {
          boxShadow: [
            "0 0 0px rgba(255,0,100,0.4)",
            "0 0 20px rgba(255,0,100,0.6)",
            "0 0 40px rgba(0,255,100,0.4)",
            "0 0 20px rgba(0,100,255,0.6)",
            "0 0 0px rgba(255,0,100,0.4)",
          ],
        } : {}}
        transition={isActive ? { duration: 2, repeat: Infinity } : {}}
        title={isActive ? "Wyłącz tryb imprezowy" : "Włącz tryb imprezowy! 🎉"}
      >
        <motion.div
          animate={isActive ? { rotate: 360 } : { rotate: 0 }}
          transition={isActive ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
        >
          {isActive ? <PartyPopper className="h-5 w-5" /> : <Music className="h-5 w-5" />}
        </motion.div>
      </motion.button>

      <motion.button
        onClick={() => setIsOpen(true)}
        className="pointer-events-auto text-[9px] text-white/60 hover:text-white/90 transition-colors mt-0.5"
        whileHover={{ scale: 1.1 }}
      >
        styl
      </motion.button>

      <AnimatePresence>
        {message && isActive && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold text-white shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            style={{
              background: currentStyle.bg,
              backgroundSize: "200% 200%",
              animation: `party-gradient ${currentStyle.speed}s linear infinite`,
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-xs glass-card rounded-3xl p-5 border border-pink-500/30 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                  🎉 Tryb Imprezowy
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(PARTY_STYLES).map(([key, val]) => (
                    <motion.button
                      key={key}
                      onClick={() => { setStyle(key as PartyStyle); setIsOpen(false); }}
                      className={`p-3 rounded-xl border transition-all text-center ${
                        style === key
                          ? "border-pink-500 bg-pink-500/20 ring-2 ring-pink-500/50"
                          : "border-border/40 hover:border-pink-500/30 bg-muted/20"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl block mb-1">{val.emoji}</span>
                      <span className="text-xs font-bold">{val.label}</span>
                    </motion.button>
                  ))}
                </div>

                <p className="text-[10px] text-muted-foreground text-center mt-3">
                  {isActive ? "Kliknij 🎵 aby wyłączyć" : "Kliknij 🎵 aby włączyć!"}
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isActive && (
        <div
          className="fixed inset-0 z-[60] pointer-events-none"
          style={{
            filter: beat % 2 === 0 ? currentStyle.filter : "none",
            transition: "filter 0.3s ease",
          }}
        />
      )}
    </>
  );
};

export default PartyMode;
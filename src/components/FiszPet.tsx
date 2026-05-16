import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";

type Mood = "happy" | "excited" | "sad" | "sleepy" | "party" | "curious";

const MOOD_EMOJIS: Record<Mood, string> = {
  happy: "🐟",
  excited: "🤩",
  sad: "😢",
  sleepy: "😴",
  party: "🥳",
  curious: "👀",
};

const SPEECH_BUBBLES: Record<Mood, string[]> = {
  happy: [
    "Bul bul! 🐟",
    "Fisz cię lubi!",
    "Piwo to życie!",
    "Glug glug!",
    "Co tam w koszyku?",
  ],
  excited: [
    "DODAJ WIĘCEJ! 🍺",
    "Fisz jest szczęśliwy!",
    "Impreza u Fisza!",
    "Złota rybka się udała!",
  ],
  sad: [
    "Pusty koszyk... 😢",
    "Fisz płacze pod kapeluszem",
    "Nawet jednego piwa?",
    "Samotność tętni...",
  ],
  sleepy: ["Zzz... 🐟", "Fisz śpi...", "Przebudzenie za piwko"],
  party: ["PIĄTEK! 🎉", "Impreza time!", "Fisz szaleje!", "Discoteka! 🕺"],
  curious: ["Hmm, co to?", "Fisz obserwuje...", "Interesujące! 🤔"],
};

const BUBBLE_COUNT = 5;

const FiszPet = () => {
  const [mood, setMood] = useState<Mood>("happy");
  const [bubble, setBubble] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(() => {
    try {
      return localStorage.getItem("fisz_pet_hidden") === "true" || window.innerWidth < 768;
    } catch {
      return true;
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [spinCount, setSpinCount] = useState(0);
  const [showBubbles, setShowBubbles] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const itemcount = useCartStore((s) => s.items.length);

  const petX = useMotionValue(typeof window !== "undefined" ? Math.min(window.innerWidth - 80, window.innerWidth - 80) : 300);
  const petY = useMotionValue(typeof window !== "undefined" ? window.innerHeight - 100 : 500);
  const springX = useSpring(petX, { stiffness: 80, damping: 20 });
  const springY = useSpring(petY, { damping: 20, stiffness: 80 });

  const lastMouseRef = useRef({ x: 0, y: 0 });
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moodTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) return;

    const onResize = () => {
      const newX = Math.min(petX.get(), window.innerWidth - 80);
      const newY = Math.min(petY.get(), window.innerHeight - 80);
      petX.set(newX);
      petY.set(newY);
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [petX, petY]);

  const showSpeechBubble = useCallback((text: string) => {
    setBubble(text);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => setBubble(null), 3500);
  }, []);

  const setTemporaryMood = useCallback(
    (newMood: Mood, duration = 3000) => {
      setMood(newMood);
      const texts = SPEECH_BUBBLES[newMood];
      showSpeechBubble(texts[Math.floor(Math.random() * texts.length)]);
      if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
      moodTimerRef.current = setTimeout(() => setMood("happy"), duration);
    },
    [showSpeechBubble]
  );

  useEffect(() => {
    if (isMobile) return;
    if (itemcount > 0) {
      setMood("excited");
      const texts = SPEECH_BUBBLES.excited;
      showSpeechBubble(texts[Math.floor(Math.random() * texts.length)]);
      if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
      moodTimerRef.current = setTimeout(() => setMood("happy"), 4000);
    } else {
      setMood("sad");
      showSpeechBubble("Pusty koszyk... 😢");
      if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
      moodTimerRef.current = setTimeout(() => setMood("happy"), 3000);
    }
  }, [itemcount, showSpeechBubble, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isDragging) return;
      petX.set(e.clientX - dragOffset.x);
      petY.set(e.clientY - dragOffset.y);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const px = springX.get();
      const py = springY.get();
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      if (dx * dx + dy * dy < 35 * 35) {
        setIsDragging(true);
        setDragOffset({ x: dx, y: dy });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const px = springX.get();
      const py = springY.get();
      const dx = touch.clientX - px;
      const dy = touch.clientY - py;
      if (dx * dx + dy * dy < 50 * 50) {
        setIsDragging(true);
        setDragOffset({ x: dx, y: dy });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      if (!touch) return;
      petX.set(touch.clientX - dragOffset.x);
      petY.set(touch.clientY - dragOffset.y);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, dragOffset, petX, petY, springX, springY, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      if (mood === "happy" && !isDragging) {
        if (Math.random() < 0.15) {
          const texts = SPEECH_BUBBLES.happy;
          showSpeechBubble(texts[Math.floor(Math.random() * texts.length)]);
        }
      }
      const now = new Date();
      if (now.getDay() === 5 && now.getHours() >= 17) {
        setMood("party");
      }
      if (now.getHours() >= 1 && now.getHours() <= 4) {
        setTemporaryMood("sleepy", 10000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [mood, isDragging, showSpeechBubble, setTemporaryMood, isMobile]);

  useEffect(() => {
    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    setShowBubbles(true);
    setSpinCount((c) => c + 1);
    setTimeout(() => setShowBubbles(false), 1200);

    if (spinCount >= 4 && spinCount % 5 === 4) {
      setTemporaryMood("curious", 4000);
    } else {
      const texts = SPEECH_BUBBLES.happy;
      showSpeechBubble(texts[Math.floor(Math.random() * texts.length)]);
    }
  };

  const toggleHidden = () => {
    const newVal = !isHidden;
    setIsHidden(newVal);
    try {
      localStorage.setItem("fisz_pet_hidden", String(newVal));
    } catch {}
  };

  if (isMobile && isHidden) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleHidden}
        className="fixed bottom-20 left-4 z-40 h-9 w-9 rounded-full bg-beer-dark/80 backdrop-blur-md border border-beer-gold/20 flex items-center justify-center text-sm hover:bg-beer-dark/90 transition-colors md:hidden"
        title="Pokaż Fisza"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🐟
      </motion.button>
    );
  }

  if (isMobile) {
    return (
      <motion.div
        className="fixed z-[100] bottom-20 left-4 select-none md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AnimatePresence>
          {bubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.9 }}
              className="absolute bottom-full left-0 mb-2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold glass-card border border-beer-gold/20 shadow-lg pointer-events-none max-w-[200px]"
            >
              {bubble}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          className="relative group"
          animate={
            mood === "party"
              ? { rotate: [0, 5, -5, 5, 0] }
              : mood === "sleepy"
                ? { y: [0, 2, 0] }
                : {}
          }
          transition={
            mood === "party"
              ? { duration: 0.5, repeat: Infinity, repeatType: "loop" }
              : mood === "sleepy"
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : {}
          }
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-beer-gold via-beer-amber to-beer-copper flex items-center justify-center shadow-lg border-2 border-beer-foam/40 overflow-hidden">
            <span className="text-lg z-10 relative" role="img" aria-label="Fisz">
              {mood === "excited"
                ? "🤩"
                : mood === "sad"
                  ? "😢"
                  : mood === "sleepy"
                    ? "😴"
                    : mood === "party"
                      ? "🕺"
                      : mood === "curious"
                        ? "👀"
                        : "🐟"}
            </span>
          </div>
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-beer-foam border border-beer-gold/30 flex items-center justify-center">
            <span className="text-[7px]" style={{ marginTop: "-1px" }}>🎩</span>
          </div>
        </motion.button>

        <button
          onClick={toggleHidden}
          className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-muted/80 border border-border/30 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
            <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>
    );
  }

  if (isHidden) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleHidden}
        className="fixed bottom-20 left-6 z-50 h-10 w-10 rounded-full bg-beer-dark/80 backdrop-blur-md border border-beer-gold/20 flex items-center justify-center text-lg hover:bg-beer-dark/90 transition-colors"
        title="Pokaż Fisza"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🐟
      </motion.button>
    );
  }

  return (
    <>
      <motion.div
        className="fixed z-[100] cursor-grab active:cursor-grabbing select-none hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence>
          {bubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.9 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold glass-card border border-beer-gold/20 shadow-lg pointer-events-none max-w-[220px]"
            >
              {bubble}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-beer-dark/60 border-b border-r border-beer-gold/20" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          className="relative group"
          animate={
            mood === "party"
              ? { rotate: [0, 5, -5, 5, 0] }
              : mood === "sleepy"
                ? { y: [0, 2, 0] }
                : {}
          }
          transition={
            mood === "party"
              ? { duration: 0.5, repeat: Infinity, repeatType: "loop" }
              : mood === "sleepy"
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : {}
          }
        >
          <motion.div
            className="relative h-14 w-14 rounded-full bg-gradient-to-br from-beer-gold via-beer-amber to-beer-copper flex items-center justify-center shadow-lg border-2 border-beer-foam/40 overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 360 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <span className="text-2xl z-10 relative" role="img" aria-label="Fisz">
              {mood === "excited"
                ? "🤩"
                : mood === "sad"
                  ? "😢"
                  : mood === "sleepy"
                    ? "😴"
                    : mood === "party"
                      ? "🕺"
                      : mood === "curious"
                        ? "👀"
                        : "🐟"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
            {mood === "happy" && (
              <motion.div
                className="absolute inset-0 bg-beer-gold/20"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            {mood === "excited" && (
              <motion.div
                className="absolute inset-0 bg-beer-gold/30"
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>

          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-beer-foam border border-beer-gold/30 flex items-center justify-center">
            <span className="text-[10px]" style={{ marginTop: "-1px" }}>🎩</span>
          </div>
        </motion.button>

        <AnimatePresence>
          {showBubbles &&
            Array.from({ length: BUBBLE_COUNT }).map((_, i) => (
              <motion.div
                key={`bubble-${i}-${spinCount}`}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-beer-foam/60"
                initial={{ opacity: 0.8, scale: 0.5, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: [0.5, 1.2, 0.3],
                  x: (Math.random() - 0.5) * 40,
                  y: -(20 + Math.random() * 40),
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
              />
            ))}
        </AnimatePresence>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            toggleHidden();
          }}
          className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-muted/80 backdrop-blur-sm border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.div
        className="fixed bottom-6 left-6 z-[99] items-center gap-1.5 text-[10px] text-muted-foreground/50 font-body hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>{MOOD_EMOJIS[mood]}</span>
        <span>Fisz</span>
      </motion.div>
    </>
  );
};

export default FiszPet;
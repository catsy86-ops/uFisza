import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";

type Mood = "happy" | "excited" | "sad" | "sleepy" | "party" | "curious";

const MOOD_EMOJIS: Record<Mood, string> = {
  happy: "🐟",
  excited: "🎉",
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
    " impreza u Fisza!",
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
      return localStorage.getItem("fisz_pet_hidden") === "true";
    } catch {
      return false;
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [spinCount, setSpinCount] = useState(0);
  const [showBubbles, setShowBubbles] = useState(false);
  const itemcount = useCartStore((s) => s.items.length);

  const petX = useMotionValue(window.innerWidth - 100);
  const petY = useMotionValue(window.innerHeight - 120);
  const springX = useSpring(petX, { stiffness: 80, damping: 20 });
  const springY = useSpring(petY, { damping: 20, stiffness: 80 });

  const lastMouseRef = useRef({ x: 0, y: 0 });
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moodTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }, [itemcount, showSpeechBubble]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isDragging) return;
      const dx = e.clientX - dragOffset.x;
      const dy = e.clientY - dragOffset.y;
      petX.set(dx);
      petY.set(dy);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = { x: springX.get() - 28, y: springY.get() - 28, w: 56, h: 56 };
      if (
        e.clientX >= rect.x &&
        e.clientX <= rect.x + rect.w &&
        e.clientY >= rect.y &&
        e.clientY <= rect.y + rect.h
      ) {
        setIsDragging(true);
        setDragOffset({ x: e.clientX - springX.get(), y: e.clientY - springY.get() });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, petX, petY, springX, springY]);

  useEffect(() => {
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
  }, [mood, isDragging, showSpeechBubble, setTemporaryMood]);

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

  if (isHidden) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleHidden}
        className="fixed bottom-24 left-6 z-50 h-10 w-10 rounded-full bg-beer-dark/80 backdrop-blur-md border border-beer-gold/20 flex items-center justify-center text-lg hover:bg-beer-dark/90 transition-colors"
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
        className="fixed z-[100] cursor-grab active:cursor-grabbing select-none"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence>
          {bubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.9 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold glass-card border border-beer-gold/20 shadow-lg pointer-events-none"
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

      {!isDragging && (
        <motion.div
          className="fixed bottom-6 left-6 z-[99] flex items-center gap-1.5 text-[10px] text-muted-foreground/50 font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span>{MOOD_EMOJIS[mood]}</span>
          <span>Fisz</span>
        </motion.div>
      )}
    </>
  );
};

export default FiszPet;
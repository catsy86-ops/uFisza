import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, X, Play, Pause, SkipForward, Music, Volume2, VolumeX } from "lucide-react";

const SHOWS = [
  { name: "Piankowe Przeboje", desc: "Top 10 najbardziej spienionych kawałków", icon: "🍺", genre: "Pop" },
  { name: "Chmielowe Porady", desc: "Jak nie wylać piwa na klawiaturę", icon: "🌿", genre: "Talk" },
  { name: "Lista Przebojów Kufla", desc: "Notowanie 100 najlepszych kufli", icon: "🏆", genre: "Top 100" },
  { name: "Bąbelkowy Chill", desc: "Muzyka do sączenia stouta", icon: "🫧", genre: "Lo-Fi" },
  { name: "Rock & Hop", desc: "Mocne riffy, mocne IPA", icon: "🎸", genre: "Rock" },
  { name: "Disco Polo nad Stawem", desc: "Fisz tańczy do disco polo", icon: "🕺", genre: "Disco" },
  { name: "Fisz Czyta Wiersze", desc: "Poezja rybna w interpretacji Fisza", icon: "📜", genre: "Spoken" },
  { name: "Nocna Zmiana", desc: "Dla tych, co piją po 22:00", icon: "🌙", genre: "Night" },
];

const FAKE_FREQUENCY = "107.5 FM";

const EQ_BARS = 16;

const FiszRadio = () => {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [staticNoise, setStaticNoise] = useState("");
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const [eqHeights, setEqHeights] = useState<number[]>(Array(EQ_BARS).fill(4));
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const noiseRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const eqRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentShow = SHOWS[currentIdx];

  useEffect(() => {
    if (playing) {
      progRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setCurrentIdx((prev) => (prev + 1) % SHOWS.length);
            return 0;
          }
          return p + 0.3;
        });
      }, 200);

      noiseRef.current = setInterval(() => {
        const noises = ["...trzask...", "...szum...", "...pianka...", "...chmiel...", "...bulgot...", "...dzwonek..."];
        setStaticNoise(noises[Math.floor(Math.random() * noises.length)]);
      }, 4000);

      eqRef.current = setInterval(() => {
        setEqHeights(Array.from({ length: EQ_BARS }, () => 4 + Math.random() * 20));
      }, 120);
    } else {
      if (progRef.current) clearInterval(progRef.current);
      if (noiseRef.current) clearInterval(noiseRef.current);
      if (eqRef.current) clearInterval(eqRef.current);
      setStaticNoise("");
      setEqHeights(Array(EQ_BARS).fill(4));
    }

    return () => {
      if (progRef.current) clearInterval(progRef.current);
      if (noiseRef.current) clearInterval(noiseRef.current);
      if (eqRef.current) clearInterval(eqRef.current);
    };
  }, [playing]);

  const nextShow = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % SHOWS.length);
    setProgress(0);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  const effectiveVolume = muted ? 0 : volume;

  return (
    <div className="fixed bottom-24 right-4 md:right-6 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="pointer-events-auto glass-card rounded-2xl p-4 w-[260px] md:w-[280px] border border-beer-gold/20 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-beer-gold" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-beer-gold uppercase">
                  Fisz FM
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-muted-foreground font-mono">{FAKE_FREQUENCY}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Equalizer */}
            {playing && (
              <div className="flex items-end justify-center gap-[2px] h-8 mb-3 px-2">
                {eqHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-[6px] md:w-[7px] rounded-full"
                    style={{ height: h, backgroundColor: `hsl(${42 + i * 2}, 92%, ${50 + (h / 24) * 20}%)` }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>
            )}

            {/* Fake radio display */}
            <div className="bg-muted/40 rounded-xl p-3 mb-3 border border-border/20">
              <div className="flex items-center gap-2 mb-1">
                <Music className="h-3 w-3 text-beer-amber" />
                <span className="text-[10px] text-beer-amber font-semibold uppercase tracking-wider">
                  Teraz gramy:
                </span>
              </div>
              <p className="text-sm font-bold text-foreground">
                {currentShow.icon} {currentShow.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {currentShow.desc}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[9px] text-muted-foreground/70 font-mono bg-muted/40 px-1.5 py-0.5 rounded">
                  {currentShow.genre}
                </span>
                {playing && staticNoise && (
                  <span className="text-[9px] text-muted-foreground/50 italic animate-pulse">
                    {staticNoise}
                  </span>
                )}
              </div>
            </div>

            {/* Progress bar */}
            {playing && (
              <div className="h-1.5 rounded-full bg-muted/50 mb-3 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-beer-amber to-beer-gold"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Volume */}
            <div className="flex items-center gap-2 mb-3">
              <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground transition-colors">
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
              <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-beer-gold/60 transition-all duration-150"
                  style={{ width: `${effectiveVolume}%` }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground font-mono w-6 text-right">{effectiveVolume}%</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setPlaying(!playing)}
                className="p-3 rounded-full bg-beer-gold/15 hover:bg-beer-gold/25 text-beer-gold transition-colors"
                aria-label={playing ? "Pauza" : "Odtwórz"}
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </button>
              <button
                onClick={nextShow}
                className="p-2.5 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Następny program"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-1">
        <motion.button
          onClick={() => setOpen(!open)}
          className="pointer-events-auto relative flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-beer-hop to-beer-gold text-beer-dark shadow-xl border-2 border-beer-foam/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={playing ? { boxShadow: ["0 0 0px hsl(var(--beer-gold)/0)", "0 0 20px hsl(var(--beer-gold)/0.4)", "0 0 0px hsl(var(--beer-gold)/0)"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Fisz Radio"
        >
          <Radio className="h-5 w-5" />
          {playing && (
            <motion.span
              className="absolute -top-1 -right-1 flex h-3 w-3"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-beer-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-beer-gold" />
            </motion.span>
          )}
        </motion.button>
        <span className="text-[9px] text-muted-foreground/50 font-mono hidden md:block">FM</span>
      </div>
    </div>
  );
};

export default FiszRadio;
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wine, Shuffle, Copy, Check } from "lucide-react";

const DRUNK_RULES: ((text: string) => string)[] = [
  (text) => text.replace(/a/gi, "á").replace(/e/gi, "é").replace(/i/gi, "í").replace(/o/gi, "ó").replace(/u/gi, "ú"),
  (text) => text.split("").map((c, i) => i % 3 === 1 ? c.toUpperCase() : c.toLowerCase()).join(""),
  (text) => text.replace(/r/gi, "ł").replace(/R/g, "Ł"),
  (text) => {
    const words = text.split(" ");
    return words.map((w, i) => i % 4 === 3 ? "..." : w).join(" ");
  },
  (text) => {
    const result: string[] = [];
    for (let i = 0; i < text.length; i++) {
      result.push(text[i]);
      if (Math.random() < 0.15 && text[i] !== " ") result.push(text[i]);
    }
    return result.join("");
  },
  (text) => text.split(" ").reverse().join(" "),
  (text) => text.toLowerCase().replace(/(^|\s)\w/g, (m) => m.toUpperCase() + "HIC"),
  (text) => {
    const hics = ["*hic*", "*belch*", "*glug*", "*burp*", "*hik*"];
    const words = text.split(" ");
    return words.map((w, i) => i % 3 === 2 ? `${w} ${hics[Math.floor(Math.random() * hics.length)]}` : w).join(" ");
  },
];

const DRUNK_NAMES = [
  "🥴 Pijany Mors",
  "🍺 Podwójne IPA",
  "🤪 Po trzech stoutach",
  "😵 Rzeczownik Odmiana",
  "🍷 WinoWładcza",
  "🥃 Wódczana Mowa",
  "🍻 Piwny Zmutowany",
  "🐟 Fisz po piątym",
];

const PRESETS = [
  "Chciałbym zamówić piwo IPA proszę",
  "Czy macie darmową dostawę?",
  "Fisz to najlepsza ryba w mieście",
  "Wczoraj wypiłem za dużo i teraz mnie głowa boli",
  "Polecam wasz sklep każdemu kogo znam",
];

const DrunkTyper = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [ruleIndex, setRuleIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const transform = useCallback((text: string, idx?: number) => {
    const i = idx ?? ruleIndex;
    return DRUNK_RULES[i % DRUNK_RULES.length](text);
  }, [ruleIndex]);

  const handleTransform = () => {
    if (!input.trim()) return;
    const result = transform(input);
    setOutput(result);
  };

  const handleRandom = () => {
    const newIdx = Math.floor(Math.random() * DRUNK_RULES.length);
    setRuleIndex(newIdx);
    if (input.trim()) {
      setOutput(transform(input, newIdx));
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreset = (text: string) => {
    setInput(text);
    const result = DRUNK_RULES[ruleIndex % DRUNK_RULES.length](text);
    setOutput(result);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="pointer-events-auto relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-rose-500 to-orange-600 text-white text-2xl shadow-xl border-2 border-orange-300/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: [0, -3, 3, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        title="Pijany Tłumacz 🥴"
      >
        🥴
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-orange-400/40"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
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
                className="relative w-full max-w-md glass-card rounded-3xl p-5 border border-orange-500/30 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🥴🍺</div>
                  <h2 className="font-display text-xl font-bold">Pijany Tłumacz</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Przetłumacz tekst na mowę Fisza po piątym piwie
                  </p>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-beer-gold uppercase tracking-wider">Styl pijania</label>
                    <button
                      onClick={handleRandom}
                      className="flex items-center gap-1 text-[10px] font-bold text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <Shuffle className="h-3 w-3" />
                      Losowy
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {DRUNK_NAMES.map((name, i) => (
                      <button
                        key={i}
                        onClick={() => { setRuleIndex(i); if (input.trim()) setOutput(DRUNK_RULES[i](input)); }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                          ruleIndex === i
                            ? "bg-orange-500/30 border border-orange-500/50 text-orange-200"
                            : "bg-muted/30 border border-border/20 text-muted-foreground hover:border-orange-500/30"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Wpisz tekst do przetłumaczenia..."
                  className="w-full h-20 px-3 py-2 rounded-xl border border-input bg-background/80 text-foreground text-sm resize-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/40 outline-none transition-all"
                />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleTransform}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-600 text-white font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    🍺 Przetłumacz!
                  </button>
                  {output && (
                    <button
                      onClick={handleCopy}
                      className="px-3 py-2.5 rounded-xl border border-border/40 bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  )}
                </div>

                {output && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20"
                  >
                    <p className="text-sm text-foreground italic">{output}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      — {DRUNK_NAMES[ruleIndex % DRUNK_NAMES.length]}
                    </p>
                  </motion.div>
                )}

                <div className="mt-3">
                  <p className="text-[10px] font-bold text-beer-gold/50 uppercase tracking-wider mb-1.5">Przykłady:</p>
                  <div className="flex flex-wrap gap-1">
                    {PRESETS.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => handlePreset(preset)}
                        className="px-2 py-1 rounded-lg text-[10px] bg-muted/30 border border-border/20 text-muted-foreground hover:text-foreground hover:border-orange-500/30 transition-colors"
                      >
                        {preset.length > 25 ? preset.slice(0, 25) + "..." : preset}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DrunkTyper;
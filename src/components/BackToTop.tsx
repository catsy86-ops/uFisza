import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Beer } from "lucide-react";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-32 right-6 z-40 h-11 w-11 rounded-full bg-gradient-to-br from-beer-amber to-beer-gold text-beer-dark shadow-lg border border-beer-foam/20 flex items-center justify-center group overflow-hidden"
          title="Wróć na górę"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.div>
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100"
            animate={{ y: [0, -4, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <Beer className="h-3 w-3 text-beer-foam/60" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
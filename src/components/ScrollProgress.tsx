import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(var(--beer-amber)), hsl(var(--beer-gold)), hsl(var(--beer-copper)), hsl(var(--beer-gold)))",
      }}
    >
      <div className="absolute inset-0 opacity-40 blur-[2px]" style={{ background: "linear-gradient(90deg, hsl(var(--beer-gold)), hsl(var(--beer-wheat)), hsl(var(--beer-gold)))" }} />
    </motion.div>
  );
};

export default ScrollProgress;
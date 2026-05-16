import { useEffect, useRef, useCallback, useState } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const frameRef = useRef<number>(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const counterRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  const addBubble = useCallback((x: number, y: number) => {
    if (bubblesRef.current.length > 12) return;
    bubblesRef.current.push({
      id: counterRef.current++,
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      size: 3 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.3,
    });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 30) {
        addBubble(e.clientX, e.clientY);
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current = bubblesRef.current.filter((b) => {
        b.opacity -= 0.008;
        b.y -= 0.5;
        b.size *= 0.995;

        if (b.opacity <= 0 || b.size < 0.5) return false;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size);
        gradient.addColorStop(0, `hsla(42, 92%, 52%, ${b.opacity})`);
        gradient.addColorStop(1, `hsla(42, 92%, 52%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.x - b.size * 0.2, b.y - b.size * 0.2, b.size * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.6})`;
        ctx.fill();

        return true;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isMobile, addBubble]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[55] pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default CursorTrail;
import { useCallback } from "react";

const CONFETTI_COLORS = [
  "hsl(42, 92%, 52%)",
  "hsl(32, 85%, 42%)",
  "hsl(18, 75%, 32%)",
  "hsl(45, 40%, 96%)",
  "hsl(95, 50%, 38%)",
  "hsl(42, 60%, 75%)",
  "#FF6B6B",
  "#FFD93D",
  "#6BCB77",
  "#4D96FF",
];

const CONFETTI_SHAPES = ["square", "circle", "triangle"] as const;

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  shape: typeof CONFETTI_SHAPES[number];
  size: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  gravity: number;
  drag: number;
  wobble: number;
  wobbleSpeed: number;
}

let particles: Particle[] = [];
let animationId: number | null = null;
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let counter = 0;

const initCanvas = () => {
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.zIndex = "9999";
  canvas.style.pointerEvents = "none";
  canvas.id = "confetti-canvas";
  document.body.appendChild(canvas);

  const resize = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  ctx = canvas.getContext("2d");
};

const animate = () => {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((p) => {
    p.velocityY += p.gravity;
    p.velocityX *= p.drag;
    p.x += p.velocityX + Math.sin(p.wobble) * 0.5;
    p.y += p.velocityY;
    p.rotation += p.rotationSpeed;
    p.wobble += p.wobbleSpeed;
    p.opacity -= 0.003;

    if (p.opacity <= 0 || p.y > canvas.height + 20) return false;

    ctx!.save();
    ctx!.translate(p.x, p.y);
    ctx!.rotate(p.rotation);
    ctx!.globalAlpha = p.opacity;

    if (p.shape === "circle") {
      ctx!.beginPath();
      ctx!.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx!.fillStyle = p.color;
      ctx!.fill();
    } else if (p.shape === "triangle") {
      ctx!.beginPath();
      ctx!.moveTo(0, -p.size / 2);
      ctx!.lineTo(-p.size / 2, p.size / 2);
      ctx!.lineTo(p.size / 2, p.size / 2);
      ctx!.closePath();
      ctx!.fillStyle = p.color;
      ctx!.fill();
    } else {
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    }

    ctx!.restore();
    return true;
  });

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animate);
  } else {
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    canvas = null;
    ctx = null;
    animationId = null;
  }
};

const createParticles = (
  x: number,
  y: number,
  count: number,
  spread: number = 70,
  startVelocity: number = 15
) => {
  for (let i = 0; i < count; i++) {
    const angle = (Math.random() * Math.PI * 2);
    const velocity = startVelocity * (0.5 + Math.random() * 0.5);
    particles.push({
      id: counter++,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
      size: 4 + Math.random() * 8,
      velocityX: Math.cos(angle) * velocity * (0.5 + Math.random()),
      velocityY: Math.sin(angle) * velocity - Math.random() * 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      opacity: 0.9 + Math.random() * 0.1,
      gravity: 0.25 + Math.random() * 0.15,
      drag: 0.98 + Math.random() * 0.015,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.05,
    });
  }
};

export const fireConfetti = (
  x?: number,
  y?: number,
  count: number = 80
) => {
  initCanvas();
  const targetX = x ?? window.innerWidth / 2;
  const targetY = y ?? window.innerHeight / 3;
  createParticles(targetX, targetY, count);

  if (!animationId) {
    animationId = requestAnimationFrame(animate);
  }
};

export const fireConfettiFromSides = () => {
  initCanvas();
  createParticles(0, window.innerHeight * 0.6, 40);
  createParticles(window.innerWidth, window.innerHeight * 0.6, 40);

  if (!animationId) {
    animationId = requestAnimationFrame(animate);
  }
};

export const fireConfettiRain = () => {
  initCanvas();
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createParticles(
        Math.random() * window.innerWidth,
        -20,
        30
      );
    }, i * 200);
  }

  if (!animationId) {
    animationId = requestAnimationFrame(animate);
  }
};

export const useConfetti = () => {
  const fire = useCallback((x?: number, y?: number, count?: number) => {
    fireConfetti(x, y, count);
  }, []);

  const fireSides = useCallback(() => {
    fireConfettiFromSides();
  }, []);

  const fireRain = useCallback(() => {
    fireConfettiRain();
  }, []);

  return { fire, fireSides, fireRain };
};
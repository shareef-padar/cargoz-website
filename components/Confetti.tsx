'use client';

import { useEffect, useRef } from 'react';

interface ConfettiProps {
  trigger: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  wave: number;   // horizontal sway offset
  waveSpeed: number;
}

const COLORS = ['#7C3AED', '#2563EB', '#0F766E', '#F59E0B', '#EF4444', '#10B981', '#F472B6', '#FBBF24'];
const GRAVITY = 0.12;
const PARTICLE_COUNT = 160;

export function Confetti({ trigger }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particles rain from the top — scattered across the full width, staggered start heights
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: -(Math.random() * canvas.height * 0.5), // stagger entry: -0 to -50% height
      vx: (Math.random() - 0.5) * 2,             // gentle horizontal drift
      vy: Math.random() * 3 + 2,                 // fall speed 2–5
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      width: Math.random() * 8 + 6,              // 6–14px wide
      height: Math.random() * 4 + 3,             // 3–7px tall (ribbon shape)
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      alpha: 1,
      wave: Math.random() * Math.PI * 2,         // phase offset for sway
      waveSpeed: Math.random() * 0.04 + 0.02,    // sway speed
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Remove particles that have fully fallen off screen or faded
      particlesRef.current = particlesRef.current.filter(
        (p) => p.y < canvas.height + 20 && p.alpha > 0,
      );

      if (particlesRef.current.length === 0) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        return;
      }

      for (const p of particlesRef.current) {
        // Physics
        p.vy += GRAVITY;
        p.wave += p.waveSpeed;
        p.x += p.vx + Math.sin(p.wave) * 1.2; // gentle left-right sway
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Fade out only in the bottom 20% of the screen
        if (p.y > canvas.height * 0.8) {
          p.alpha = Math.max(0, p.alpha - 0.025);
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        // Draw as a small ribbon/rectangle
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="tw-fixed tw-inset-0 tw-z-[150] tw-pointer-events-none"
    />
  );
}

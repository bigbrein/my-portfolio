"use client";

import { useEffect, useMemo, useState } from "react";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

const MIN_SIZE = 65;
const MAX_WIDTH = 85;
const MAX_HEIGHT = 100;
const GRID_GAP = 36;
const BOX_VMAX = 150;
const MIN_LINE_SCALE = 0.4;
const MIN_RATE = 0.3;
const MAX_RATE = 2;
const TIP_FADE = "linear-gradient(to top, black 55%, transparent 100%)";
const TIP_FADE_HORIZONTAL =
  "linear-gradient(to right, black 55%, transparent 100%)";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function lineScale(progress: number, rate: number) {
  return Math.min(1, MIN_LINE_SCALE + progress * rate);
}

export default function GridBackground() {
  const progress = useScrollProgress();
  const [mounted, setMounted] = useState(false);
  const [boxPx, setBoxPx] = useState(0);

  useEffect(() => {
    function updateBoxPx() {
      setBoxPx(
        (Math.max(window.innerWidth, window.innerHeight) * BOX_VMAX) / 100,
      );
    }
    updateBoxPx();
    window.addEventListener("resize", updateBoxPx);
    return () => window.removeEventListener("resize", updateBoxPx);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const width = MIN_SIZE + progress * (MAX_WIDTH - MIN_SIZE);
  const height = MIN_SIZE + progress * (MAX_HEIGHT - MIN_SIZE);

  const lines = useMemo(() => {
    const count = boxPx > 0 ? Math.ceil(boxPx / GRID_GAP) + 1 : 0;
    return Array.from({ length: count }, (_, i) => i);
  }, [boxPx]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-0 left-0 -z-10 origin-bottom-left overflow-hidden"
      style={{
        width: `${width}vw`,
        height: `${height}vh`,
        transform: mounted ? "scale(1)" : "scale(0.85)",
        opacity: mounted ? 1 : 0,
        transitionProperty: "width, height, transform, opacity",
        transitionDuration: "500ms, 500ms, 900ms, 900ms",
        transitionTimingFunction: "ease-out",
        maskImage:
          "radial-gradient(circle at bottom left, black 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(circle at bottom left, black 0%, transparent 70%)",
      }}
    >
      <div className="absolute top-1/2 left-1/2 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 rotate-45">
        {lines.map((i) => {
          const rate = MIN_RATE + seededRandom(i) * (MAX_RATE - MIN_RATE);
          const scale = mounted ? lineScale(progress, rate) : 0;
          return (
            <span
              key={`v-${i}`}
              className="bg-border absolute top-0 bottom-0 w-px"
              style={{
                left: `${i * GRID_GAP}px`,
                transformOrigin: "bottom",
                transform: `scaleY(${scale})`,
                transitionProperty: "transform",
                transitionDuration: "150ms",
                transitionTimingFunction: "ease-out",
                maskImage: TIP_FADE,
                WebkitMaskImage: TIP_FADE,
              }}
            />
          );
        })}
        {lines.map((i) => {
          const rate =
            MIN_RATE + seededRandom(i + 0.37) * (MAX_RATE - MIN_RATE);
          const scale = mounted ? lineScale(progress, rate) : 0;
          return (
            <span
              key={`h-${i}`}
              className="bg-border absolute left-0 right-0 h-px"
              style={{
                top: `${i * GRID_GAP}px`,
                transformOrigin: "left",
                transform: `scaleX(${scale})`,
                transitionProperty: "transform",
                transitionDuration: "150ms",
                transitionTimingFunction: "ease-out",
                maskImage: TIP_FADE_HORIZONTAL,
                WebkitMaskImage: TIP_FADE_HORIZONTAL,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

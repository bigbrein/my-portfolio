"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const ROW_COUNT = 60;
const CHARSET =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export default function MatrixScrollbar() {
  const [progress, setProgress] = useState(0);
  const [chars, setChars] = useState<string[]>(() =>
    Array(ROW_COUNT).fill(" "),
  );

  useEffect(() => {
    function updateProgress() {
      const scrollable =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(
        scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0,
      );
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    setChars(Array.from({ length: ROW_COUNT }, randomChar));

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setChars(Array.from({ length: ROW_COUNT }, randomChar));
    }, 120);
    return () => clearInterval(id);
  }, []);

  const filledRows = Math.round(progress * ROW_COUNT);

  return (
    <div
      aria-hidden
      className="fixed inset-y-0 right-0 z-20 flex w-5 flex-col overflow-hidden bg-transparent pointer-events-none"
    >
      {chars.map((char, index) => {
        const isFilled = index < filledRows;
        const isLeadingEdge = index === filledRows - 1;

        return (
          <span
            key={index}
            className={cn(
              "flex flex-1 items-center justify-center font-mono text-[10px] leading-none transition-opacity duration-150",
              isFilled ? "opacity-100" : "opacity-0",
              isLeadingEdge ? "text-green-300" : "text-green-500",
            )}
            style={
              isFilled
                ? { textShadow: "0 0 6px rgba(34, 197, 94, 0.85)" }
                : undefined
            }
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";

const ROW_COUNT = 60;
const CHARSET =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

function scrollToFraction(fraction: number) {
  const clamped = Math.min(1, Math.max(0, fraction));
  const maxScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  window.scrollTo({ top: clamped * maxScroll, behavior: "instant" });
}

export default function MatrixScrollbar() {
  const progress = useScrollProgress();
  const [chars, setChars] = useState<string[]>(() =>
    Array(ROW_COUNT).fill(" "),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  function updateScrollFromPointer(clientY: number) {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    scrollToFraction((clientY - rect.top) / rect.height);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    containerRef.current?.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateScrollFromPointer(e.clientY);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    updateScrollFromPointer(e.clientY);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    containerRef.current?.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      window.scrollBy({ top: 80, behavior: "smooth" });
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      window.scrollBy({ top: -80, behavior: "smooth" });
    } else if (e.key === "Home") {
      e.preventDefault();
      scrollToFraction(0);
    } else if (e.key === "End") {
      e.preventDefault();
      scrollToFraction(1);
    }
  }

  const filledRows = Math.round(progress * ROW_COUNT);

  return (
    <div
      ref={containerRef}
      role="scrollbar"
      aria-label="Page scroll position"
      aria-orientation="vertical"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={cn(
        "fixed inset-y-0 right-0 z-20 hidden w-5 touch-none flex-col overflow-hidden bg-transparent select-none md:flex",
        "cursor-ns-resize outline-none focus-visible:bg-foreground/5",
      )}
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
              isLeadingEdge ? "text-green-400" : "text-green-700",
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

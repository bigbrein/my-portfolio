"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type TypewriterSegment = {
  text: string;
  bold?: boolean;
};

type TypewriterProps = {
  segments: TypewriterSegment[];
  speed?: number;
  startDelay?: number;
  className?: string;
  /** Controlled trigger. When omitted, typing starts automatically once scrolled into view. */
  start?: boolean;
  onHalfway?: () => void;
  onDone?: () => void;
};

// Precomputed once — avoids calling the (relatively expensive) class-merge
// utility for every character on every reveal tick.
const CHAR_CLASS = "animate-in fade-in fill-mode-both duration-300";
const CHAR_CLASS_BOLD = cn(CHAR_CLASS, "font-semibold text-foreground");

export default function Typewriter({
  segments,
  speed = 4,
  startDelay = 0,
  className,
  start,
  onHalfway,
  onDone,
}: TypewriterProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(0);

  const { chars, fullText } = useMemo(() => {
    return {
      chars: segments.flatMap((segment) =>
        Array.from(segment.text).map((char) => ({
          char,
          bold: !!segment.bold,
        })),
      ),
      fullText: segments.map((s) => s.text).join(""),
    };
  }, [segments]);
  const fullLength = chars.length;
  const shouldStart = start ?? inView;

  useEffect(() => {
    if (start !== undefined) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [start]);

  useEffect(() => {
    if (!shouldStart) return;

    let rafId: number | undefined;
    let startTimestamp: number | null = null;

    const startTimeout = window.setTimeout(() => {
      const tick = (timestamp: number) => {
        if (startTimestamp === null) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const next = Math.min(fullLength, Math.floor(elapsed / speed));
        setCount(next);
        if (next < fullLength) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimeout);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, [shouldStart, fullLength, speed, startDelay]);

  const halfway = count >= Math.ceil(fullLength / 2);
  const done = count >= fullLength;

  const callbacksRef = useRef({ onHalfway, onDone });
  useEffect(() => {
    callbacksRef.current = { onHalfway, onDone };
  });
  useEffect(() => {
    if (halfway) callbacksRef.current.onHalfway?.();
  }, [halfway]);
  useEffect(() => {
    if (done) callbacksRef.current.onDone?.();
  }, [done]);

  return (
    <p
      ref={ref}
      aria-label={fullText}
      className={cn(
        "transition-all duration-500 ease-out",
        shouldStart ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      <span aria-hidden>
        {done
          ? segments.map((segment, index) =>
              segment.bold ? (
                <strong key={index} className="font-semibold text-foreground">
                  {segment.text}
                </strong>
              ) : (
                segment.text
              ),
            )
          : chars.slice(0, count).map(({ char, bold }, index) => (
              <span key={index} className={bold ? CHAR_CLASS_BOLD : CHAR_CLASS}>
                {char}
              </span>
            ))}
      </span>
    </p>
  );
}

"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px bg-border md:hidden"
    >
      <div
        className="h-full bg-foreground"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

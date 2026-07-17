"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const directionClass = {
  bottom: "slide-in-from-bottom-10",
  top: "slide-in-from-top-10",
  left: "slide-in-from-left-10",
  right: "slide-in-from-right-10",
} as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: keyof typeof directionClass;
  delay?: number;
};

export default function Reveal({
  children,
  className,
  direction = "bottom",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        !isVisible && "opacity-0",
        isVisible && [
          "animate-in fade-in fill-mode-both duration-700 ease-out",
          directionClass[direction],
        ],
        className,
      )}
    >
      {children}
    </div>
  );
}

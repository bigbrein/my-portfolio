"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";

// Tune the effect here.
const MAX_STREAMS = 7;
const COLOR_CLASS = "text-green-500";
const STREAM_OPACITY = 0.5;
const SPAWN_CHECK_MS = 1200;
const SPAWN_CHANCE = 0.4;
const STREAM_LENGTH = 12;
const MIN_DURATION_S = 5;
const MAX_DURATION_S = 10;

// How often streams clump together instead of spawning alone.
const CLUSTER_CHANCE = 0.4;
const MAX_CLUSTER_SIZE = 3;
const CLUSTER_SPREAD_VW = 6;

// How often falling characters flicker to a new random glyph.
const MUTATE_INTERVAL_MS = 120;

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type Stream = {
  id: number;
  left: number;
  duration: number;
  chars: string[];
};

function createStream(id: number, left: number): Stream {
  return {
    id,
    left,
    duration:
      MIN_DURATION_S + Math.random() * (MAX_DURATION_S - MIN_DURATION_S),
    chars: Array.from({ length: STREAM_LENGTH }, randomChar),
  };
}

function createGroup(id: () => number, availableSlots: number): Stream[] {
  const isCluster = Math.random() < CLUSTER_CHANCE;
  const size = Math.min(
    isCluster ? 2 + Math.floor(Math.random() * (MAX_CLUSTER_SIZE - 1)) : 1,
    availableSlots,
  );
  if (size <= 0) return [];

  const baseLeft = Math.random() * 100;
  return Array.from({ length: size }, () => {
    const left = isCluster
      ? clamp(baseLeft + (Math.random() - 0.5) * CLUSTER_SPREAD_VW, 0, 100)
      : Math.random() * 100;
    return createStream(id(), left);
  });
}

export default function MatrixRain() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const spawnId = setInterval(() => {
      setStreams((current) => {
        if (current.length >= MAX_STREAMS) return current;
        if (Math.random() > SPAWN_CHANCE) return current;
        const group = createGroup(
          () => nextId.current++,
          MAX_STREAMS - current.length,
        );
        return [...current, ...group];
      });
    }, SPAWN_CHECK_MS);

    const mutateId = setInterval(() => {
      setStreams((current) =>
        current.map((stream) => ({
          ...stream,
          chars: Array.from({ length: STREAM_LENGTH }, randomChar),
        })),
      );
    }, MUTATE_INTERVAL_MS);

    return () => {
      clearInterval(spawnId);
      clearInterval(mutateId);
    };
  }, []);

  function handleStreamEnd(id: number) {
    setStreams((current) => current.filter((stream) => stream.id !== id));
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {streams.map((stream) => (
        <div
          key={stream.id}
          onAnimationEnd={() => handleStreamEnd(stream.id)}
          className={`animate-matrix-fall absolute top-0 flex flex-col font-mono text-xs leading-tight ${COLOR_CLASS}`}
          style={{
            left: `${stream.left}vw`,
            animationDuration: `${stream.duration}s`,
          }}
        >
          {stream.chars.map((char, index) => (
            <span
              key={index}
              style={{
                opacity: STREAM_OPACITY * ((index + 1) / stream.chars.length),
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

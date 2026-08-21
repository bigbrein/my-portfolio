"use client";

import { useState } from "react";

import Reveal from "@/components/custom_ui/reveal";
import Typewriter from "@/components/custom_ui/typewriter";
import {
  ABOUT_DESKTOP_PARAGRAPHS,
  ABOUT_MOBILE_PARAGRAPHS,
} from "@/lib/site/about";

export default function About() {
  const [desktopStep, setDesktopStep] = useState(0);

  return (
    <section
      id="about"
      className="min-h-[90vh] w-full max-w-4xl mx-auto px-4 py-24 flex flex-col justify-center"
    >
      <Reveal>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
          <h2 className="text-halo shrink-0 text-center font-mono text-4xl font-bold tracking-tight sm:text-5xl md:sticky md:top-32 md:text-6xl not-md:hidden">
            <span className="block">Who</span>
            <span className="block my-7">Am</span>
            <span className="block">I?</span>
          </h2>
          <h2 className="text-halo shrink-0 text-center font-mono text-4xl font-bold tracking-tight sm:text-5xl md:sticky md:top-32 md:text-6xl md:hidden">
            <span className="block">Who Am I?</span>
          </h2>
          <div className="flex flex-col gap-4 font-mono leading-relaxed not-md:hidden">
            <p className="text-halo text-muted-foreground"># About Me</p>
            {ABOUT_DESKTOP_PARAGRAPHS.map((segments, index) => (
              <Typewriter
                key={index}
                className="text-halo text-foreground"
                segments={segments}
                start={index === 0 ? undefined : desktopStep >= index}
                onDone={() =>
                  setDesktopStep((step) => Math.max(step, index + 1))
                }
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 font-mono leading-relaxed md:hidden">
            <p className="text-halo text-muted-foreground text-center">
              # About Me
            </p>
            {ABOUT_MOBILE_PARAGRAPHS.map((text, index) => (
              <Reveal key={index} direction="bottom" delay={index * 150}>
                <p className="text-halo text-foreground text-center">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

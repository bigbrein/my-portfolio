"use client";

import { useState } from "react";

import Reveal from "@/components/custom_ui/reveal";
import Typewriter, {
  type TypewriterSegment,
} from "@/components/custom_ui/typewriter";

const MOBILE_PARAGRAPHS: string[] = [
  "I'm Eke Samuel, a Software developer passionate about full-stack development.",
  "I enjoy building modern applications, learning new technologies, and solving real-world problems through code.",
  "I'm always looking to grow my skills, connect with other developers, and collaborate on meaningful projects.",
];

const DESKTOP_PARAGRAPHS: TypewriterSegment[][] = [
  [
    { text: "Hi, I'm " },
    { text: "Eke Samuel", bold: true },
    {
      text: ", a Software developer with a passion for building modern, user-focused applications. I enjoy turning ideas into practical solutions and continuously expanding my knowledge across the software development landscape.",
    },
  ],
  [
    { text: "My primary focus is " },
    { text: "full-stack development", bold: true },
    {
      text: ", where I work with technologies across both the frontend and backend to create responsive, scalable, and maintainable applications. I'm always exploring new tools, frameworks, and best practices to improve my skills and build better software.",
    },
  ],
  [
    {
      text: "Beyond writing code, I'm passionate about learning, solving challenging problems, and connecting with other developers. My goal is to build a strong professional network, collaborate on meaningful projects, and continue growing as a software engineer.",
    },
  ],
  [
    {
      text: "Whether you're looking to collaborate, discuss technology, or simply connect, I'd be happy to hear from you.",
    },
  ],
];

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
            {DESKTOP_PARAGRAPHS.map((segments, index) => (
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
            {MOBILE_PARAGRAPHS.map((text, index) => (
              <Reveal key={index} direction="bottom" delay={index * 150}>
                <p className="text-halo text-foreground text-center">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

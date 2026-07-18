import type { IconType } from "react-icons";
import {
  SiGit,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiDotnet,
  SiMongodb,
  SiClaudecode,
  SiClaude,
} from "react-icons/si";

import Reveal from "@/components/custom_ui/reveal";
import { Card } from "@/components/ui/card";

type Skill = {
  name: string;
  description: string;
  icon: IconType;
};

type SkillCategory = {
  label: string;
  skills: Skill[];
};

// Add / remove / edit skills here — grouped by category.
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "languages",
    skills: [
      {
        name: "JavaScript",
        description: "Core language for interactive, dynamic web apps.",
        icon: SiJavascript,
      },
      {
        name: "TypeScript",
        description: "Typed superset of JavaScript for safer, scalable code.",
        icon: SiTypescript,
      },
      {
        name: "Python",
        description:
          "Versatile language for scripting, automation, and backend logic.",
        icon: SiPython,
      },
      {
        name: "C#",
        description:
          "Object-oriented language for robust, cross-platform systems.",
        icon: SiDotnet,
      },
    ],
  },
  {
    label: "frameworks-and-libraries",
    skills: [
      {
        name: "React",
        description:
          "Component-based library for building dynamic user interfaces.",
        icon: SiReact,
      },
      {
        name: "Next.js",
        description:
          "React framework for server-rendered, full-stack web apps.",
        icon: SiNextdotjs,
      },
      {
        name: "Node.js",
        description:
          "JavaScript runtime for building scalable backend services.",
        icon: SiNodedotjs,
      },
      {
        name: "Tailwind CSS",
        description:
          "Utility-first CSS framework for fast, consistent styling.",
        icon: SiTailwindcss,
      },
      {
        name: "MAUI",
        description:
          "Framework for building cross-platform applications with C#.",
        icon: SiDotnet,
      },
      {
        name: "Blazor",
        description:
          "Framework for building interactive web UIs with C# instead of JavaScript.",
        icon: SiDotnet,
      },
    ],
  },
  {
    label: "tools-and-platforms",
    skills: [
      {
        name: "Git",
        description:
          "Version control system for tracking and collaborating on code.",
        icon: SiGit,
      },
      {
        name: "PostgreSQL",
        description:
          "Relational database for structured, reliable data storage.",
        icon: SiPostgresql,
      },
      {
        name: "MongoDB",
        description:
          "NoSQL database for flexible, scalable data storage and retrieval.",
        icon: SiMongodb,
      },
      {
        name: "Claude Code",
        description:
          "AI agent for streamlining development tasks and code generation.",
        icon: SiClaudecode,
      },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-[90vh] w-full max-w-5xl mx-auto px-4 py-24 flex flex-col justify-center"
    >
      <Reveal>
        <p className="text-halo font-mono text-muted-foreground mb-6">
          <span className="text-primary">$</span> tree skills/
        </p>
        <div className="font-mono text-sm sm:text-base leading-relaxed">
          <p className="text-halo text-foreground">skills/</p>
          {SKILL_CATEGORIES.map((category, categoryIndex) => {
            const isLastCategory =
              categoryIndex === SKILL_CATEGORIES.length - 1;

            return (
              <div key={category.label}>
                <p className="text-halo text-foreground">
                  <span className="text-muted-foreground">
                    {isLastCategory ? "└── " : "├── "}
                  </span>
                  {category.label}/
                </p>
                <div className="flex gap-2 py-2">
                  <div className="hidden w-[4ch] shrink-0 sm:block">
                    {!isLastCategory && (
                      <div className="h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="-mx-4 flex flex-nowrap gap-3 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
                    {category.skills.map((skill, skillIndex) => (
                      <Reveal
                        key={skill.name}
                        direction="left"
                        mdOnly
                        delay={skillIndex * 75}
                        className="shrink-0"
                      >
                        <Card className="w-56 shrink-0 rounded-lg border border-border bg-card px-5 py-4 shadow-none ring-0 transition-colors hover:border-foreground/40">
                          <div className="flex items-center gap-2">
                            <skill.icon className="size-5 shrink-0 text-foreground" />
                            <p className="text-base text-foreground">
                              {skill.name}
                            </p>
                          </div>
                          <p className="text-xs leading-snug text-muted-foreground">
                            {skill.description}
                          </p>
                        </Card>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

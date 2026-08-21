import type { IconType } from "react-icons";
import {
  SiClaudecode,
  SiDotnet,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export type Skill = {
  name: string;
  description: string;
  icon: IconType;
};

export type SkillCategory = {
  label: string;
  skills: Skill[];
};

// Add / remove / edit skills here — grouped by category.
export const SKILL_CATEGORIES: SkillCategory[] = [
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
      {
        name: "Vercel",
        description: "Platform for deploying and hosting web applications.",
        icon: SiVercel,
      },
    ],
  },
];

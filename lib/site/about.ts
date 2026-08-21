import type { TypewriterSegment } from "@/components/custom_ui/typewriter";

export const ABOUT_MOBILE_PARAGRAPHS: string[] = [
  "I'm Eke Samuel, a Software developer passionate about full-stack development.",
  "I enjoy building modern applications, learning new technologies, and solving real-world problems through code.",
  "I'm always looking to grow my skills, connect with other developers, and collaborate on meaningful projects.",
];

export const ABOUT_DESKTOP_PARAGRAPHS: TypewriterSegment[][] = [
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

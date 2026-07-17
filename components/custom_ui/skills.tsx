import Reveal from "@/components/custom_ui/reveal";
import { Badge } from "@/components/ui/badge";

type SkillCategory = {
  label: string;
  skills: string[];
};

// Add / remove / edit skills here — grouped by category.
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java"],
  },
  {
    label: "Frameworks & Libraries",
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS"],
  },
  {
    label: "Tools & Platforms",
    skills: ["Git", "Docker", "PostgreSQL", "AWS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full max-w-3xl mx-auto px-4 py-24">
      <Reveal>
        <p className="font-mono text-muted-foreground mb-6">
          <span className="text-primary">$</span> cat skills.json
        </p>
        <div className="flex flex-col gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.label}>
              <p className="font-mono text-sm text-muted-foreground mb-2">
                // {category.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="font-mono">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

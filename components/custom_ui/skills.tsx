import Reveal from "@/components/custom_ui/reveal";
import { Card } from "@/components/ui/card";
import { SKILL_CATEGORIES } from "@/lib/site/skills";

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

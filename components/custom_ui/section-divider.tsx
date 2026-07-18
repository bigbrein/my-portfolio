import Reveal from "@/components/custom_ui/reveal";

type SectionDividerProps = {
  lines: string[];
};

export default function SectionDivider({ lines }: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-1 select-none"
    >
      <Reveal>
        <div className="flex flex-col items-center gap-1 font-mono text-xs text-muted-foreground/50">
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

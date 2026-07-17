import Reveal from "@/components/custom_ui/reveal";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen px-4">
      <Reveal>
        <p className="font-mono text-muted-foreground mb-2">
          <span className="text-primary">$</span> whoami?
        </p>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="font-mono text-5xl sm:text-7xl font-bold tracking-tight">
          Samuel
        </h1>
      </Reveal>
      <Reveal delay={150}>
        <p className="font-mono text-muted-foreground text-base sm:text-lg mt-4 max-w-xl">
          I&apos;m a software developer who enjoys turning ideas into clean,
          working code. I like building things end-to-end, from backend logic to
          polished interfaces.
        </p>
      </Reveal>
    </section>
  );
}

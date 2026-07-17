import Reveal from "@/components/custom_ui/reveal";

export default function About() {
  return (
    <section id="about" className="w-full max-w-3xl mx-auto px-4 py-24">
      <Reveal>
        <p className="font-mono text-muted-foreground mb-4">
          <span className="text-primary">$</span> cat about.md
        </p>
        <p className="font-mono leading-relaxed text-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Reveal>
    </section>
  );
}

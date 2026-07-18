import About from "@/components/custom_ui/about";
import Contact from "@/components/custom_ui/contact";
import Hero from "@/components/custom_ui/hero";
import SectionDivider from "@/components/custom_ui/section-divider";
import Skills from "@/components/custom_ui/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider
        lines={["$ cd ./skills", "// loading proficiencies..."]}
      />

      <Skills />
      <SectionDivider
        lines={["$ cat about.md | head -n 1", "// getting personal"]}
      />

      <About />
      <SectionDivider
        lines={[
          "# no bugs were harmed in the making of this portfolio",
          "$ ./contact.sh --ready",
        ]}
      />

      <Contact />
    </>
  );
}

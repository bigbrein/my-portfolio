import About from "@/components/custom_ui/about";
import Contact from "@/components/custom_ui/contact";
import Hero from "@/components/custom_ui/hero";
import Skills from "@/components/custom_ui/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <About />
      <Contact />
    </>
  );
}

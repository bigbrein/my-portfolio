import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav
        className="hidden md:flex gap-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          href="#home"
          className="hover:bg-accent p-2 rounded-md transition font-mono"
        >
          Home
        </Link>
        <Link
          href="#skills"
          className="hover:bg-accent p-2 rounded-md transition font-mono"
        >
          Skills
        </Link>
        <Link
          href="#projects"
          className="hover:bg-accent p-2 rounded-md transition font-mono"
        >
          Projects
        </Link>
        <Link
          href="#about"
          className="hover:bg-accent p-2 rounded-md transition font-mono"
        >
          About
        </Link>
        <Link
          href="#contact"
          className="hover:bg-accent p-2 rounded-md transition font-mono"
        >
          Contact
        </Link>
      </nav>
    </>
  );
}

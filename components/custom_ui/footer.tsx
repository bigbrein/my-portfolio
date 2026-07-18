import { Mail } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

// Replace with your real profile URLs / email address.
const SOCIAL_LINKS = [
  { href: "https://github.com/bigbrein", label: "GitHub", icon: FaGithub },
  {
    href: "https://linkedin.com/in/samueleke",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "your.email@example.com"}`,
    label: "Email",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t px-4 py-8 font-mono">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-halo text-sm text-muted-foreground">
          <span className="text-primary">$</span>{" "}
          {`echo "© ${new Date().getFullYear()} Eke Samuel"`}
        </p>
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

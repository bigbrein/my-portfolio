import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { CONTACT_EMAIL } from "@/lib/site/contact";

// Replace with your real profile URLs.
export const SOCIAL_LINKS = [
  { href: "https://github.com/bigbrein", label: "GitHub", icon: FaGithub },
  {
    href: "https://linkedin.com/in/samueleke",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: `mailto:${CONTACT_EMAIL}`,
    label: "Email",
    icon: Mail,
  },
];

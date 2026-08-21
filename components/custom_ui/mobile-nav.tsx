"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ThemeToggle from "@/components/custom_ui/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden fixed bottom-5 right-5 z-40">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
            />
          }
        >
          {open ? <X /> : <Menu />}
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          sideOffset={12}
          className="w-40 gap-1 p-2"
        >
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:bg-accent p-2 rounded-md transition font-mono text-sm mx-auto"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex justify-center border-t pt-1 mt-1">
            <ThemeToggle />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

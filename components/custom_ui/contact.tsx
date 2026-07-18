"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import Reveal from "@/components/custom_ui/reveal";
import TerminalWindow from "@/components/custom_ui/terminal-window";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Replace with your real email address.
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "your.email@example.com";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio contact from ${name || "a visitor"}`,
    );
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      className="min-h-[90vh] w-full max-w-3xl md:min-w-[40vw] mx-auto px-4 py-32 flex flex-col justify-center"
    >
      <Reveal>
        <TerminalWindow title="contact.sh">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <p className="text-muted-foreground">
              <span className="text-primary">$</span> ./contact.sh --send
            </p>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="font-mono text-muted-foreground">
                <span className="text-primary">&gt;</span> name
              </Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="font-mono text-muted-foreground"
              >
                <span className="text-primary">&gt;</span> email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="message"
                className="font-mono text-muted-foreground"
              >
                <span className="text-primary">&gt;</span> message
              </Label>
              <Textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let's build something..."
                className="min-h-32 font-mono"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="outline" className="font-mono">
                send --now
              </Button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {copied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copied ? "copied!" : CONTACT_EMAIL}
              </button>
            </div>
          </form>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}

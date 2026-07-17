import { cn } from "@/lib/utils";

type TerminalWindowProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function TerminalWindow({
  title,
  children,
  className,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border bg-card font-mono shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-500/70" />
          <span className="size-3 rounded-full bg-yellow-500/70" />
          <span className="size-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}

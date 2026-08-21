import { ChevronDown, ExternalLink } from "lucide-react";

import Reveal from "@/components/custom_ui/reveal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DEFAULT_PROJECT_PREVIEW_SIZE,
  DEFAULT_PROJECT_PREVIEW_VIEWPORT_WIDTH,
  MOBILE_PROJECT_PREVIEW_HEIGHT,
  PROJECTS,
  type Project,
} from "@/lib/site/projects";
import { cn } from "@/lib/utils";

function getDisplayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

type ProjectFrameProps = {
  project: Project;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Renders the embedded page at its real desktop width and scales it down
   * to fit, instead of letting the iframe's own (narrow) box force the
   * site into its mobile breakpoint. Needs a known, static card width.
   */
  desktopWidth?: number;
};

function ProjectFrame({
  project,
  height,
  className,
  style,
  desktopWidth,
}: ProjectFrameProps) {
  const viewportWidth =
    project.previewViewportWidth ?? DEFAULT_PROJECT_PREVIEW_VIEWPORT_WIDTH;
  const offsetY = project.previewOffsetY ?? 0;
  const scale = desktopWidth ? desktopWidth / viewportWidth : 1;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border bg-card font-mono shadow-sm",
        className,
      )}
      style={style}
    >
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2">
        <div className="flex shrink-0 gap-1.5">
          <span className="size-3 rounded-full bg-red-500/70" />
          <span className="size-3 rounded-full bg-yellow-500/70" />
          <span className="size-3 rounded-full bg-green-500/70" />
        </div>
        <span className="min-w-0 flex-1 truncate rounded bg-background/60 px-2 py-0.5 text-xs text-muted-foreground">
          {getDisplayUrl(project.url)}
        </span>
      </div>

      <div
        className="relative shrink-0 overflow-hidden bg-background"
        style={{ height }}
      >
        {desktopWidth ? (
          <iframe
            src={project.url}
            title={`${project.name} live preview`}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
            style={{
              width: viewportWidth,
              height: Math.max(viewportWidth * 1.2, height / scale + offsetY),
              transform: `scale(${scale}) translateY(-${offsetY}px)`,
            }}
          />
        ) : (
          <iframe
            src={project.url}
            title={`${project.name} live preview`}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none h-full w-full border-0"
          />
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="group absolute inset-0 flex items-end justify-end bg-transparent p-3 transition-colors hover:bg-background/10"
          aria-label={`Open ${project.name} in a new tab`}
        >
          <span className="flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Visit <ExternalLink className="size-3.5" />
          </span>
        </a>
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="text-base font-semibold text-foreground">
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full max-w-5xl mx-auto px-4 py-24 flex flex-col justify-center"
    >
      <Reveal>
        <p className="text-halo font-mono text-muted-foreground mb-6">
          <span className="text-primary">$</span> ls -la projects/
        </p>

        {/* Desktop / large screens: horizontal scroll. */}
        <div className="hidden gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none md:flex">
          {PROJECTS.map((project, index) => (
            <Reveal
              key={project.slug}
              direction="left"
              delay={index * 100}
              className="shrink-0 snap-start"
            >
              <ProjectFrame
                project={project}
                height={
                  project.size?.height ?? DEFAULT_PROJECT_PREVIEW_SIZE.height
                }
                desktopWidth={
                  project.size?.width ?? DEFAULT_PROJECT_PREVIEW_SIZE.width
                }
                style={{
                  width:
                    project.size?.width ?? DEFAULT_PROJECT_PREVIEW_SIZE.width,
                  maxWidth: "90vw",
                }}
              />
            </Reveal>
          ))}
        </div>

        {/* Small screens: vertical, collapsible list. */}
        <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1 scrollbar-none md:hidden">
          {PROJECTS.map((project, index) => (
            <Collapsible
              key={project.slug}
              defaultOpen={index === 0}
              className="rounded-lg border bg-card"
            >
              <CollapsibleTrigger className="group/trigger flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-mono text-sm text-foreground">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-primary">&gt;</span>
                  {project.name}
                </span>
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded/trigger:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up data-ending-style:h-0 data-starting-style:h-0">
                <div className="border-t px-3 pt-3 pb-3">
                  <ProjectFrame
                    project={project}
                    height={MOBILE_PROJECT_PREVIEW_HEIGHT}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

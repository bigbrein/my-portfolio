export type ProjectPreviewSize = {
  /** Desktop card width, in px. */
  width: number;
  /** Preview viewport height, in px (used on both desktop and mobile). */
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  url: string;
  /** Overrides the default preview card size for this project. */
  size?: ProjectPreviewSize;
  /**
   * Desktop preview only: width (in px) the embedded page is rendered at
   * before being scaled down to fit the card. Keeps the preview showing the
   * site's real desktop layout instead of its cramped mobile breakpoint.
   */
  previewViewportWidth?: number;
  /**
   * Desktop preview only: px to pan the rendered page up before scaling, so
   * the focal content (e.g. a profile photo below a nav bar) stays in frame
   * instead of getting cut off. Tune per-project once you've eyeballed it.
   */
  previewOffsetY?: number;
};

export const DEFAULT_PROJECT_PREVIEW_SIZE: ProjectPreviewSize = {
  width: 640,
  height: 400,
};

export const MOBILE_PROJECT_PREVIEW_HEIGHT = 220;

export const DEFAULT_PROJECT_PREVIEW_VIEWPORT_WIDTH = 1280;

// Add future projects here — card size can be tuned per-project via `size`,
// and the preview framing via `previewViewportWidth` / `previewOffsetY`.
export const PROJECTS: Project[] = [
  {
    slug: "portfolio",
    name: "HR Professional Portfolio",
    description:
      "A personal portfolio site built for a client in the HR industry, showcasing their profile and professional background.",
    url: "https://godswill-portfolio-three.vercel.app",
  },
];

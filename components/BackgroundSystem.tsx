/**
 * Fixed background depth layer for dark sections:
 * a faint grid, two vertical coordinate rules, and one slow-moving light.
 * Light sections paint over it and bring their own grid.
 */
export function BackgroundSystem() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />

      {/* Coordinate rules sit in the middle of each gutter */}
      <div
        className="absolute inset-y-0 w-px bg-line/60"
        style={{ left: "calc(var(--gutter) / 2)" }}
      />
      <div
        className="absolute inset-y-0 w-px bg-line/60"
        style={{ right: "calc(var(--gutter) / 2)" }}
      />

      {/* Moving light — transform-only animation */}
      <div
        className="absolute left-1/2 top-0 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.075] animate-drift will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 35%, rgba(255,255,255,0) 70%)",
        }}
      />
    </div>
  );
}

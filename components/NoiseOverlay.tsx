/** Fine film-grain texture over everything. Static, cheap, barely there. */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] bg-noise opacity-[0.05]"
    />
  );
}

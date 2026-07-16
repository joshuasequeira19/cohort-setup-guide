export function GlowBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute top-[28rem] right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-secondary/15 blur-[130px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--color-bg)_70%)]" />
    </div>
  )
}

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs uppercase tracking-widest text-(--text-secondary) mb-5 flex items-center gap-3">
    {children}
    <div className="h-px bg-zinc-300/80 dark:bg-white/10 flex-1" />
  </div>
);
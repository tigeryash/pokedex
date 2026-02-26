export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-5 flex items-center gap-3">
    {children}
    <div className="h-px bg-white/10 flex-1" />
  </div>
);
import { ReactNode } from 'react';

interface GlassOverlayProps {
  children: ReactNode;
}

export default function GlassOverlay({ children }: GlassOverlayProps) {
  return (
    <div className="glass-overlay rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 backdrop-blur-xl bg-white/70 max-h-[90vh] overflow-y-auto">
      {children}
    </div>
  );
}

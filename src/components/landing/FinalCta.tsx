import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Activity, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onOpenBuilder: () => void;
  onEnterApp: (tab?: string) => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenBuilder, onEnterApp }) => {
  return (
    <footer className="relative py-28 px-6 bg-black text-[#E1E0CC] border-t border-white/[0.08] overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DEDBC8]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#DEDBC8]/70 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#DEDBC8]" />
          <span>Feedback Intelligence System</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#E1E0CC] leading-tight mb-8">
          Ready to listen <span className="font-serif italic font-normal text-[#DEDBC8]">differently?</span>
        </h2>

        <p className="text-base sm:text-lg text-[#DEDBC8]/70 max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Transform raw feedback into actionable operational improvements. Launch your first adaptive survey in under 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onOpenBuilder}
            className="w-full sm:w-auto px-8 py-4 bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-medium text-sm tracking-wide rounded-full shadow-xl shadow-[#DEDBC8]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Create Your First Survey</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onEnterApp('overview')}
            className="w-full sm:w-auto px-7 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-[#E1E0CC] border border-white/[0.12] rounded-full text-sm font-mono tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-sm"
          >
            <Activity className="w-4 h-4 text-[#DEDBC8]" />
            <span>Launch Interactive Demo</span>
          </button>
        </div>

        {/* Footer Bottom info */}
        <div className="pt-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#DEDBC8]/50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#E1E0CC]">SENTIO</span>
            <span>— Rating & Feedback System Platform</span>
          </div>
          <div>© {new Date().getFullYear()} Sentio Systems. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

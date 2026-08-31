import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="inquiries"
      className="bg-black text-[#E1E0CC] border-t border-white/5 py-16 sm:py-20 px-6 sm:px-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Prisma Studio Collective
          </span>
          <p className="text-xl sm:text-2xl font-serif italic text-primary/90 max-w-md leading-relaxed">
            "Art is not what you see, but what you make others see."
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-2">
            <span>Berlin</span>
            <span>•</span>
            <span>Paris</span>
            <span>•</span>
            <span>Tokyo</span>
            <span>•</span>
            <span>Worldwide</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
          <div className="space-y-1">
            <span className="text-[11px] text-gray-500 uppercase tracking-wider block">
              Inquiries & Commissions
            </span>
            <a
              href="mailto:contact@prisma.studio"
              className="text-sm sm:text-base text-primary hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>contact@prisma.studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="text-xs text-primary/70 hover:text-primary px-4 py-2 rounded-full border border-white/10 hover:border-primary/40 transition-colors cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-600 gap-4">
        <span>© {new Date().getFullYear()} Prisma Creative Studio. All rights reserved.</span>
        <div className="flex gap-6">
          <span className="hover:text-gray-400 cursor-pointer">Privacy & Data</span>
          <span className="hover:text-gray-400 cursor-pointer">Terms of Collective</span>
        </div>
      </div>
    </footer>
  );
};

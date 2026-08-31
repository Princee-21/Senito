import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Sparkles, ShieldCheck, Activity, QrCode } from 'lucide-react';
import { BackgroundVideo } from '../BackgroundVideo';

interface LandingHeroProps {
  onOpenBuilder: () => void;
  onEnterApp: (tab?: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onOpenBuilder, onEnterApp }) => {
  const words = ['Feedback', 'should', 'lead', 'somewhere.'];

  return (
    <section
      id="overview"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-20 overflow-hidden bg-black selection:bg-[#DEDBC8] selection:text-black"
    >
      {/* Background Video with seamless requestAnimationFrame JavaScript fade engine */}
      <BackgroundVideo />

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 z-[1] noise-overlay opacity-[0.08] pointer-events-none" />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[2] bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-[#DEDBC8]/80 mb-8 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest uppercase text-[11px]">The Feedback → Action Loop</span>
        </motion.div>

        {/* Word-by-Word Pull-Up Headline */}
        <h1
          id="hero-headline"
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#E1E0CC] leading-[0.95] max-w-4xl mb-8 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 overflow-hidden"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-1">
              <motion.span
                className={`inline-block ${
                  word.includes('somewhere')
                    ? 'font-serif italic font-normal text-[#DEDBC8] opacity-95'
                    : 'text-[#E1E0CC]'
                }`}
                initial={{ y: '110%', opacity: 0, rotate: 2 }}
                animate={{ y: '0%', opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#DEDBC8]/70 max-w-2xl font-light leading-relaxed mb-10 text-balance"
        >
          Create engaging surveys, understand what people are saying, identify recurring problems, and measure whether your improvements actually worked.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-primary-cta"
            onClick={onOpenBuilder}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#DEDBC8] hover:bg-[#E8E5D5] text-black font-medium text-sm tracking-wide rounded-full shadow-lg shadow-[#DEDBC8]/15 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Create Your First Survey</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            id="hero-secondary-cta"
            onClick={() => onEnterApp('overview')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-[#E1E0CC] border border-white/[0.12] rounded-full text-sm font-mono tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-sm"
          >
            <Play className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span>Explore Demo</span>
          </button>
        </motion.div>

        {/* Mini stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-left w-full max-w-3xl"
        >
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#E1E0CC]">11+</div>
            <div className="text-xs text-[#DEDBC8]/50 uppercase font-mono tracking-wider mt-0.5">
              Question Types
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#E1E0CC]">100%</div>
            <div className="text-xs text-[#DEDBC8]/50 uppercase font-mono tracking-wider mt-0.5">
              Source of Truth
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">Issue Radar</div>
            <div className="text-xs text-[#DEDBC8]/50 uppercase font-mono tracking-wider mt-0.5">
              Auto Detection
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#DEDBC8]">+65%</div>
            <div className="text-xs text-[#DEDBC8]/50 uppercase font-mono tracking-wider mt-0.5">
              Proven Delta
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-[10px] font-mono tracking-widest uppercase">
        <span>Scroll to explore</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-[#DEDBC8]/40 to-transparent animate-bounce" />
      </div>
    </section>
  );
};

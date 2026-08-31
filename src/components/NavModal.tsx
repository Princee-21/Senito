import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Layers, Sparkles, ArrowRight } from 'lucide-react';

interface NavModalProps {
  type: 'features' | 'pricing' | 'about' | null;
  onClose: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const NavModal: React.FC<NavModalProps> = ({ type, onClose, onOpenAuth }) => {
  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl liquid-glass-modal rounded-3xl p-6 sm:p-8 z-10 text-white shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* FEATURES TAB */}
          {type === 'features' && (
            <div className="space-y-6">
              <div>
                <h3
                  className="text-3xl text-white tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Experience Features
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Engineered with optical clarity, zero-latency motion, and seamless fluid glass.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Liquid Glass Shader Architecture',
                    desc: 'Dual-masked refraction with hardware-accelerated luminosity blending.',
                  },
                  {
                    title: 'Cinematic Looping Video Engine',
                    desc: 'Microsecond requestAnimationFrame crossfade handling with zero layout shifts.',
                  },
                  {
                    title: 'Distraction-Free Focus Canvas',
                    desc: 'Typography-first spatial geometry with Instrument Serif typographic scale.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="liquid-glass rounded-2xl p-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-white/80" />
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs text-white/60 pl-6">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth('signup');
                  }}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* PRICING TAB */}
          {type === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h3
                  className="text-3xl text-white tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Transparent Membership
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Straightforward pricing for individuals and visionary teams.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="liquid-glass rounded-2xl p-5 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-white/60">Curious</span>
                    <div className="text-2xl font-bold text-white mt-1">Free</div>
                    <p className="text-xs text-white/60 mt-0.5">Forever exploration</p>
                  </div>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Full access to publications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Weekly curated briefings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Community discussions</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAuth('signup');
                    }}
                    className="w-full py-2 rounded-full liquid-glass text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Join Free
                  </button>
                </div>

                <div className="liquid-glass rounded-2xl p-5 space-y-4 relative border-white/20">
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-wider">
                    Popular
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-white/60">Fellowship</span>
                    <div className="text-2xl font-bold text-white mt-1">$12<span className="text-xs font-normal text-white/60"> / mo</span></div>
                    <p className="text-xs text-white/60 mt-0.5">For dedicated creators</p>
                  </div>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Early access to releases</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Exclusive research papers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Direct salon participation</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAuth('signup');
                    }}
                    className="w-full py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {type === 'about' && (
            <div className="space-y-5">
              <div>
                <h3
                  className="text-3xl text-white tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  About Asme
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  A collective dedicated to cultivating curiosity and modern intellectual depth.
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                <p>
                  Asme was founded with a singular conviction: that the world does not lack
                  information, but lacks environments designed for contemplative observation and
                  creative audacity.
                </p>
                <p>
                  We merge cinematic media, liquid glass design systems, and rigorous journalism to
                  bring you stories that provoke wonder and invite deeper inquiry.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Global Inquiries</div>
                  <div className="text-[11px] font-mono text-white/60">editorial@asme.world</div>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

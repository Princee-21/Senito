import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Compass, Eye, ShieldCheck, Heart } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl liquid-glass-modal rounded-3xl p-6 sm:p-10 z-10 text-white shadow-2xl max-h-[85vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close manifesto"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs text-white/80 font-mono">
                <Compass className="w-3.5 h-3.5" />
                <span>The Asme Manifesto</span>
              </div>
              <h2
                className="text-4xl sm:text-5xl text-white tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Built for the curious
              </h2>
            </div>

            {/* Manifesto Body */}
            <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed font-light">
              <p>
                We believe that the greatest breakthroughs happen when human curiosity is given
                unfettered space to observe, question, and explore without friction.
              </p>
              <p>
                In a world crowded with repetitive noise and digital clutter, Asme is crafted as a
                sanctuary of focus: transparent, luminous, and weightless. Like liquid glass, our
                interfaces adapt to your perspective, reflecting clarity and depth.
              </p>
              <blockquote className="border-l-2 border-white/40 pl-4 py-1 my-4 text-white italic font-serif text-lg">
                "Curiosity is not a fleeting impulse; it is the fundamental compass of human
                discovery."
              </blockquote>
              <p>
                Whether you are crafting the next frontier of thought, building resonant
                experiences, or navigating complex systems, we build tools that honor your depth.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="liquid-glass rounded-2xl p-4 space-y-1.5">
                <Eye className="w-5 h-5 text-white/80 mb-2" />
                <h4 className="text-sm font-semibold text-white">Pure Clarity</h4>
                <p className="text-xs text-white/60 leading-normal">
                  Minimalist interfaces that recede so your intent takes center stage.
                </p>
              </div>
              <div className="liquid-glass rounded-2xl p-4 space-y-1.5">
                <Sparkles className="w-5 h-5 text-white/80 mb-2" />
                <h4 className="text-sm font-semibold text-white">Liquid Craft</h4>
                <p className="text-xs text-white/60 leading-normal">
                  Dynamic aesthetics designed with optical and mathematical precision.
                </p>
              </div>
              <div className="liquid-glass rounded-2xl p-4 space-y-1.5">
                <Heart className="w-5 h-5 text-white/80 mb-2" />
                <h4 className="text-sm font-semibold text-white">Human Scale</h4>
                <p className="text-xs text-white/60 leading-normal">
                  Built for explorers, creators, and thinkers who refuse compromise.
                </p>
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-white/90 transition-all cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Disc } from 'lucide-react';
import { WordsPullUpMultiStyle, TextSegment } from './WordsPullUpMultiStyle';
import { ScrollRevealedParagraph } from './AnimatedLetter';
import { ThreePrismCanvas } from './ThreePrismCanvas';

const ABOUT_SEGMENTS: TextSegment[] = [
  {
    text: 'I am Marcus Chen,',
    className: 'font-normal text-[#E1E0CC]',
  },
  {
    text: 'a self-taught director.',
    className: 'italic font-serif text-[#E1E0CC] px-1',
  },
  {
    text: 'I have skills in color grading, visual effects, and narrative design.',
    className: 'font-normal text-[#E1E0CC]',
  },
];

const REVEAL_BODY_TEXT =
  'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.';

export const AboutSection: React.FC = () => {
  const [show3DInteractive, setShow3DInteractive] = useState(false);

  return (
    <section
      id="about"
      className="bg-black text-[#E1E0CC] py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 relative overflow-hidden"
    >
      {/* Inner Card */}
      <div
        id="about-card"
        className="bg-[#101010] max-w-6xl mx-auto rounded-3xl md:rounded-[2.5rem] p-8 sm:p-14 md:p-20 text-center relative border border-white/5 shadow-2xl overflow-hidden"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Optional 3D Light Lab overlay inside About card */}
        {show3DInteractive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-black/85 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center"
          >
            <div className="w-full h-80 max-w-xl">
              <ThreePrismCanvas interactive={true} />
            </div>
            <p className="text-primary text-xs tracking-wider uppercase mb-4">
              Prisma 3D Refraction Optics Lab — Drag to rotate
            </p>
            <button
              type="button"
              onClick={() => setShow3DInteractive(false)}
              className="text-xs px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-full transition-colors cursor-pointer"
            >
              Return to Story
            </button>
          </motion.div>
        )}

        {/* Top small label */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <motion.span
            id="about-label"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium"
          >
            Visual arts
          </motion.span>
        </div>

        {/* Main Heading with 3 Multi-Styled Segments */}
        <div className="max-w-3xl mx-auto my-4 sm:my-6">
          <WordsPullUpMultiStyle
            segments={ABOUT_SEGMENTS}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9] tracking-[-0.04em]"
            staggerDelay={0.08}
          />
        </div>

        {/* Body paragraph with scroll-linked character opacity animation */}
        <div className="max-w-2xl mx-auto mt-10 sm:mt-14 md:mt-16">
          <ScrollRevealedParagraph text={REVEAL_BODY_TEXT} />
        </div>

        {/* Interactive 3D Optics peek button */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setShow3DInteractive(true)}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-primary/70 hover:text-primary transition-colors py-2 px-4 rounded-full border border-primary/20 hover:border-primary/40 bg-[#151515] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Explore 3D Optical Dispersion</span>
          </button>
        </div>
      </div>
    </section>
  );
};

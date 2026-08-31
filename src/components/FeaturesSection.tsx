import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle, TextSegment } from './WordsPullUpMultiStyle';

const FEATURES_HEADER_LINE1: TextSegment[] = [
  {
    text: 'Studio-grade workflows for visionary creators.',
    className: 'text-[#E1E0CC]',
  },
];

const FEATURES_HEADER_LINE2: TextSegment[] = [
  {
    text: 'Built for pure vision. Powered by art.',
    className: 'text-gray-500',
  },
];

const CARD_1_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const CARD_2_ICON =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85';

const CARD_3_ICON =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85';

const CARD_4_ICON =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85';

interface FeatureItem {
  text: string;
}

interface FeatureCardData {
  id: string;
  number: string;
  title: string;
  icon: string;
  items: FeatureItem[];
}

const CARDS_DATA: FeatureCardData[] = [
  {
    id: 'feature-card-01',
    number: '01',
    title: 'Project Storyboard.',
    icon: CARD_2_ICON,
    items: [
      { text: 'Frame-by-frame visual sequencing & color scripts' },
      { text: 'Dynamic shot list grouping with lens tags' },
      { text: 'Scene pacing calculator & tempo meters' },
      { text: 'Instant export to DaVinci & Final Cut Pro' },
    ],
  },
  {
    id: 'feature-card-02',
    number: '02',
    title: 'Smart Critiques.',
    icon: CARD_3_ICON,
    items: [
      { text: 'Neural composition & color palette breakdown' },
      { text: 'Collaborative creative notes pinned to timeline' },
      { text: 'Direct sync with Premiere, After Effects & 3D apps' },
    ],
  },
  {
    id: 'feature-card-03',
    number: '03',
    title: 'Immersion Capsule.',
    icon: CARD_4_ICON,
    items: [
      { text: 'Studio distraction shield & notification silencing' },
      { text: 'Generative ambient soundscapes & light pacing' },
      { text: 'Real-time session schedule & production sprint sync' },
    ],
  },
];

export const FeaturesSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: '-100px' });

  return (
    <section
      id="features"
      className="min-h-screen bg-black relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 overflow-hidden"
    >
      {/* Subtle Fractal Noise Background */}
      <div
        id="features-bg-noise"
        className="bg-noise absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Title Lines */}
        <div id="features-header" className="text-center mb-16 sm:mb-20">
          <div className="mb-2">
            <WordsPullUpMultiStyle
              segments={FEATURES_HEADER_LINE1}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
            />
          </div>
          <div>
            <WordsPullUpMultiStyle
              segments={FEATURES_HEADER_LINE2}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
              staggerDelay={0.06}
            />
          </div>
        </div>

        {/* 4-column card grid (lg:h-[480px], gap-3 sm:gap-2 md:gap-1 or responsive) */}
        <div
          ref={gridRef}
          id="features-cards-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 md:gap-2 lg:gap-2.5 lg:h-[490px]"
        >
          {/* Card 1: Video Card */}
          <motion.div
            id="feature-card-video"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={
              isInView
                ? { scale: 1, opacity: 1 }
                : { scale: 0.95, opacity: 0 }
            }
            transition={{
              duration: 0.75,
              delay: 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#151515] h-[380px] sm:h-[420px] lg:h-full flex flex-col justify-end p-6 sm:p-7 border border-white/5 group shadow-xl"
          >
            {/* Background Video */}
            <video
              src={CARD_1_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 pointer-events-none" />

            {/* Bottom Content */}
            <div className="relative z-20">
              <span className="text-[10px] sm:text-xs text-primary/80 uppercase tracking-widest block mb-2 font-medium">
                Visual Engine
              </span>
              <h3
                className="text-lg sm:text-xl font-normal tracking-tight"
                style={{ color: '#E1E0CC' }}
              >
                Your creative canvas.
              </h3>
            </div>
          </motion.div>

          {/* Cards 2, 3, 4 */}
          {CARDS_DATA.map((card, idx) => {
            const delayTime = (idx + 1) * 0.15;

            return (
              <motion.div
                key={card.id}
                id={card.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={
                  isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.95, opacity: 0 }
                }
                transition={{
                  duration: 0.75,
                  delay: delayTime,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-7 lg:p-6 xl:p-7 flex flex-col justify-between h-[420px] sm:h-[440px] lg:h-full border border-white/5 shadow-xl hover:border-primary/20 transition-all duration-300 group"
              >
                <div>
                  {/* Top: Small Image Icon & Card Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-black/40 p-1.5 border border-white/10 flex items-center justify-center">
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="w-full h-full object-contain filter contrast-125"
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-500 tracking-wider">
                      ({card.number})
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3
                    className="text-lg sm:text-xl font-normal mb-5 tracking-tight"
                    style={{ color: '#E1E0CC' }}
                  >
                    {card.title}
                  </h3>

                  {/* Checklist Items */}
                  <ul className="space-y-3 sm:space-y-3.5">
                    {card.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm"
                      >
                        <span className="mt-0.5 shrink-0">
                          <Check className="w-4 h-4 text-primary stroke-[2.5]" />
                        </span>
                        <span className="text-gray-400 font-normal leading-snug">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom "Learn more" Link with rotated arrow (-45deg) */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <a
                    href="#inquiries"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-white transition-colors duration-200 group/link"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 -rotate-45 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-primary" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

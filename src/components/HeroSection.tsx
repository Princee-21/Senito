import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { WordsPullUp } from './WordsPullUp';
import { ThreePrismCanvas } from './ThreePrismCanvas';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

interface HeroSectionProps {
  onJoinLabClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onJoinLabClick }) => {
  return (
    <section
      id="hero-section"
      className="h-screen w-full p-4 md:p-6 bg-black relative flex flex-col box-border"
    >
      <div
        id="hero-container"
        className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#0c0c0c] flex flex-col justify-between"
      >
        {/* Background Video */}
        <video
          id="hero-bg-video"
          src={HERO_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-[1.02]"
        />

        {/* Ambient 3D Three.js Optical Ray Overlay */}
        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
          <ThreePrismCanvas interactive={false} />
        </div>

        {/* Noise overlay */}
        <div
          id="hero-noise-overlay"
          className="noise-overlay absolute inset-0 w-full h-full opacity-[0.7] mix-blend-overlay pointer-events-none z-10"
        />

        {/* Gradient overlay */}
        <div
          id="hero-gradient-overlay"
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none z-10"
        />

        {/* Hanging Pill Navbar */}
        <Navbar />

        {/* Hero Content (bottom-aligned) */}
        <div
          id="hero-content"
          className="absolute bottom-0 left-0 right-0 z-20 px-6 sm:px-8 md:px-12 lg:px-14 pb-8 sm:pb-10 md:pb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left 8 columns: Giant heading "Prisma" */}
            <div className="lg:col-span-8 flex items-baseline">
              <WordsPullUp
                text="Prisma"
                showAsterisk={true}
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] select-none"
                style={{ color: '#E1E0CC' }}
              />
            </div>

            {/* Right 4 columns: Description paragraph + CTA Button */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-start space-y-5 sm:space-y-6 pb-2 sm:pb-4 lg:pb-6">
              {/* Description Paragraph */}
              <motion.p
                id="hero-description"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] max-w-md font-normal"
              >
                Prisma is a worldwide network of visual artists, filmmakers and
                storytellers bound not by place, status or labels but by passion
                and hunger to unlock potential through our unique perspectives.
              </motion.p>

              {/* CTA Button "Join the lab" */}
              <motion.button
                id="hero-cta-button"
                type="button"
                onClick={onJoinLabClick}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group inline-flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-5 sm:pl-6 pr-2 sm:pr-2.5 py-1.5 sm:py-2 text-black font-medium text-sm sm:text-base transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span className="tracking-tight select-none">Join the lab</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-200"
                  />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedLetterProps {
  character: string;
  index: number;
  totalChars: number;
  progress: MotionValue<number>;
}

export const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  character,
  index,
  totalChars,
  progress,
}) => {
  const charProgress = totalChars > 0 ? index / totalChars : 0;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  // If start and end happen to be identical or invalid, ensure standard spread
  const safeEnd = end <= start ? start + 0.01 : end;

  const opacity = useTransform(progress, [start, safeEnd], [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block transition-opacity duration-75"
    >
      {character === ' ' ? '\u00A0' : character}
    </motion.span>
  );
};

interface ScrollRevealedParagraphProps {
  text: string;
  className?: string;
}

export const ScrollRevealedParagraph: React.FC<ScrollRevealedParagraphProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = Array.from(text);

  return (
    <p
      ref={containerRef}
      id="about-scroll-revealed-paragraph"
      className={`text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed tracking-normal ${className}`}
    >
      {characters.map((char, index) => (
        <AnimatedLetter
          key={index}
          character={char}
          index={index}
          totalChars={characters.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
};

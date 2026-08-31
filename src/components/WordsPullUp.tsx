import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  text,
  className = '',
  showAsterisk = false,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ');

  return (
    <div
      ref={ref}
      id="words-pull-up-container"
      className={`inline-flex flex-wrap items-baseline ${className}`}
      style={style}
    >
      {words.map((word, wordIndex) => {
        const isLastWord = wordIndex === words.length - 1;

        return (
          <span
            key={wordIndex}
            className="inline-block overflow-hidden mr-[0.2em] last:mr-0 relative"
          >
            <motion.span
              className="inline-block relative"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: wordIndex * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {showAsterisk && isLastWord && (
                <span
                  id="prisma-hero-asterisk"
                  className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] select-none pointer-events-none font-normal leading-none"
                  style={{ color: '#E1E0CC' }}
                >
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
};

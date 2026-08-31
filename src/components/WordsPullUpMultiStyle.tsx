import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TextSegment {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
  containerClassName?: string;
  staggerDelay?: number;
  initialY?: number | string;
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({
  segments,
  className = '',
  containerClassName = 'inline-flex flex-wrap justify-center items-baseline text-center',
  staggerDelay = 0.08,
  initialY = 20,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Flatten segments into a list of word tokens with their respective styling
  let globalWordIndex = 0;
  const wordTokens: Array<{
    word: string;
    className?: string;
    style?: React.CSSProperties;
    index: number;
    hasTrailingSpace: boolean;
  }> = [];

  segments.forEach((seg, segIdx) => {
    const rawWords = seg.text.trim().split(/\s+/);
    rawWords.forEach((w, wIdx) => {
      if (w.length > 0) {
        wordTokens.push({
          word: w,
          className: seg.className,
          style: seg.style,
          index: globalWordIndex++,
          hasTrailingSpace:
            wIdx < rawWords.length - 1 || segIdx < segments.length - 1,
        });
      }
    });
  });

  return (
    <div
      ref={ref}
      id="words-pull-up-multi-style-root"
      className={`${containerClassName} ${className}`}
    >
      {wordTokens.map((token) => (
        <span
          key={token.index}
          className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-baseline"
        >
          <motion.span
            className={`inline-block ${token.className || ''}`}
            style={token.style}
            initial={{ y: initialY, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: initialY, opacity: 0 }}
            transition={{
              duration: 0.85,
              delay: token.index * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {token.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Our story', href: '#about' },
  { label: 'Collective', href: '#features' },
  { label: 'Workshops', href: '#features' },
  { label: 'Programs', href: '#features' },
  { label: 'Inquiries', href: '#inquiries' },
];

export const Navbar: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      id="prisma-navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-1/2 -translate-x-1/2 z-30"
    >
      <nav
        id="prisma-navbar-pill"
        className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 shadow-2xl border-b border-x border-white/5"
      >
        {NAV_ITEMS.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <a
              key={item.label}
              id={`nav-link-${idx}`}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="text-[10px] sm:text-xs md:text-sm font-normal tracking-wide transition-all duration-200 relative py-1 whitespace-nowrap cursor-pointer"
              style={{
                color: isHovered ? '#E1E0CC' : 'rgba(225, 224, 204, 0.8)',
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </motion.header>
  );
};

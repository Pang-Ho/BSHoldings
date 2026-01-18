'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}

export function HoverCard({
  children,
  className = '',
  hoverScale = 1.02,
  hoverY = -4,
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      {children}
    </motion.div>
  );
}

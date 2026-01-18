'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementsProps {
  children: ReactNode;
  className?: string;
}

export function FloatingElements({
  children,
  className = '',
}: FloatingElementsProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 배경 플로팅 요소들 */}
      <motion.div
        className="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -top-2 -right-6 w-6 h-6 bg-blue-300 rounded-full opacity-30"
        animate={{
          y: [0, -15, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute -bottom-3 -left-2 w-4 h-4 bg-blue-400 rounded-full opacity-25"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      {children}
    </div>
  );
}

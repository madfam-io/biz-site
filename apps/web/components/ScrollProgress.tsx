"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sun to-lavender transform-origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// Circular progress indicator
export function CircularScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="fixed bottom-8 right-8 w-12 h-12 z-50">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="20"
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="4"
          fill="none"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          className="stroke-sun"
          strokeWidth="4"
          fill="none"
          style={{
            pathLength: progress,
            strokeDasharray: '1 1',
          }}
        />
      </svg>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute inset-0 flex items-center justify-center text-xs font-medium"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ scale: progress }}
        >
          ↑
        </motion.span>
      </button>
    </div>
  );
}
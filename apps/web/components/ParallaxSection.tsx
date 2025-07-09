"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxSection({ 
  children, 
  offset = 50,
  className = '' 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Background parallax with different layers
interface ParallaxBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxBackground({ children, className = '' }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/path-to-your-image.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: backgroundY,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{ y: textY }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Reveal on scroll with parallax
interface ParallaxRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export function ParallaxReveal({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0
}: ParallaxRevealProps) {
  const directionOffset = {
    up: { y: 100, x: 0 },
    down: { y: -100, x: 0 },
    left: { x: 100, y: 0 },
    right: { x: -100, y: 0 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...directionOffset[direction]
      }}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
"use client";

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: 'fadeUp' | 'fadeIn' | 'slideIn' | 'typewriter';
  once?: boolean;
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  typewriter: {
    hidden: { width: 0 },
    visible: { width: '100%' },
  },
};

export function AnimatedText({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  variant = 'fadeUp',
  once = true,
}: AnimatedTextProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Word-by-word animation
interface AnimatedWordsProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function AnimatedWords({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.05,
}: AnimatedWordsProps) {
  const words = text.split(' ');

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: delay + index * staggerDelay,
            ease: 'easeOut',
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Letter-by-letter animation
interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function AnimatedLetters({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
}: AnimatedLettersProps) {
  const letters = text.split('');

  return (
    <motion.div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: delay + index * staggerDelay,
            ease: [0.16, 1, 0.3, 1], // Custom easing
          }}
          className="inline-block"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
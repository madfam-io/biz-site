"use client";

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        const startTime = Date.now();
        
        const timer = setInterval(() => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / (duration * 1000), 1);
          
          if (progress === 1) {
            clearInterval(timer);
            setCount(to);
          } else {
            setCount(from + (to - from) * progress);
          }
        }, 16);

        return () => clearInterval(timer);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [isInView, from, to, duration, delay]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {displayValue}
      </motion.span>
      {suffix}
    </span>
  );
}

// Counter group for displaying multiple stats
interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

interface AnimatedStatsProps {
  stats: Stat[];
  className?: string;
  delay?: number;
}

export function AnimatedStats({ stats, className = '', delay = 0 }: AnimatedStatsProps) {
  return (
    <div className={className}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: 'easeOut',
          }}
          className="text-center"
        >
          <div className="text-4xl font-heading font-bold text-sun mb-2">
            <AnimatedCounter
              to={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              decimals={stat.decimals}
              delay={delay + index * 0.1}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
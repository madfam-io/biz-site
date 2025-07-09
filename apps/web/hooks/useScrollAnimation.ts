import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.1, once = true } = options;
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    isInView,
    hasAnimated: once ? hasAnimated : isInView,
  };
}

// Hook for progressive reveal of list items
export function useStaggeredReveal<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  staggerDelay: number = 0.1
) {
  const containerRef = useRef<T>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isInView) {
      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * staggerDelay * 1000);
        
        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
    return undefined;
  }, [isInView, itemCount, staggerDelay]);

  return {
    containerRef,
    visibleItems,
    isItemVisible: (index: number) => visibleItems.includes(index),
  };
}

// Hook for scroll progress
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(scrollProgress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
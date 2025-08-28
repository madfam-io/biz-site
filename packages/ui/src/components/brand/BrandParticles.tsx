'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useBrandTheme, useResponsiveTheme } from '../../themes/brand-bridge';
import { brandColors } from '../../themes/brand-colors';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  pulse: number;
}

interface BrandParticlesProps {
  density?: 'low' | 'medium' | 'high';
  colorScheme?: 'brand' | 'solar' | 'corporate' | 'auto';
  movement?: 'gentle' | 'dynamic' | 'static';
  interactive?: boolean;
  className?: string;
}

export const BrandParticles: React.FC<BrandParticlesProps> = ({
  density = 'low',
  colorScheme = 'auto',
  movement = 'gentle',
  interactive = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { brandMode, colorMode } = useBrandTheme();
  const responsiveConfig = useResponsiveTheme();

  // Determine if particles should be shown based on theme
  const shouldRender = responsiveConfig.particles !== false;
  const isSubtle = responsiveConfig.particles === 'subtle';

  // Particle count based on density
  const particleCount = useMemo(() => {
    if (!shouldRender) return 0;

    const base = {
      low: 20,
      medium: 40,
      high: 60,
    }[density];

    return isSubtle ? base * 0.5 : base;
  }, [density, shouldRender, isSubtle]);

  // Color palette based on scheme and theme
  const colors = useMemo(() => {
    let palette: string[] = [];

    const scheme =
      colorScheme === 'auto'
        ? brandMode === 'solarpunk-legacy'
          ? 'solar'
          : brandMode === 'corporate-evolution'
            ? 'corporate'
            : 'brand'
        : colorScheme;

    switch (scheme) {
      case 'solar':
        palette = [
          brandColors.solarpunk.solarOrange,
          brandColors.solarpunk.leafGreen,
          brandColors.solarpunk.skyBlue,
          brandColors.primary.yellow,
        ];
        break;
      case 'corporate':
        palette = [
          brandColors.corporate.deepBlue,
          brandColors.corporate.slate,
          brandColors.primary.purple,
          brandColors.corporate.steel,
        ];
        break;
      case 'brand':
      default:
        palette = [
          brandColors.primary.green,
          brandColors.primary.purple,
          brandColors.primary.yellow,
        ];
    }

    // Adjust for dark mode
    if (colorMode === 'dark') {
      palette = palette.map(color => color + '88'); // Add transparency
    }

    return palette;
  }, [colorScheme, brandMode, colorMode]);

  // Movement speed based on setting
  const speed = useMemo(() => {
    const base = {
      gentle: 0.2,
      dynamic: 0.8,
      static: 0,
    }[movement];

    return isSubtle ? base * 0.5 : base;
  }, [movement, isSubtle]);

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)] || '#2c8136',
        opacity: isSubtle ? 0.3 : 0.6,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Update position
      if (movement !== 'static') {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Interactive repulsion from mouse
        if (interactive) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.5;
            particle.vy += (dy / distance) * force * 0.5;

            // Limit velocity
            particle.vx = Math.max(-2, Math.min(2, particle.vx));
            particle.vy = Math.max(-2, Math.min(2, particle.vy));
          } else {
            // Gradually return to original velocity
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.vx += (Math.random() - 0.5) * speed * 0.02;
            particle.vy += (Math.random() - 0.5) * speed * 0.02;
          }
        }
      }

      // Pulse effect
      particle.pulse += 0.02;
      const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, pulseOpacity));
      ctx.fill();

      // Draw connections (only in non-subtle mode)
      if (!isSubtle && particlesRef.current.length < 30) {
        particlesRef.current.forEach(other => {
          if (other === particle) return;

          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 150) * 0.1;
            ctx.stroke();
          }
        });
      }
    });

    ctx.globalAlpha = 1;
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Reinitialize particles on resize
    initParticles();
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.current || !interactive) return;

    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Setup and cleanup
  useEffect(() => {
    if (!shouldRender) return;

    handleResize();
    window.addEventListener('resize', handleResize);

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldRender, particleCount, colors, speed, interactive, isSubtle]);

  if (!shouldRender) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity: isSubtle ? 0.3 : 0.6,
        mixBlendMode: colorMode === 'dark' ? 'screen' : 'multiply',
      }}
      aria-hidden="true"
    />
  );
};

// Simplified static version for performance-critical areas
export const StaticBrandPattern: React.FC<{ className?: string }> = ({ className }) => {
  const { brandMode, colorMode } = useBrandTheme();

  const patternColor =
    brandMode === 'solarpunk-legacy'
      ? brandColors.primary.green
      : brandMode === 'corporate-evolution'
        ? brandColors.primary.purple
        : brandColors.primary.yellow;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(${patternColor}20 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        opacity: colorMode === 'dark' ? 0.1 : 0.05,
      }}
      aria-hidden="true"
    />
  );
};

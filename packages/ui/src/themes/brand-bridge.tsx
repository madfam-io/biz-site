'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { brandColors, generateCSSVariables } from './brand-colors';

export type BrandMode = 'solarpunk-legacy' | 'corporate-evolution' | 'hybrid-harmony';
export type ColorMode = 'light' | 'dark';

interface ThemeConfig {
  particles: boolean | 'subtle';
  gradients: 'vibrant' | 'subtle' | 'balanced';
  animations: 'playful' | 'refined' | 'purposeful';
  layout: 'organic' | 'structured' | 'flexible';
  colorIntensity: number; // 0-100
  geometricAccents: boolean;
}

const themeModes: Record<BrandMode, ThemeConfig> = {
  'solarpunk-legacy': {
    particles: true,
    gradients: 'vibrant',
    animations: 'playful',
    layout: 'organic',
    colorIntensity: 90,
    geometricAccents: false,
  },
  'corporate-evolution': {
    particles: false,
    gradients: 'subtle',
    animations: 'refined',
    layout: 'structured',
    colorIntensity: 60,
    geometricAccents: true,
  },
  'hybrid-harmony': {
    particles: 'subtle',
    gradients: 'balanced',
    animations: 'purposeful',
    layout: 'flexible',
    colorIntensity: 75,
    geometricAccents: true,
  },
};

interface BrandThemeContextType {
  brandMode: BrandMode;
  colorMode: ColorMode;
  config: ThemeConfig;
  setBrandMode: (mode: BrandMode) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  cycleBrandMode: () => void;
}

const BrandThemeContext = createContext<BrandThemeContextType | undefined>(undefined);

export const useBrandTheme = () => {
  const context = useContext(BrandThemeContext);
  if (!context) {
    throw new Error('useBrandTheme must be used within a BrandThemeProvider');
  }
  return context;
};

interface BrandThemeProviderProps {
  children: React.ReactNode;
  defaultBrandMode?: BrandMode;
  defaultColorMode?: ColorMode;
  storageKey?: string;
}

export const BrandThemeProvider: React.FC<BrandThemeProviderProps> = ({
  children,
  defaultBrandMode = 'hybrid-harmony',
  defaultColorMode = 'light',
  storageKey = 'madfam-theme',
}) => {
  const [brandMode, setBrandModeState] = useState<BrandMode>(defaultBrandMode);
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      try {
        const { brand, color } = JSON.parse(savedTheme);
        if (brand) setBrandModeState(brand);
        if (color) setColorModeState(color);
      } catch (e) {
        console.error('Failed to parse saved theme', e);
      }
    }
  }, [storageKey]);

  // Apply theme changes
  useEffect(() => {
    // Apply color mode
    document.documentElement.classList.toggle('dark', colorMode === 'dark');

    // Apply brand mode as data attribute
    document.documentElement.setAttribute('data-brand-mode', brandMode);

    // Inject CSS variables
    const styleEl = document.getElementById('brand-theme-vars') || document.createElement('style');
    styleEl.id = 'brand-theme-vars';
    styleEl.innerHTML = generateCSSVariables(colorMode);
    if (!document.getElementById('brand-theme-vars')) {
      document.head.appendChild(styleEl);
    }

    // Apply theme config classes
    const config = themeModes[brandMode];
    document.documentElement.setAttribute('data-particles', String(config.particles));
    document.documentElement.setAttribute('data-gradients', config.gradients);
    document.documentElement.setAttribute('data-animations', config.animations);
    document.documentElement.setAttribute('data-layout', config.layout);

    // Save to localStorage
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        brand: brandMode,
        color: colorMode,
      })
    );
  }, [brandMode, colorMode, storageKey]);

  const setBrandMode = (mode: BrandMode) => {
    setBrandModeState(mode);
  };

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
  };

  const toggleColorMode = () => {
    setColorModeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const cycleBrandMode = () => {
    const modes: BrandMode[] = ['solarpunk-legacy', 'hybrid-harmony', 'corporate-evolution'];
    const currentIndex = modes.indexOf(brandMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setBrandModeState(modes[nextIndex]);
  };

  return (
    <BrandThemeContext.Provider
      value={{
        brandMode,
        colorMode,
        config: themeModes[brandMode],
        setBrandMode,
        setColorMode,
        toggleColorMode,
        cycleBrandMode,
      }}
    >
      {children}
    </BrandThemeContext.Provider>
  );
};

// Theme Mode Selector Component
export const ThemeModeSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { brandMode, colorMode, cycleBrandMode, toggleColorMode } = useBrandTheme();

  const modeIcons = {
    'solarpunk-legacy': '🌱',
    'corporate-evolution': '💼',
    'hybrid-harmony': '⚡',
  };

  const modeLabels = {
    'solarpunk-legacy': 'Solarpunk',
    'corporate-evolution': 'Corporate',
    'hybrid-harmony': 'Hybrid',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Brand Mode Selector */}
      <button
        onClick={cycleBrandMode}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface hover:bg-opacity-80 transition-all"
        aria-label={`Switch to ${modeLabels[brandMode]} mode`}
      >
        <span className="text-lg">{modeIcons[brandMode]}</span>
        <span className="text-sm font-medium hidden sm:inline">{modeLabels[brandMode]}</span>
      </button>

      {/* Color Mode Toggle */}
      <button
        onClick={toggleColorMode}
        className="p-2 rounded-lg bg-surface hover:bg-opacity-80 transition-all"
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      >
        {colorMode === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

// Hook for responsive theme adjustments
export const useResponsiveTheme = () => {
  const { config } = useBrandTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust config for mobile
  const responsiveConfig = {
    ...config,
    particles: isMobile ? false : config.particles,
    animations: isMobile ? 'refined' : config.animations,
    colorIntensity: isMobile ? config.colorIntensity * 0.8 : config.colorIntensity,
  };

  return responsiveConfig;
};

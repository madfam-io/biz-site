'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@madfam/ui/lib/utils';
import { LogoSystem, AnimatedLogo } from '@madfam/ui/components/brand/LogoSystem';
import { ThemeModeSelector } from '@madfam/ui/themes/brand-bridge';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DarkModeToggle } from './DarkModeToggle';

interface NavItem {
  href: string;
  label: string;
  highlight?: boolean;
}

export const BrandNavbar: React.FC = () => {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSize, setLogoSize] = useState<'lg' | 'md' | 'sm'>('lg');

  // Navigation items with brand-aware styling
  const navItems: NavItem[] = [
    { href: '/programs', label: t('programs'), highlight: true },
    { href: '/products', label: t('products') },
    { href: '/arms', label: t('arms') },
    { href: '/work', label: t('work') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact'), highlight: true },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Dynamic logo sizing based on scroll
      if (scrollY > 150) {
        setLogoSize('sm');
      } else if (scrollY > 50) {
        setLogoSize('md');
      } else {
        setLogoSize('lg');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-background/80 backdrop-blur-lg border-b shadow-lg' : 'bg-transparent',
          'data-[brand-mode="solarpunk-legacy"]:bg-gradient-to-r',
          'data-[brand-mode="solarpunk-legacy"]:from-transparent',
          'data-[brand-mode="solarpunk-legacy"]:to-transparent',
          'data-[brand-mode="corporate-evolution"]:bg-background/95'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with strategic animation */}
            <Link
              href="/"
              className="flex items-center gap-3 group relative"
              aria-label="MADFAM Home"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-green via-brand-purple to-brand-yellow opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-full" />

              {/* Animated logo for hero sections */}
              {!isScrolled ? (
                <AnimatedLogo
                  size={logoSize}
                  colorMode="color"
                  className="transition-all duration-500 transform group-hover:scale-105"
                />
              ) : (
                <LogoSystem
                  variant="full"
                  size={logoSize}
                  colorMode="color"
                  animated
                  className="transition-all duration-300"
                />
              )}

              {/* Brand tagline (hidden on mobile) */}
              {!isScrolled && (
                <span className="hidden lg:block text-sm font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t('tagline', 'Where AI meets human creativity')}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Main Navigation Links */}
              <div className="flex items-center gap-6">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative py-2 text-sm font-medium transition-all duration-200',
                      'hover:text-brand-purple',
                      isActive(item.href) ? 'text-brand-purple' : 'text-foreground/80',
                      item.highlight && 'text-brand-green hover:text-brand-green-dark'
                    )}
                  >
                    {item.label}

                    {/* Active indicator with brand colors */}
                    {isActive(item.href) && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-green via-brand-purple to-brand-yellow rounded-full" />
                    )}

                    {/* Hover effect */}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300',
                        'bg-gradient-to-r from-brand-purple to-brand-yellow',
                        'scale-x-0 hover:scale-x-100',
                        isActive(item.href) && 'hidden'
                      )}
                    />
                  </Link>
                ))}
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-4">
                {/* Theme Mode Selector */}
                <ThemeModeSelector className="hidden xl:flex" />

                {/* Language Switcher */}
                <LanguageSwitcher />

                {/* Dark Mode Toggle */}
                <DarkModeToggle />

                {/* CTA Button with brand styling */}
                <Link
                  href="/assessment"
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium text-sm',
                    'bg-gradient-to-r from-brand-green to-brand-purple',
                    'text-white hover:shadow-lg transform hover:scale-105',
                    'transition-all duration-300',
                    'relative overflow-hidden group'
                  )}
                >
                  <span className="relative z-10">{t('assessment')}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
          )}
        >
          <div className="px-4 pt-2 pb-6 space-y-3 bg-background/95 backdrop-blur-lg border-t">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                  'hover:bg-surface',
                  isActive(item.href) ? 'text-brand-purple bg-surface' : 'text-foreground/80',
                  item.highlight && 'text-brand-green'
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <Link
              href="/assessment"
              className={cn(
                'block w-full px-4 py-3 mt-4 rounded-lg font-medium text-center',
                'bg-gradient-to-r from-brand-green to-brand-purple',
                'text-white hover:shadow-lg',
                'transition-all duration-300'
              )}
            >
              {t('assessment')}
            </Link>

            {/* Mobile theme controls */}
            <div className="flex items-center justify-between pt-4 border-t">
              <ThemeModeSelector />
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

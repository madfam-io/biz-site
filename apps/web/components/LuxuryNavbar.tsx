'use client';

import { getLocalizedUrl, type Locale } from '@madfam/i18n';
import { cn } from '@madfam/ui';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useCallback, useRef } from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavItem {
  name: string;
  href?: string;
  highlight?: boolean;
  dropdown?: DropdownSection[];
}

interface DropdownSection {
  title: string;
  items: {
    name: string;
    href: string;
    description?: string;
    icon?: string;
  }[];
}

export function LuxuryNavbar() {
  const t = useTranslations('common.nav');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;

  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState(1);

  // Refs
  const lastScrollY = useRef(0);
  const dropdownTimeout = useRef<NodeJS.Timeout>();

  // Scroll handling with hide/show behavior
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => {
    const currentScrollY = latest;

    // Handle scroll direction for hide/show
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    // Handle scroll state
    setIsScrolled(currentScrollY > 20);

    // Dynamic logo scaling
    if (currentScrollY > 150) {
      setLogoScale(0.75);
    } else if (currentScrollY > 50) {
      setLogoScale(0.85);
    } else {
      setLogoScale(1);
    }

    lastScrollY.current = currentScrollY;
  });

  // Navigation structure with intelligent grouping
  const navigation: NavItem[] = [
    {
      name: t('programs') || 'Programas',
      href: getLocalizedUrl('programs', locale),
      highlight: true,
    },
    {
      name: t('products') || 'Productos',
      href: getLocalizedUrl('products', locale),
    },
    {
      name: t('solutions') || 'Soluciones',
      dropdown: [
        {
          title: t('businessArms') || 'Unidades de Negocio',
          items: [
            {
              name: 'Aureo Labs',
              href: getLocalizedUrl('arms', locale),
              description: t('aureoLabsDesc') || 'Laboratorio de innovación digital',
              icon: '🚀',
            },
            {
              name: t('comingSoon') || 'Próximamente',
              href: '#',
              description: t('moreArmsDesc') || 'Más unidades en desarrollo',
              icon: '✨',
            },
          ],
        },
        {
          title: t('caseStudies') || 'Casos de Éxito',
          items: [
            {
              name: t('featuredWork') || 'Trabajo Destacado',
              href: getLocalizedUrl('work', locale),
              icon: '💼',
            },
            {
              name: t('allCases') || 'Ver Todos',
              href: getLocalizedUrl('work', locale),
              icon: '📊',
            },
          ],
        },
        {
          title: t('securityCompliance') || 'Seguridad',
          items: [
            {
              name: t('enterpriseSecurity') || 'Seguridad Empresarial',
              href: getLocalizedUrl('security', locale),
              icon: '🔐',
            },
            {
              name: t('certifications') || 'Certificaciones',
              href: getLocalizedUrl('security', locale),
              icon: '✅',
            },
          ],
        },
      ],
    },
  ];

  // Dropdown handlers with improved UX
  const handleDropdownEnter = useCallback((name: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setActiveDropdown(name);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay for better UX
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [locale]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-pearl/85 dark:bg-obsidian/85 backdrop-blur-xl border-b border-obsidian/8 dark:border-pearl/8 shadow-lg'
            : 'bg-transparent'
        )}
      >
        {/* Progress Indicator */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sun via-lavender to-leaf transform origin-left scale-x-0 transition-transform duration-300" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section with Premium Animation */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group relative z-10">
              {/* Glow Effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-sun/20 via-lavender/20 to-leaf/20 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

              {/* Logo with Dynamic Scaling */}
              <motion.div
                className="relative"
                animate={{ scale: logoScale }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <Image
                  src="/assets/brand/madfam-logo.svg"
                  alt="MADFAM"
                  width={48}
                  height={48}
                  priority
                  className="w-12 h-12 transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>

              {/* Brand Name */}
              <motion.span
                className="font-heading text-2xl font-bold bg-gradient-to-r from-obsidian to-obsidian/80 dark:from-pearl dark:to-pearl/80 bg-clip-text text-transparent"
                animate={{ opacity: logoScale < 0.85 ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                MADFAM
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Primary Navigation */}
              <div className="flex items-center gap-8">
                {navigation.map(item => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          'relative py-2 text-[15px] font-medium transition-all duration-300',
                          'text-obsidian/70 dark:text-pearl/70 hover:text-obsidian dark:hover:text-pearl',
                          item.highlight && 'text-lavender dark:text-sun font-semibold'
                        )}
                      >
                        {item.name}

                        {/* Underline Animation */}
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-sun to-lavender transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    ) : (
                      <button
                        className={cn(
                          'relative py-2 text-[15px] font-medium transition-all duration-300 flex items-center gap-1',
                          'text-obsidian/70 dark:text-pearl/70 hover:text-obsidian dark:hover:text-pearl'
                        )}
                      >
                        {item.name}
                        <svg
                          className="w-4 h-4 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}

                    {/* Mega Dropdown */}
                    <AnimatePresence>
                      {item.dropdown && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute top-full left-0 mt-2 w-[600px] bg-white dark:bg-obsidian rounded-2xl shadow-2xl border border-obsidian/5 dark:border-pearl/5 overflow-hidden"
                        >
                          <div className="grid grid-cols-3 gap-0">
                            {item.dropdown.map((section, idx) => (
                              <div
                                key={section.title}
                                className={cn(
                                  'p-6',
                                  idx !== (item.dropdown?.length ?? 0) - 1 &&
                                    'border-r border-obsidian/5 dark:border-pearl/5'
                                )}
                              >
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-obsidian/40 dark:text-pearl/40 mb-3">
                                  {section.title}
                                </h3>
                                <div className="space-y-2">
                                  {section.items.map((subItem, itemIdx) => (
                                    <motion.div
                                      key={subItem.name}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: itemIdx * 0.05 }}
                                    >
                                      <Link
                                        href={subItem.href}
                                        className="group flex items-start gap-3 p-2 rounded-lg hover:bg-obsidian/5 dark:hover:bg-pearl/5 transition-colors"
                                      >
                                        {subItem.icon && (
                                          <span className="text-lg mt-0.5">{subItem.icon}</span>
                                        )}
                                        <div className="flex-1">
                                          <div className="text-sm font-medium text-obsidian dark:text-pearl group-hover:text-lavender dark:group-hover:text-sun transition-colors">
                                            {subItem.name}
                                          </div>
                                          {subItem.description && (
                                            <div className="text-xs text-obsidian/60 dark:text-pearl/60 mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {/* AI Assessment Badge */}
                <Link
                  href={`/${locale}/assessment`}
                  className="relative px-3 py-1.5 text-sm font-medium text-obsidian/70 dark:text-pearl/70 hover:text-obsidian dark:hover:text-pearl transition-colors"
                >
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-sun rounded-full animate-pulse" />
                  {tCommon('aiAssessment')}
                </Link>

                {/* Divider */}
                <div className="w-px h-6 bg-obsidian/10 dark:bg-pearl/10" />

                {/* Language Switcher */}
                <LanguageSwitcher />

                {/* Theme Toggle */}
                <DarkModeToggle />

                {/* Premium CTA Button */}
                <Link
                  href={getLocalizedUrl('contact', locale)}
                  className={cn(
                    'relative px-6 py-2.5 rounded-full font-medium text-sm overflow-hidden group',
                    'bg-gradient-to-r from-lavender to-sun text-white',
                    'hover:shadow-xl transition-all duration-300 transform hover:scale-105'
                  )}
                >
                  <span className="relative z-10">{t('contact') || 'Contacto'}</span>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-obsidian/5 dark:hover:bg-pearl/5 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-obsidian dark:bg-pearl rounded-full origin-left transition-all"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-obsidian dark:bg-pearl rounded-full transition-all"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-obsidian dark:bg-pearl rounded-full origin-left transition-all"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-obsidian/20 dark:bg-obsidian/40 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-pearl dark:bg-obsidian shadow-2xl lg:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-obsidian/10 dark:border-pearl/10">
                <span className="font-heading text-xl font-bold text-obsidian dark:text-pearl">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-obsidian/5 dark:hover:bg-pearl/5 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col h-[calc(100%-88px)]">
                {/* Primary Navigation */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-1">
                    {navigation.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {item.href ? (
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              'flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium transition-all',
                              'hover:bg-obsidian/5 dark:hover:bg-pearl/5',
                              item.highlight && 'text-lavender dark:text-sun'
                            )}
                          >
                            {item.name}
                            <svg
                              className="w-5 h-5 opacity-40"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        ) : (
                          <div className="space-y-2">
                            <div className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-obsidian/40 dark:text-pearl/40">
                              {item.name}
                            </div>
                            {item.dropdown?.map(section => (
                              <div key={section.title} className="space-y-1">
                                {section.items.map(subItem => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-obsidian/5 dark:hover:bg-pearl/5 transition-colors"
                                  >
                                    {subItem.icon && (
                                      <span className="text-lg">{subItem.icon}</span>
                                    )}
                                    <span className="text-base">{subItem.name}</span>
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-8 pt-8 border-t border-obsidian/10 dark:border-pearl/10 space-y-3">
                    <Link
                      href={`/${locale}/assessment`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl border-2 border-lavender text-lavender font-medium text-center hover:bg-lavender hover:text-white transition-all"
                    >
                      {tCommon('aiAssessment')}
                    </Link>

                    <Link
                      href={getLocalizedUrl('contact', locale)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-lavender to-sun text-white font-medium text-center hover:shadow-lg transition-all"
                    >
                      {t('contact') || 'Contacto'}
                    </Link>
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-obsidian/10 dark:border-pearl/10">
                  <div className="flex items-center justify-between">
                    <LanguageSwitcher />
                    <DarkModeToggle />
                  </div>

                  {/* Tagline */}
                  <p className="mt-4 text-xs text-obsidian/40 dark:text-pearl/40 text-center">
                    {t('tagline') || 'Human creativity meets AI precision'}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
}

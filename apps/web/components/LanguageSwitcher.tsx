'use client';

import { i18nConfig } from '@madfam/i18n';
import { ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { translatePathname } from '@/lib/route-translations';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect locale from pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const locale =
    pathSegments[0] && i18nConfig.locales.includes(pathSegments[0] as any)
      ? pathSegments[0]
      : i18nConfig.defaultLocale;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    // Use route translation utility to properly handle route translations
    const newPath = translatePathname(pathname, newLocale);

    router.push(newPath);
    setIsOpen(false);
  };

  const currentLocaleName =
    i18nConfig.localeNames[locale as keyof typeof i18nConfig.localeNames] || locale;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Language switcher"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg" role="img" aria-label={currentLocaleName}>
          {locale === 'es-MX' ? '🇲🇽' : locale === 'pt-BR' ? '🇧🇷' : '🇺🇸'}
        </span>
        <span className="hidden sm:inline">{currentLocaleName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {i18nConfig.locales.map(loc => {
              const localeName = i18nConfig.localeNames[loc as keyof typeof i18nConfig.localeNames];
              const isActive = locale === loc;

              return (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`
                    w-full text-left px-4 py-2 text-sm flex items-center gap-3
                    ${
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                    transition-colors
                  `}
                  role="menuitem"
                  lang={loc}
                >
                  <span className="text-lg" role="img" aria-label={localeName}>
                    {loc === 'es-MX' ? '🇲🇽' : loc === 'pt-BR' ? '🇧🇷' : '🇺🇸'}
                  </span>
                  <span>{localeName}</span>
                  {isActive && <span className="ml-auto text-sun">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

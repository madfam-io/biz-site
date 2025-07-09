"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { serviceTiers } from '@madfam/core';
import { useLocale } from 'next-intl';
import { getLocalizedContent, getLocalizedServiceSlug, type Locale } from '@madfam/i18n';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'product' | 'page' | 'article';
  url: string;
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const locale = useLocale() as Locale;

  // Mock search data - in production, this would come from an API
  const searchableContent: SearchResult[] = [
    // Services
    ...Object.values(serviceTiers).map(service => {
      const localizedSlug = getLocalizedServiceSlug(service.id, locale);
      const baseRoute = locale === 'es-MX' ? 'servicios' : locale === 'pt-BR' ? 'servicos' : 'services';
      
      return {
        id: service.id,
        title: getLocalizedContent(service.name, locale),
        description: getLocalizedContent(service.description, locale),
        type: 'service' as const,
        url: `/${locale}/${baseRoute}/${localizedSlug}`,
      };
    }),
    // Products
    {
      id: 'spark',
      title: 'SPARK',
      description: locale === 'en-US' 
        ? 'AI orchestration platform to automate workflows'
        : locale === 'pt-BR' 
        ? 'Plataforma de orquestração de IA para automatizar fluxos de trabalho'
        : 'Plataforma de orquestación de IA para automatizar flujos de trabajo',
      type: 'product' as const,
      url: `/${locale}/${locale === 'es-MX' ? 'productos' : locale === 'pt-BR' ? 'produtos' : 'products'}#spark`,
    },
    {
      id: 'penny',
      title: 'PENNY',
      description: locale === 'en-US'
        ? 'AI-powered process automation assistant'
        : locale === 'pt-BR'
        ? 'Assistente de automação de processos com IA'
        : 'Asistente de automatización de procesos con IA',
      type: 'product' as const,
      url: `/${locale}/${locale === 'es-MX' ? 'productos' : locale === 'pt-BR' ? 'produtos' : 'products'}#penny`,
    },
    // Pages
    {
      id: 'about',
      title: locale === 'en-US' 
        ? 'About MADFAM' 
        : locale === 'pt-BR' 
        ? 'Sobre MADFAM'
        : 'Acerca de MADFAM',
      description: locale === 'en-US'
        ? 'Learn about our mission, vision and team'
        : locale === 'pt-BR'
        ? 'Conheça nossa missão, visão e equipe'
        : 'Conoce nuestra misión, visión y equipo',
      type: 'page' as const,
      url: `/${locale}/${locale === 'es-MX' ? 'nosotros' : locale === 'pt-BR' ? 'sobre' : 'about'}`,
    },
    {
      id: 'contact',
      title: locale === 'en-US'
        ? 'Contact'
        : locale === 'pt-BR'
        ? 'Contato'
        : 'Contacto',
      description: locale === 'en-US'
        ? 'Get in touch with our team'
        : locale === 'pt-BR'
        ? 'Entre em contato com nossa equipe'
        : 'Ponte en contacto con nuestro equipo',
      type: 'page' as const,
      url: `/${locale}/${locale === 'es-MX' ? 'contacto' : locale === 'pt-BR' ? 'contato' : 'contact'}`,
    },
    {
      id: 'assessment',
      title: locale === 'en-US'
        ? 'AI Assessment'
        : locale === 'pt-BR'
        ? 'Avaliação de IA'
        : 'Evaluación de IA',
      description: locale === 'en-US'
        ? 'Discover the AI potential for your business'
        : locale === 'pt-BR'
        ? 'Descubra o potencial de IA para seu negócio'
        : 'Descubre el potencial de IA para tu negocio',
      type: 'page' as const,
      url: `/${locale}/${locale === 'es-MX' ? 'evaluacion' : locale === 'pt-BR' ? 'avaliacao' : 'assessment'}`,
    },
    {
      id: 'calculator',
      title: locale === 'en-US'
        ? 'ROI Calculator'
        : locale === 'pt-BR'
        ? 'Calculadora de ROI'
        : 'Calculadora de ROI',
      description: locale === 'en-US'
        ? 'Calculate the return on investment of our services'
        : locale === 'pt-BR'
        ? 'Calcule o retorno do investimento de nossos serviços'
        : 'Calcula el retorno de inversión de nuestros servicios',
      type: 'page' as const,
      url: `/${locale}/${locale === 'es-MX' ? 'calculadora' : locale === 'pt-BR' ? 'calculadora' : 'calculator'}`,
    },
    {
      id: 'estimator',
      title: locale === 'en-US'
        ? 'Project Estimator'
        : locale === 'pt-BR'
        ? 'Estimador de Projetos'
        : 'Estimador de Proyectos',
      description: locale === 'en-US'
        ? 'Get an instant quote for your project'
        : locale === 'pt-BR'
        ? 'Obtenha uma cotação instantânea para seu projeto'
        : 'Obtén una cotización instantánea para tu proyecto',
      type: 'page' as const,
      url: `/${locale}/${locale === 'es-MX' ? 'estimador' : locale === 'pt-BR' ? 'estimador' : 'estimator'}`,
    },
  ];

  // Handle search
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = searchableContent.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filtered);
      setLoading(false);
    }, 300);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleResultClick = (url: string) => {
    router.push(url);
    setIsOpen(false);
    setQuery('');
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    const labels = {
      service: locale === 'en-US' ? 'Service' : locale === 'pt-BR' ? 'Serviço' : 'Servicio',
      product: locale === 'en-US' ? 'Product' : locale === 'pt-BR' ? 'Produto' : 'Producto',
      page: locale === 'en-US' ? 'Page' : locale === 'pt-BR' ? 'Página' : 'Página',
      article: locale === 'en-US' ? 'Article' : locale === 'pt-BR' ? 'Artigo' : 'Artículo',
    };
    return labels[type];
  };

  const getTypeColor = (type: SearchResult['type']) => {
    const colors = {
      service: 'text-sun bg-sun/10',
      product: 'text-lavender bg-lavender/10',
      page: 'text-leaf bg-leaf/10',
      article: 'text-obsidian bg-obsidian/10',
    };
    return colors[type];
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Search"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{t('search.button')}</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-sans bg-gray-100 dark:bg-gray-800 rounded">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
                <SearchIcon className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-400"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">
                    {t('search.searching')}
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result.url)}
                        className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                                {getTypeLabel(result.type)}
                              </span>
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {result.title}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                              {result.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query.trim() ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      {t('search.noResultsFor', { query })}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      {t('search.tryDifferentTerms')}
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 dark:text-gray-500">
                    <p>{t('search.startTyping')}</p>
                    <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                      <span className="flex items-center gap-1">
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">↑↓</kbd>
                        {t('search.navigate')}
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Enter</kbd>
                        {t('search.select')}
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Esc</kbd>
                        {t('search.close')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
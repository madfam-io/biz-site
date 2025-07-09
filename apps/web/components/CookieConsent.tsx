"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X } from 'lucide-react';
import { Button } from '@madfam/ui';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Apply saved preferences
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      applyCookiePreferences(savedPreferences);
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // This is where you would enable/disable analytics and marketing scripts
    if (prefs.analytics) {
      // Enable analytics (e.g., Plausible, Google Analytics)
      console.log('Analytics cookies enabled');
    }
    
    if (prefs.marketing) {
      // Enable marketing cookies
      console.log('Marketing cookies enabled');
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    applyCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    applyCookiePreferences(necessaryOnly);
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    applyCookiePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop for settings modal */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowSettings(false)}
            />
          )}

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed ${showSettings ? 'inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-8 sm:right-8 sm:left-auto sm:max-w-2xl' : 'bottom-0 left-0 right-0 sm:bottom-8 sm:left-8 sm:right-8'} z-50`}
          >
            <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
              {!showSettings ? (
                // Main Banner
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Cookie className="w-8 h-8 text-sun" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-heading font-semibold mb-2">
                        Usamos cookies 🍪
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. 
                        Puedes aceptar todas las cookies o personalizar tus preferencias.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={acceptAll}
                          className="w-full sm:w-auto"
                        >
                          Aceptar todas
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={acceptNecessary}
                          className="w-full sm:w-auto"
                        >
                          Solo necesarias
                        </Button>
                        <button
                          onClick={() => setShowSettings(true)}
                          className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Personalizar
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowBanner(false)}
                      className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label="Cerrar banner de cookies"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                // Settings Panel
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-heading font-semibold">
                      Preferencias de cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="necessary"
                        checked={preferences.necessary}
                        disabled
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-sun focus:ring-sun"
                      />
                      <div className="flex-1">
                        <label htmlFor="necessary" className="block font-medium mb-1">
                          Cookies necesarias
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
                        </p>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="analytics"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-sun focus:ring-sun"
                      />
                      <div className="flex-1">
                        <label htmlFor="analytics" className="block font-medium mb-1 cursor-pointer">
                          Cookies de análisis
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando información de forma anónima.
                        </p>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="marketing"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-sun focus:ring-sun"
                      />
                      <div className="flex-1">
                        <label htmlFor="marketing" className="block font-medium mb-1 cursor-pointer">
                          Cookies de marketing
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Se utilizan para rastrear visitantes en diferentes sitios web y mostrar anuncios relevantes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={savePreferences}
                      className="flex-1"
                    >
                      Guardar preferencias
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettings(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {/* Privacy Policy Link */}
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Para más información, consulta nuestra{' '}
                  <a href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                    Política de Privacidad
                  </a>
                  {' '}y{' '}
                  <a href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                    Términos y Condiciones
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
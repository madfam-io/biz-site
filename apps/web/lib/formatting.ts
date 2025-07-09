import { useLocale } from 'next-intl';

interface CurrencyConfig {
  locale: string;
  currency: string;
  symbol?: string;
}

const CURRENCY_BY_LOCALE: Record<string, CurrencyConfig> = {
  'en-US': { locale: 'en-US', currency: 'USD', symbol: '$' },
  'es-MX': { locale: 'es-MX', currency: 'MXN', symbol: '$' },
  'pt-BR': { locale: 'pt-BR', currency: 'BRL', symbol: 'R$' },
};

export function useCurrencyFormatter() {
  const locale = useLocale();
  const config = CURRENCY_BY_LOCALE[locale] || CURRENCY_BY_LOCALE['en-US'];

  const formatCurrency = (amount: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(amount);
  };

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return formatCurrency(amount / 1000000) + 'M';
    } else if (amount >= 1000) {
      return formatCurrency(amount / 1000) + 'K';
    }
    return formatCurrency(amount);
  };

  return {
    formatCurrency,
    formatCompactCurrency,
    currencySymbol: config.symbol,
    currency: config.currency,
  };
}

export function useNumberFormatter() {
  const locale = useLocale();

  const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, options).format(value);
  };

  const formatPercent = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      ...options,
    }).format(value / 100);
  };

  const formatCompact = (value: number) => {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  };

  return {
    formatNumber,
    formatPercent,
    formatCompact,
  };
}

export function useDateFormatter() {
  const locale = useLocale();

  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  };

  const formatDateShort = (date: Date | string) => {
    return formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateLong = (date: Date | string) => {
    return formatDate(date, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date | string) => {
    return formatDate(date, {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const formatDateTime = (date: Date | string) => {
    return formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const formatRelative = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return locale === 'en-US' ? 'just now' : 
             locale === 'es-MX' ? 'ahora mismo' : 
             'agora mesmo';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return locale === 'en-US' ? `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago` :
             locale === 'es-MX' ? `hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}` :
             `há ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return locale === 'en-US' ? `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago` :
             locale === 'es-MX' ? `hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}` :
             `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return locale === 'en-US' ? `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago` :
             locale === 'es-MX' ? `hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}` :
             `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
    }

    return formatDateShort(date);
  };

  return {
    formatDate,
    formatDateShort,
    formatDateLong,
    formatTime,
    formatDateTime,
    formatRelative,
  };
}

// Non-hook versions for server components or non-component contexts
export function getCurrencyFormatter(locale: string) {
  const config = CURRENCY_BY_LOCALE[locale] || CURRENCY_BY_LOCALE['en-US'];

  const formatCurrency = (amount: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(amount);
  };

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return formatCurrency(amount / 1000000) + 'M';
    } else if (amount >= 1000) {
      return formatCurrency(amount / 1000) + 'K';
    }
    return formatCurrency(amount);
  };

  return {
    formatCurrency,
    formatCompactCurrency,
    currencySymbol: config.symbol,
    currency: config.currency,
  };
}

export function getNumberFormatter(locale: string) {
  const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, options).format(value);
  };

  const formatPercent = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      ...options,
    }).format(value / 100);
  };

  const formatCompact = (value: number) => {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  };

  return {
    formatNumber,
    formatPercent,
    formatCompact,
  };
}
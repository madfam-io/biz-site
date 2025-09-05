'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

interface SDGBadgeProps {
  sdgs: string[];
  compact?: boolean;
  linkToImpact?: boolean;
}

export function SDGBadge({ sdgs, compact = false, linkToImpact = true }: SDGBadgeProps) {
  const locale = useLocale();

  const getSDGNumber = (sdg: string): string => {
    const match = sdg.match(/\d+/);
    return match ? match[0] : '';
  };

  const getSDGColor = (sdgNumber: string): string => {
    const colors: { [key: string]: string } = {
      '1': '#E5243B',
      '2': '#DDA63A',
      '3': '#4C9F38',
      '4': '#C5192D',
      '5': '#FF3A21',
      '6': '#26BDE2',
      '7': '#FCC30B',
      '8': '#A21942',
      '9': '#FD6925',
      '10': '#DD1367',
      '11': '#FD9D24',
      '12': '#BF8B2E',
      '13': '#3F7E44',
      '14': '#0A97D9',
      '15': '#56C02B',
      '16': '#00689D',
      '17': '#19486A',
    };
    return colors[sdgNumber] || '#666666';
  };

  const impactUrl = `/${locale}/impact`;

  const badges = (
    <div className="flex flex-wrap gap-2">
      {sdgs.slice(0, compact ? 3 : sdgs.length).map(sdg => {
        const sdgNumber = getSDGNumber(sdg);
        return (
          <div
            key={sdg}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white transition-transform hover:scale-105"
            style={{ backgroundColor: getSDGColor(sdgNumber) }}
            title={sdg}
          >
            <span className="font-bold">
              {locale === 'en' ? 'SDG' : 'ODS'} {sdgNumber}
            </span>
            {!compact && (
              <span className="hidden lg:inline text-xs">
                {sdg
                  .replace(/SDG\d+\s*|ODS\d+\s*/, '')
                  .split(' ')
                  .slice(0, 2)
                  .join(' ')}
              </span>
            )}
          </div>
        );
      })}
      {compact && sdgs.length > 3 && (
        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-200 text-neutral-700">
          +{sdgs.length - 3}
        </div>
      )}
    </div>
  );

  if (linkToImpact) {
    return (
      <Link href={impactUrl} className="group inline-block">
        <div className="flex items-center gap-2">
          {badges}
          <span className="text-xs text-neutral-500 group-hover:text-neutral-700 transition-colors">
            {locale === 'en'
              ? 'View impact →'
              : locale === 'es'
                ? 'Ver impacto →'
                : 'Ver impacto →'}
          </span>
        </div>
      </Link>
    );
  }

  return badges;
}

// Minimal inline badge for use in cards
export function SDGInlineBadge({ count }: { count: number }) {
  const locale = useLocale();
  const label = locale === 'en' ? 'SDGs' : 'ODS';

  return (
    <Link
      href={`/${locale}/impact`}
      className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium hover:bg-green-100 transition-colors"
    >
      <span className="w-2 h-2 bg-green-600 rounded-full" />
      {count} {label}
    </Link>
  );
}

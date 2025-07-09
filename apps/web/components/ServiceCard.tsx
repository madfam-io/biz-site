'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@madfam/ui';
import { ServiceTierConfig } from '@madfam/core';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { i18nConfig } from '@madfam/i18n';

interface ServiceCardProps {
  service: ServiceTierConfig;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const router = useRouter();
  const locale = useLocale();

  const colorClasses = {
    leaf: 'bg-leaf/20 text-leaf',
    sun: 'bg-sun/20 text-sun',
    lavender: 'bg-lavender/20 text-lavender',
    obsidian: 'bg-obsidian/20 text-obsidian',
    creative: 'bg-gradient-to-br from-lavender/20 to-sun/20 text-lavender',
  };

  return (
    <Card
      variant={featured ? 'elevated' : 'default'}
      className={featured ? 'border-2 border-lavender/20' : ''}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              colorClasses[service.color]
            }`}
          >
            <span className="text-2xl">{service.icon}</span>
          </div>
          {featured && (
            <span className="text-xs font-mono text-lavender bg-lavender/10 px-2 py-1 rounded">
              RECOMENDADO
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <CardTitle className="mb-2">
            L{service.level} - {service.name}
          </CardTitle>
          <CardDescription className="text-base">
            {service.description}
          </CardDescription>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Incluye:</p>
          <ul className="space-y-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-leaf mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <p className="text-sm text-gray-500">Desde</p>
          <p className="text-2xl font-heading font-bold text-obsidian">
            ${service.startingPrice.toLocaleString()} {service.currency}
          </p>
          {service.duration && (
            <p className="text-sm text-gray-500">{service.duration}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={featured ? 'creative' : 'primary'}
          size="md"
          className="w-full"
          onClick={() => {
            let route = `/services/${service.id}`;
            
            // Translate route if needed
            if (locale === 'es-MX') {
              const spanishRoutes = i18nConfig.routes['es-MX'];
              const translatedRoute = spanishRoutes[route as keyof typeof spanishRoutes];
              if (translatedRoute) {
                route = translatedRoute;
              }
            }
            
            router.push(`/${locale}${route}`);
          }}
        >
          {service.cta.text}
        </Button>
      </CardFooter>
    </Card>
  );
}
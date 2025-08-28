'use client';

import { type ServiceTierConfig } from '@madfam/core';
import {
  Container,
  Heading,
  Button,
  Card,
  CardContent,
  ROICalculator,
  LeadForm,
  TestimonialGrid,
  Hero,
  type TestimonialData,
  type ROIResults,
  type LeadFormData,
} from '@madfam/ui';
import { ServiceStructuredData } from '@/components/StructuredData';
import { logServiceInquiry } from '@/lib/logger';
import { mapServiceTierToUI } from '@/utils/service-tier-mapping';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

interface Level3ConsultingClientProps {
  locale: string;
  service: ServiceTierConfig;
  serviceName: string;
  serviceDescription: string;
  translations: {
    heroSubtitle: string;
    scheduleInitial: string;
    downloadCase: string;
    typicalDuration: string;
    satisfaction: string;
    benefitsTitle: string;
    benefitsSubtitle: string;
    processTitle: string;
    processSubtitle: string;
    includedTitle: string;
    investment: string;
    from: string;
    projectDuration: string;
    paymentPlan: string;
    guaranteedROI: string;
    postSupport: string;
    requestProposal: string;
    testimonialsTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    scheduleNow: string;
    leadFormTitle: string;
    leadFormDescription: string;
    submitText: string;
  };
  benefits: Benefit[];
  processSteps: ProcessStep[];
  testimonials: TestimonialData[];
}

export function Level3ConsultingClient({
  locale,
  service,
  serviceName,
  serviceDescription,
  translations,
  benefits,
  processSteps,
  testimonials,
}: Level3ConsultingClientProps) {
  return (
    <main className="min-h-screen">
      <ServiceStructuredData
        name={serviceName}
        description={serviceDescription}
        serviceType="AI Consulting"
      />

      {/* Hero Section */}
      <Hero
        variant="service"
        title={serviceName}
        subtitle={translations.heroSubtitle}
        description={serviceDescription}
        cta={{
          primary: {
            text: translations.scheduleInitial,
            href: '#contact',
            variant: 'primary',
          },
          secondary: {
            text: translations.downloadCase,
            href: '#case-studies',
            variant: 'outline',
          },
        }}
        background="gradient"
        className="pt-20"
      >
        <div className="grid grid-cols-2 gap-8 text-center text-white/90">
          <div>
            <div className="text-2xl font-bold text-sun">3-6</div>
            <div className="text-sm">{translations.typicalDuration}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sun">95%</div>
            <div className="text-sm">{translations.satisfaction}</div>
          </div>
        </div>
      </Hero>

      {/* Benefits Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {translations.benefitsTitle}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {translations.benefitsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{benefit.icon}</div>
                    <div>
                      <h3 className="font-heading text-xl mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {translations.processTitle}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {translations.processSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="font-heading text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Included Services */}
      <section className="section">
        <Container>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-12">
              <Heading level={3} className="text-center mb-8">
                {translations.includedTitle}
              </Heading>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="font-heading text-lg">{translations.investment}</h4>
                  <p className="text-3xl font-bold">{translations.from} $50,000 - $200,000 MXN</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {translations.projectDuration}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-leaf">✓</span>
                    <span>{translations.paymentPlan}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-leaf">✓</span>
                    <span>{translations.guaranteedROI}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-leaf">✓</span>
                    <span>{translations.postSupport}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  logServiceInquiry(service.id, 'consulting-request-proposal', { locale });
                  window.location.href = '#contact';
                }}
              >
                {translations.requestProposal}
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* ROI Calculator */}
      <section className="section bg-pearl">
        <Container>
          <div className="max-w-5xl mx-auto">
            <ROICalculator
              serviceTier={mapServiceTierToUI(service.id)}
              title={serviceName}
              onCalculate={(results: ROIResults) => {
                logServiceInquiry(service.id, 'roi-calculator', {
                  ...results,
                  locale,
                });
              }}
            />
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {translations.testimonialsTitle}
            </Heading>
          </div>
          <TestimonialGrid testimonials={testimonials} columns={2} />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-obsidian to-lavender text-white">
        <Container>
          <div className="text-center">
            <Heading level={2} className="text-white mb-4">
              {translations.ctaTitle}
            </Heading>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {translations.ctaSubtitle}
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                logServiceInquiry(service.id, 'cta-schedule-consultation', { locale });
                window.location.href = '#contact';
              }}
            >
              {translations.scheduleNow}
            </Button>
          </div>
        </Container>
      </section>

      {/* Lead Form Section */}
      <section id="contact" className="section">
        <Container>
          <div className="max-w-2xl mx-auto">
            <LeadForm
              tier={mapServiceTierToUI(service.id)}
              source="level-3-consulting-page"
              title={translations.leadFormTitle}
              description={translations.leadFormDescription}
              submitText={translations.submitText}
              onSubmit={async (data: LeadFormData) => {
                logServiceInquiry(service.id, 'lead-form-submission', {
                  ...data,
                  locale,
                });
                // TODO: Implement actual form submission
              }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}

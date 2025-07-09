import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ROIResultsEmailProps {
  calculationId: string;
  results: {
    roi: {
      percentage: number;
      paybackMonths: number;
      fiveYearNetSavings: number;
    };
    futureState: {
      annualSavings: number;
    };
    benefits: {
      productivityGain: string;
      hoursRecoveredMonthly: number;
      costReduction: string;
    };
  };
  language?: 'es-MX' | 'en-US';
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const ROIResultsEmail: React.FC<ROIResultsEmailProps> = ({
  calculationId,
  results,
  language = 'es-MX',
}) => {
  const content = {
    'es-MX': {
      preview: 'Resultados de tu análisis de ROI - MADFAM',
      title: 'Resultados de tu Análisis de ROI',
      roiTitle: 'Retorno de Inversión:',
      paybackTitle: 'Tiempo de recuperación:',
      savingsTitle: 'Ahorro anual estimado:',
      fiveYearTitle: 'Ahorro a 5 años:',
      benefitsTitle: 'Beneficios adicionales:',
      productivityLabel: 'Ganancia de productividad:',
      hoursLabel: 'Horas recuperadas mensualmente:',
      costReductionLabel: 'Reducción de costos:',
      months: 'meses',
      cta: 'Agendar consulta para implementación',
      footer: 'Estos resultados son estimaciones basadas en la información proporcionada. Nuestro equipo puede ayudarte a desarrollar un plan de implementación detallado.',
      signature: 'Equipo MADFAM',
    },
    'en-US': {
      preview: 'Your ROI Analysis Results - MADFAM',
      title: 'Your ROI Analysis Results',
      roiTitle: 'Return on Investment:',
      paybackTitle: 'Payback period:',
      savingsTitle: 'Estimated annual savings:',
      fiveYearTitle: '5-year savings:',
      benefitsTitle: 'Additional benefits:',
      productivityLabel: 'Productivity gain:',
      hoursLabel: 'Hours recovered monthly:',
      costReductionLabel: 'Cost reduction:',
      months: 'months',
      cta: 'Schedule implementation consultation',
      footer: 'These results are estimates based on the information provided. Our team can help you develop a detailed implementation plan.',
      signature: 'MADFAM Team',
    },
  };

  const t = content[language];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'es-MX' ? 'es-MX' : 'en-US', {
      style: 'currency',
      currency: language === 'es-MX' ? 'MXN' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getROIColor = (roi: number) => {
    if (roi >= 100) return '#10B981'; // Green
    if (roi >= 50) return '#F59E0B'; // Yellow
    if (roi >= 20) return '#EF4444'; // Red
    return '#6B7280'; // Gray
  };

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/logo.png`}
            width="170"
            height="50"
            alt="MADFAM"
            style={logo}
          />
          <Heading style={h1}>{t.title}</Heading>
          
          <Section style={roiContainer}>
            <div style={roiBox}>
              <Text style={roiLabel}>{t.roiTitle}</Text>
              <Text style={{...roiNumber, color: getROIColor(results.roi.percentage)}}>
                {results.roi.percentage}%
              </Text>
              <Text style={roiSubLabel}>
                {t.paybackTitle} {results.roi.paybackMonths} {t.months}
              </Text>
            </div>
          </Section>

          <Section style={metricsContainer}>
            <div style={metricBox}>
              <Text style={metricLabel}>{t.savingsTitle}</Text>
              <Text style={metricValue}>
                {formatCurrency(results.futureState.annualSavings)}
              </Text>
            </div>
            <div style={metricBox}>
              <Text style={metricLabel}>{t.fiveYearTitle}</Text>
              <Text style={metricValue}>
                {formatCurrency(results.roi.fiveYearNetSavings)}
              </Text>
            </div>
          </Section>

          <Section style={section}>
            <Heading style={h2}>{t.benefitsTitle}</Heading>
            <div style={benefitsList}>
              <div style={benefitItem}>
                <Text style={benefitLabel}>{t.productivityLabel}</Text>
                <Text style={benefitValue}>{results.benefits.productivityGain}</Text>
              </div>
              <div style={benefitItem}>
                <Text style={benefitLabel}>{t.hoursLabel}</Text>
                <Text style={benefitValue}>{results.benefits.hoursRecoveredMonthly}</Text>
              </div>
              <div style={benefitItem}>
                <Text style={benefitLabel}>{t.costReductionLabel}</Text>
                <Text style={benefitValue}>{results.benefits.costReduction}</Text>
              </div>
            </div>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={`${baseUrl}/contact?ref=roi&id=${calculationId}`}>
              {t.cta}
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={text}>{t.footer}</Text>
          <Text style={signature}>{t.signature}</Text>
          
          <Hr style={hr} />
          <Text style={footer}>
            <Link href={`${baseUrl}`} style={link}>
              madfam.io
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const logo = {
  margin: '0 auto 20px',
};

const h1 = {
  color: '#0A0E27',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
};

const h2 = {
  color: '#0A0E27',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '28px',
  margin: '30px 0 15px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const roiContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const roiBox = {
  display: 'inline-block',
  padding: '32px',
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  textAlign: 'center' as const,
};

const roiLabel = {
  color: '#6B7280',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0 0 8px 0',
};

const roiNumber = {
  fontSize: '48px',
  fontWeight: '700',
  lineHeight: '1',
  margin: '8px 0',
};

const roiSubLabel = {
  color: '#6B7280',
  fontSize: '14px',
  fontWeight: '500',
  margin: '8px 0 0 0',
};

const metricsContainer = {
  display: 'flex',
  gap: '16px',
  margin: '32px 0',
};

const metricBox = {
  flex: '1',
  padding: '20px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  textAlign: 'center' as const,
};

const metricLabel = {
  color: '#6B7280',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 8px 0',
};

const metricValue = {
  color: '#0A0E27',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0',
};

const section = {
  margin: '32px 0',
};

const benefitsList = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '20px',
};

const benefitItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '12px 0',
};

const benefitLabel = {
  color: '#374151',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0',
};

const benefitValue = {
  color: '#0A0E27',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#0A0E27',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
  margin: '0 auto',
  maxWidth: '320px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const signature = {
  color: '#6B7280',
  fontSize: '16px',
  fontWeight: '600',
  margin: '16px 0',
};

const footer = {
  color: '#6B7280',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const link = {
  color: '#9B59B6',
  textDecoration: 'underline',
};
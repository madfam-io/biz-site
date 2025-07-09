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

interface WelcomeEmailProps {
  name: string;
  language: 'es-MX' | 'en-US';
  tier: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  name,
  language = 'es-MX',
  tier,
}) => {
  const content = {
    'es-MX': {
      preview: 'Bienvenido a MADFAM - Tu socio en transformación digital',
      greeting: `¡Hola ${name}!`,
      welcome: 'Bienvenido a MADFAM',
      intro: 'Gracias por tu interés en nuestros servicios. Somos especialistas en transformación digital y automatización inteligente.',
      tierInfo: `Basado en tu consulta, creemos que nuestro servicio ${tier} podría ser perfecto para ti.`,
      nextSteps: 'Próximos pasos:',
      step1: 'Revisaremos tu solicitud en las próximas 24 horas',
      step2: 'Te contactaremos para agendar una consulta gratuita',
      step3: 'Desarrollaremos una propuesta personalizada',
      cta: 'Agenda una consulta',
      footer: 'Si tienes alguna pregunta, no dudes en contactarnos.',
      signature: 'Equipo MADFAM',
    },
    'en-US': {
      preview: 'Welcome to MADFAM - Your digital transformation partner',
      greeting: `Hello ${name}!`,
      welcome: 'Welcome to MADFAM',
      intro: 'Thank you for your interest in our services. We specialize in digital transformation and intelligent automation.',
      tierInfo: `Based on your inquiry, we believe our ${tier} service could be perfect for you.`,
      nextSteps: 'Next steps:',
      step1: 'We will review your request within the next 24 hours',
      step2: 'We will contact you to schedule a free consultation',
      step3: 'We will develop a personalized proposal',
      cta: 'Schedule a consultation',
      footer: 'If you have any questions, please don\'t hesitate to contact us.',
      signature: 'MADFAM Team',
    },
  };

  const t = content[language];

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
          <Heading style={h1}>{t.welcome}</Heading>
          <Text style={text}>{t.greeting}</Text>
          <Text style={text}>{t.intro}</Text>
          <Text style={text}>{t.tierInfo}</Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href={`${baseUrl}/contact`}>
              {t.cta}
            </Button>
          </Section>

          <Section style={nextStepsContainer}>
            <Heading style={h2}>{t.nextSteps}</Heading>
            <Text style={text}>1. {t.step1}</Text>
            <Text style={text}>2. {t.step2}</Text>
            <Text style={text}>3. {t.step3}</Text>
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
  maxWidth: '200px',
};

const nextStepsContainer = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '20px',
  margin: '32px 0',
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
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Footer } from '../Footer';

// Mock the translations
const messages = {
  common: {
    footer: {
      rights: 'All rights reserved',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
  footer: {
    tagline: 'Where AI meets human creativity',
    cookies: 'Cookies',
    sections: {
      programs: 'Programs',
      products: 'Products',
      company: 'Company',
      resources: 'Resources',
    },
    programs: {
      designFabrication: 'Design & Fabrication',
      strategyEnablement: 'Strategy & Enablement',
      platformPilots: 'Platform Pilots',
      strategicPartnerships: 'Strategic Partnerships',
    },
    company: {
      about: 'About Us',
      units: 'Business Units',
      caseStudies: 'Case Studies',
      careers: 'Careers',
    },
    resources: {
      assessment: 'AI Assessment',
      calculator: 'ROI Calculator',
      guides: 'Guides',
      contact: 'Contact',
    },
    social: {
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      github: 'GitHub',
    },
  },
};

describe('Footer', () => {
  it('should display the current year dynamically', () => {
    const currentYear = new Date().getFullYear();

    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Footer />
      </NextIntlClientProvider>
    );

    // Check if the current year is displayed
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} MADFAM`, 'i'));
    expect(copyrightText).toBeInTheDocument();
  });

  it('should update year automatically each year', () => {
    // Mock Date to test different years
    const originalDate = Date;
    const mockDate = jest.fn(() => ({
      getFullYear: () => 2025,
    })) as any;
    mockDate.now = originalDate.now;
    global.Date = mockDate;

    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Footer />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/© 2025 MADFAM/i)).toBeInTheDocument();

    // Test for 2026
    mockDate.mockImplementation(() => ({
      getFullYear: () => 2026,
    }));

    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Footer />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/© 2026 MADFAM/i)).toBeInTheDocument();

    // Restore original Date
    global.Date = originalDate;
  });
});

import { render, screen } from '@/test-utils/providers';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('should display the current year dynamically', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />, { locale: 'en' });

    // Check if the current year is displayed
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} MADFAM`, 'i'));
    expect(copyrightText).toBeInTheDocument();
  });

  it('should update year automatically each year', () => {
    // Mock Date to test different years
    const originalDate = Date;
    const mockDate = jest.fn(() => ({
      getFullYear: () => 2025,
    })) as unknown as DateConstructor;
    mockDate.now = originalDate.now;
    global.Date = mockDate;

    render(<Footer />, { locale: 'en' });

    expect(screen.getByText(/© 2025 MADFAM/i)).toBeInTheDocument();

    // Test for 2026
    mockDate.mockImplementation(() => ({
      getFullYear: () => 2026,
    }));

    render(<Footer />, { locale: 'en' });

    expect(screen.getByText(/© 2026 MADFAM/i)).toBeInTheDocument();

    // Restore original Date
    global.Date = originalDate;
  });
});

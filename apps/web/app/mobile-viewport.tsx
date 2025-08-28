export const mobileMetadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover', // For iPhone notch
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0E27' },
  ],
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MADFAM',
  },
};

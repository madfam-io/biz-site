import { Container, Heading, Card } from '@madfam/ui';
import Link from 'next/link';

const apiEndpoints = [
  {
    category: 'Authentication',
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Authenticate user and receive access token',
      },
      {
        method: 'POST',
        path: '/api/auth/refresh',
        description: 'Refresh access token using refresh token',
      },
      {
        method: 'POST',
        path: '/api/auth/logout',
        description: 'Invalidate user session and tokens',
      },
    ],
  },
  {
    category: 'Assessment',
    endpoints: [
      {
        method: 'POST',
        path: '/api/assessment',
        description: 'Submit AI readiness assessment',
      },
      {
        method: 'GET',
        path: '/api/assessment/:id',
        description: 'Retrieve assessment results',
      },
    ],
  },
  {
    category: 'Calculator',
    endpoints: [
      {
        method: 'POST',
        path: '/api/calculator',
        description: 'Calculate ROI based on input parameters',
      },
      {
        method: 'GET',
        path: '/api/calculator/presets',
        description: 'Get industry-specific calculation presets',
      },
    ],
  },
  {
    category: 'Leads',
    endpoints: [
      {
        method: 'POST',
        path: '/api/leads',
        description: 'Submit a new lead',
      },
      {
        method: 'GET',
        path: '/api/leads',
        description: 'List all leads (admin only)',
      },
      {
        method: 'PUT',
        path: '/api/leads/:id',
        description: 'Update lead status',
      },
    ],
  },
];

const codeExamples = {
  auth: `// Authentication Example
const response = await fetch('https://api.madfam.io/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'secure-password'
  })
});

const { token } = await response.json();`,
  
  assessment: `// Assessment Example
const response = await fetch('https://api.madfam.io/api/assessment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    companySize: 'medium',
    industry: 'manufacturing',
    currentTools: ['erp', 'crm'],
    challenges: ['efficiency', 'scalability']
  })
});`,
};

export default function ApiPage() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={1} className="mb-4">
              API Reference
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Complete reference for MADFAM API endpoints, authentication, and integration examples.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-12">
            <Card className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/docs/auth" className="text-lavender hover:text-lavender/80">
                  → Authentication Guide
                </Link>
                <Link href="/docs/rate-limits" className="text-lavender hover:text-lavender/80">
                  → Rate Limits
                </Link>
                <Link href="/docs/errors" className="text-lavender hover:text-lavender/80">
                  → Error Codes
                </Link>
                <Link href="/docs/sdks" className="text-lavender hover:text-lavender/80">
                  → SDKs & Libraries
                </Link>
              </div>
            </Card>
          </div>

          {/* Base URL */}
          <Card className="mb-12 p-6 bg-gray-50 dark:bg-gray-900">
            <h3 className="font-semibold mb-2">Base URL</h3>
            <code className="text-lg font-mono">https://api.madfam.io</code>
          </Card>

          {/* Endpoints */}
          <div className="space-y-12">
            {apiEndpoints.map((category, index) => (
              <div key={index}>
                <Heading level={2} className="mb-6">
                  {category.category}
                </Heading>
                <div className="space-y-4">
                  {category.endpoints.map((endpoint, endpointIndex) => (
                    <Card key={endpointIndex} className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 text-sm font-semibold rounded ${
                            endpoint.method === 'GET' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : endpoint.method === 'POST'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="font-mono text-lg">{endpoint.path}</code>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {endpoint.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Code Examples */}
          <div className="mt-16">
            <Heading level={2} className="mb-8">
              Code Examples
            </Heading>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-4">Authentication</h3>
                <Card className="p-6 bg-gray-50 dark:bg-gray-900">
                  <pre className="overflow-x-auto">
                    <code className="text-sm font-mono">{codeExamples.auth}</code>
                  </pre>
                </Card>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Assessment Submission</h3>
                <Card className="p-6 bg-gray-50 dark:bg-gray-900">
                  <pre className="overflow-x-auto">
                    <code className="text-sm font-mono">{codeExamples.assessment}</code>
                  </pre>
                </Card>
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <Card className="mt-16 p-8">
            <Heading level={3} className="mb-4">
              Rate Limiting
            </Heading>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              API requests are limited to ensure fair usage and system stability.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-lavender">100</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Requests per minute</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-lavender">1000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Requests per hour</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-lavender">10000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Requests per day</div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}
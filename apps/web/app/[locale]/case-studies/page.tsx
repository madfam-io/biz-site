import { Container, Heading, Card } from '@madfam/ui';
import Link from 'next/link';

const caseStudies = [
  {
    id: 1,
    client: 'Global Manufacturing Corp',
    industry: 'Manufacturing',
    title: 'Digital Transformation: From Legacy to Cloud-Native',
    challenge: 'Outdated systems limiting growth and operational efficiency',
    solution: 'Complete digital overhaul with cloud migration and AI-powered analytics',
    results: [
      '40% reduction in operational costs',
      '3x faster time-to-market',
      '99.9% system uptime achieved',
    ],
    image: '/images/case-study-1.jpg',
  },
  {
    id: 2,
    client: 'FinTech Innovations',
    industry: 'Financial Services',
    title: 'Building a Next-Gen Trading Platform',
    challenge: 'Need for real-time processing and regulatory compliance',
    solution: 'Custom platform with ML-driven insights and automated compliance',
    results: [
      '10ms average latency',
      '100% regulatory compliance',
      '$2M saved annually',
    ],
    image: '/images/case-study-2.jpg',
  },
  {
    id: 3,
    client: 'Healthcare Plus',
    industry: 'Healthcare',
    title: 'AI-Powered Patient Care System',
    challenge: 'Fragmented patient data and inefficient care coordination',
    solution: 'Unified healthcare platform with predictive analytics',
    results: [
      '30% improvement in patient outcomes',
      '50% reduction in administrative time',
      '2x increase in patient satisfaction',
    ],
    image: '/images/case-study-3.jpg',
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={1} className="mb-4">
              Case Studies
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real-world success stories of how we've helped businesses transform and thrive in the digital age.
            </p>
          </div>

          <div className="grid gap-8 md:gap-12">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-medium text-lavender">
                        {study.industry}
                      </span>
                      <span className="text-sm text-gray-500">
                        {study.client}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">
                      {study.title}
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                          Challenge
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {study.challenge}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                          Solution
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {study.solution}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
                        Results
                      </h3>
                      <ul className="space-y-2">
                        {study.results.map((result, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-sun mr-2">✓</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {result}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      href={`/case-studies/${study.id}`}
                      className="inline-flex items-center text-lavender hover:text-lavender/80 font-medium transition-colors"
                    >
                      Read full case study →
                    </Link>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-900 h-64 md:h-auto">
                    {/* Placeholder for image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      [Case Study Image]
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
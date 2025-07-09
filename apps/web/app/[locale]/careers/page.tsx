import { Container, Heading, Card, Button } from '@madfam/ui';

const openPositions = [
  {
    id: 1,
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote / Mexico City',
    type: 'Full-time',
    description: 'We're looking for an experienced engineer to help build scalable solutions for our enterprise clients.',
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    department: 'Innovation Lab',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our team to develop cutting-edge AI solutions that transform businesses.',
  },
  {
    id: 3,
    title: 'Product Designer',
    department: 'Design',
    location: 'Mexico City',
    type: 'Full-time',
    description: 'Create beautiful, intuitive experiences for our digital products and platforms.',
  },
  {
    id: 4,
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'Mexico City / Remote',
    type: 'Full-time',
    description: 'Help us expand our reach and build relationships with enterprise clients.',
  },
];

const benefits = [
  '🏥 Comprehensive health insurance',
  '🏖️ Flexible PTO policy',
  '💻 Remote-first culture',
  '📚 Learning & development budget',
  '🌟 Performance bonuses',
  '🏠 Home office stipend',
];

export default function CareersPage() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Heading level={1} className="mb-4">
              Join the MADFAM Team
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're building the future of business transformation. Join us in creating innovative solutions that help companies thrive in the digital age.
            </p>
          </div>

          {/* Culture Section */}
          <div className="mb-16">
            <Heading level={2} className="mb-8 text-center">
              Our Culture
            </Heading>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold mb-2">Innovation First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We embrace new technologies and creative solutions to solve complex problems.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-bold mb-2">Collaborative Spirit</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in the power of teamwork and value diverse perspectives.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="font-bold mb-2">Growth Mindset</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to continuous learning and personal development.
                </p>
              </Card>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <Heading level={2} className="mb-8 text-center">
              Benefits & Perks
            </Heading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <Heading level={2} className="mb-8 text-center">
              Open Positions
            </Heading>
            <div className="space-y-6">
              {openPositions.map((position) => (
                <Card key={position.id} className="p-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center">
                          <span className="mr-2">💼</span>
                          {position.department}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-2">📍</span>
                          {position.location}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-2">⏰</span>
                          {position.type}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {position.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-8">
                      <Button variant="primary">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-to-br from-lavender/10 to-sun/10">
              <Heading level={3} className="mb-4">
                Don't see the right position?
              </Heading>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're always looking for talented individuals. Send us your resume and let's talk!
              </p>
              <Button variant="secondary">
                Send Your Resume
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
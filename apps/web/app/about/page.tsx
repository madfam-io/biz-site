import { Container, Heading, Button } from '@madfam/ui';
import Link from 'next/link';

export default function AboutPage() {
  const team = [
    {
      name: 'Aldo Ruiz Luna',
      role: 'CEO & Fundador',
      roleEn: 'CEO & Founder',
      bio: 'Visionario tecnológico con más de 15 años transformando empresas con IA y creatividad.',
      bioEn: 'Technology visionary with over 15 years transforming companies with AI and creativity.',
      expertise: ['Estrategia IA', 'Innovación', 'Liderazgo'],
      expertiseEn: ['AI Strategy', 'Innovation', 'Leadership'],
      image: '/team/aldo.jpg',
    },
    {
      name: 'Daniela Martínez',
      role: 'Directora Creativa',
      roleEn: 'Creative Director',
      bio: 'Experta en diseño 3D y experiencias digitales que conectan marcas con audiencias.',
      bioEn: 'Expert in 3D design and digital experiences that connect brands with audiences.',
      expertise: ['Diseño 3D', 'UX/UI', 'Branding'],
      expertiseEn: ['3D Design', 'UX/UI', 'Branding'],
      image: '/team/daniela.jpg',
    },
    {
      name: 'Carlos Mendoza',
      role: 'CTO',
      roleEn: 'CTO',
      bio: 'Arquitecto de soluciones que lidera la implementación de plataformas empresariales.',
      bioEn: 'Solutions architect leading enterprise platform implementations.',
      expertise: ['Arquitectura', 'DevOps', 'Cloud'],
      expertiseEn: ['Architecture', 'DevOps', 'Cloud'],
      image: '/team/carlos.jpg',
    },
    {
      name: 'Ana López',
      role: 'Directora de IA',
      roleEn: 'AI Director',
      bio: 'Pionera en automatización inteligente y machine learning aplicado a negocios.',
      bioEn: 'Pioneer in intelligent automation and machine learning applied to business.',
      expertise: ['Machine Learning', 'Automatización', 'Data Science'],
      expertiseEn: ['Machine Learning', 'Automation', 'Data Science'],
      image: '/team/ana.jpg',
    },
  ];

  const values = [
    {
      icon: '🚀',
      title: 'Innovación Constante',
      titleEn: 'Constant Innovation',
      description: 'Exploramos nuevas tecnologías para mantener a nuestros clientes a la vanguardia.',
      descriptionEn: 'We explore new technologies to keep our clients at the forefront.',
    },
    {
      icon: '🤝',
      title: 'Colaboración Genuina',
      titleEn: 'Genuine Collaboration',
      description: 'Trabajamos como extensión de tu equipo, no como proveedores externos.',
      descriptionEn: 'We work as an extension of your team, not as external vendors.',
    },
    {
      icon: '✨',
      title: 'Excelencia Creativa',
      titleEn: 'Creative Excellence',
      description: 'Combinamos arte y tecnología para crear soluciones únicas y memorables.',
      descriptionEn: 'We combine art and technology to create unique and memorable solutions.',
    },
    {
      icon: '📈',
      title: 'Resultados Medibles',
      titleEn: 'Measurable Results',
      description: 'Cada proyecto se enfoca en generar impacto real y cuantificable.',
      descriptionEn: 'Every project focuses on generating real and quantifiable impact.',
    },
  ];

  const milestones = [
    { year: '2019', event: 'Fundación de MADFAM', eventEn: 'MADFAM Founded' },
    { year: '2020', event: 'Lanzamiento de SPARK beta', eventEn: 'SPARK beta launch' },
    { year: '2021', event: '100+ proyectos completados', eventEn: '100+ projects completed' },
    { year: '2022', event: 'Expansión internacional', eventEn: 'International expansion' },
    { year: '2023', event: 'Lanzamiento de PENNY', eventEn: 'PENNY launch' },
    { year: '2024', event: '50+ empresas transformadas', eventEn: '50+ companies transformed' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-obsidian to-obsidian/90 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-lavender rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-sun rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={1} className="text-white mb-6 animate-fade-up">
              Somos <span className="gradient-text">MADFAM</span>
            </Heading>
            <p className="text-xl text-white/90 mb-8 animate-fade-up animation-delay-200">
              Una familia de creativos y tecnólogos obsesionados con transformar el futuro de los negocios 
              a través de la inteligencia artificial y el diseño innovador.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-up animation-delay-400">
              <Button variant="secondary" size="lg">
                Conoce nuestro trabajo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                Únete al equipo
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender/10 mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <Heading level={3} className="mb-4">Nuestra Misión</Heading>
              <p className="text-lg text-obsidian/70">
                Democratizar el acceso a tecnología de vanguardia, permitiendo que empresas de todos 
                los tamaños compitan en la era digital con soluciones creativas y accesibles.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sun/10 mb-6">
                <span className="text-3xl">👁️</span>
              </div>
              <Heading level={3} className="mb-4">Nuestra Visión</Heading>
              <p className="text-lg text-obsidian/70">
                Ser el catalizador de la transformación digital en Latinoamérica, creando un futuro 
                donde la IA y la creatividad humana trabajen en perfecta armonía.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Nuestros Valores</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Los principios que guían cada decisión, proyecto y relación en MADFAM
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="font-heading text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-obsidian/70">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Conoce a la Familia</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Los mentes brillantes detrás de la magia de MADFAM
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-1"
              >
                <div className="relative bg-white rounded-[14px] p-6 h-full">
                  {/* Placeholder for team member photo */}
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-lavender/20 to-sun/20">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50">
                      👤
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-xl font-semibold text-center mb-1">
                    {member.name}
                  </h3>
                  <p className="text-lavender text-center mb-4">{member.role}</p>
                  <p className="text-sm text-obsidian/70 text-center mb-4">{member.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-obsidian/5 text-obsidian/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="section bg-gradient-to-br from-obsidian/5 to-lavender/5">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Nuestra Historia</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Un viaje de innovación, crecimiento y transformación
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-lavender to-sun"></div>
              
              {/* Timeline items */}
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                    }`}
                  >
                    <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-lavender to-sun text-white font-semibold mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="font-heading text-lg font-semibold">{milestone.event}</h3>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-lavender"></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section">
        <Container>
          <div className="bg-gradient-to-br from-lavender to-sun rounded-3xl p-12 text-center text-white">
            <Heading level={2} className="text-white mb-4">
              ¿Listo para ser parte de la familia?
            </Heading>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a nosotros en la misión de transformar el futuro de los negocios
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Trabajemos juntos
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-lavender"
              >
                Ver oportunidades
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
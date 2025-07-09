import { Container, Heading } from '@madfam/ui';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

// Mock blog data - in production, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI in Business Transformation',
    excerpt: 'Explore how artificial intelligence is reshaping the business landscape and creating new opportunities for growth and innovation.',
    date: '2024-03-15',
    author: 'MADFAM Team',
    category: 'AI & Innovation',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Building Scalable Digital Platforms: A Technical Guide',
    excerpt: 'Learn the key architectural principles and best practices for building platforms that can grow with your business.',
    date: '2024-03-10',
    author: 'MADFAM Engineering',
    category: 'Technical',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Customer Success Story: Transforming Operations with Automation',
    excerpt: 'How we helped a leading manufacturer reduce operational costs by 40% through intelligent automation solutions.',
    date: '2024-03-05',
    author: 'MADFAM Team',
    category: 'Case Studies',
    readTime: '6 min read',
  },
];

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('blog');
  
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Heading level={1} className="mb-4">
            {t('title')}
          </Heading>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
            {t('subtitle')}
          </p>

          <div className="space-y-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 dark:border-gray-800 pb-12 last:border-0">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="px-3 py-1 bg-lavender/10 text-lavender rounded-full">
                    {post.category}
                  </span>
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                  <span>{post.readTime.replace('min read', t('minRead'))}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 hover:text-lavender transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {t('by')} {post.author}
                  </span>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-lavender hover:text-lavender/80 font-medium transition-colors"
                  >
                    {t('readMore')} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
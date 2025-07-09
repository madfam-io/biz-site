import { Container, Heading } from '@madfam/ui';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { cmsClient } from '@/lib/cms';
import { environment } from '@/lib/environment';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Fallback post data for when CMS is unavailable
const getFallbackPost = (slug: string) => {
  const fallbackPosts: { [key: string]: any } = {
    'future-ai-business-transformation': {
      id: '1',
      title: 'The Future of AI in Business Transformation',
      excerpt:
        'Explore how artificial intelligence is reshaping the business landscape and creating new opportunities for growth and innovation.',
      publishedDate: '2024-03-15',
      author: { name: 'MADFAM Team', email: 'team@madfam.io' },
      slug: 'future-ai-business-transformation',
      tags: [{ tag: 'AI & Innovation' }],
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "Artificial Intelligence is no longer a futuristic concept—it's here, and it's transforming businesses across every industry. From automating routine tasks to providing deep insights through data analysis, AI is becoming an essential tool for companies looking to stay competitive in today's fast-paced market.",
              },
            ],
          },
        ],
      },
    },
    'building-scalable-digital-platforms': {
      id: '2',
      title: 'Building Scalable Digital Platforms: A Technical Guide',
      excerpt:
        'Learn the key architectural principles and best practices for building platforms that can grow with your business.',
      publishedDate: '2024-03-10',
      author: { name: 'MADFAM Engineering', email: 'engineering@madfam.io' },
      slug: 'building-scalable-digital-platforms',
      tags: [{ tag: 'Technical' }],
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "Building scalable digital platforms requires careful planning, robust architecture, and a deep understanding of both current needs and future growth. In this comprehensive guide, we'll explore the key principles and best practices that have helped us build platforms that serve millions of users.",
              },
            ],
          },
        ],
      },
    },
    'customer-success-automation': {
      id: '3',
      title: 'Customer Success Story: Transforming Operations with Automation',
      excerpt:
        'How we helped a leading manufacturer reduce operational costs by 40% through intelligent automation solutions.',
      publishedDate: '2024-03-05',
      author: { name: 'MADFAM Team', email: 'team@madfam.io' },
      slug: 'customer-success-automation',
      tags: [{ tag: 'Case Studies' }],
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'When a leading manufacturing company approached us with challenges around operational efficiency and rising costs, we knew that intelligent automation could be the solution. Through a comprehensive 6-month transformation project, we helped them achieve remarkable results.',
              },
            ],
          },
        ],
      },
    },
  };

  return fallbackPosts[slug] || null;
};

// Simple rich text renderer for the content
function renderRichText(content: any): string {
  if (!content || !content.content) return '';

  return content.content
    .map((block: any) => {
      if (block.type === 'paragraph' && block.content) {
        return block.content.map((item: any) => item.text || '').join('');
      }
      return '';
    })
    .join('\n\n');
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('blog');

  // Fetch blog post from CMS or use fallback data
  let post = null;

  if (environment.cms.enabled) {
    try {
      post = await cmsClient.getBlogPost(slug, locale);
    } catch (error) {
      console.warn('Failed to fetch blog post from CMS, trying fallback:', error);
    }
  }

  // If CMS fetch failed or CMS is disabled, try fallback
  if (!post) {
    post = getFallbackPost(slug);
  }

  // If no post found at all, return 404
  if (!post) {
    notFound();
  }

  const content = renderRichText(post.content);
  const readTime = calculateReadTime(content);
  const category = post.tags?.[0]?.tag || 'General';
  const authorName = typeof post.author === 'object' ? post.author.name : post.author;

  return (
    <main className="min-h-screen py-20">
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span className="px-3 py-1 bg-lavender/10 text-lavender rounded-full">
                {category}
              </span>
              <time dateTime={post.publishedDate}>
                {new Date(post.publishedDate).toLocaleDateString()}
              </time>
              <span>{readTime}</span>
            </div>

            <Heading level={1} className="mb-6">
              {post.title}
            </Heading>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{post.excerpt}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
              <span>
                {t('by')} {authorName}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                width={post.featuredImage.width || 800}
                height={post.featuredImage.height || 400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tagObj: { tag: string }, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tagObj.tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <a
              href={`/${locale}/blog`}
              className="text-lavender hover:text-lavender/80 font-medium transition-colors"
            >
              ← {t('backToBlog') || 'Back to Blog'}
            </a>
          </div>
        </article>
      </Container>
    </main>
  );
}

// Generate static params for known blog posts (fallback posts)
export async function generateStaticParams() {
  const staticPosts = [
    'future-ai-business-transformation',
    'building-scalable-digital-platforms',
    'customer-success-automation',
  ];

  return staticPosts.map(slug => ({
    slug,
  }));
}

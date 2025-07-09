import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

// Collections
import { Services } from './src/collections/Services';
import { Products } from './src/collections/Products';
import { CaseStudies } from './src/collections/CaseStudies';
import { BlogPosts } from './src/collections/BlogPosts';
import { Resources } from './src/collections/Resources';
import { TeamMembers } from './src/collections/TeamMembers';
import { Testimonials } from './src/collections/Testimonials';
import { Users } from './src/collections/Users';
import { Media } from './src/collections/Media';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: 'users',
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  collections: [
    Services,
    Products,
    CaseStudies,
    BlogPosts,
    Resources,
    TeamMembers,
    Testimonials,
    Users,
    Media,
  ],
  typescript: {
    outputFile: './src/payload-types.ts',
  },
  graphQL: {
    schemaOutputFile: './src/generated-schema.graphql',
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  cors: ['http://localhost:3000', 'https://madfam.io', 'https://staging.madfam.io'],
  csrf: ['http://localhost:3000', 'https://madfam.io', 'https://staging.madfam.io'],
});
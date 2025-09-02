import { buildConfig } from 'payload';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';

// Collections
import { Products } from './src/collections/Products.js';
import { CaseStudies } from './src/collections/CaseStudies.js';
import { BlogPosts } from './src/collections/BlogPosts.js';
import { Resources } from './src/collections/Resources.js';
import { TeamMembers } from './src/collections/TeamMembers.js';
import { Testimonials } from './src/collections/Testimonials.js';
import { Users } from './src/collections/Users.js';
import { Media } from './src/collections/Media.js';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  admin: {
    user: 'users',
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
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
      connectionString:
        process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/payload_cms',
    },
  }),
  cors: ['http://localhost:3000', 'https://madfam.io', 'https://staging.madfam.io'],
  csrf: ['http://localhost:3000', 'https://madfam.io', 'https://staging.madfam.io'],
});

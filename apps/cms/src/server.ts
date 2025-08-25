import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug environment loading
console.log('Environment loaded:');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('PAYLOAD_PUBLIC_SERVER_URL:', process.env.PAYLOAD_PUBLIC_SERVER_URL);

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`CMS Server listening on port ${PORT}`);
  });
};

start();

import express from 'express';
import payload from 'payload';
import { resolve } from 'path';

require('dotenv').config();

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
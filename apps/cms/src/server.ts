import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// In Payload v3, the server is started automatically via the build process
// This file is kept minimal for compatibility

const PORT = process.env.PORT || 3001;

console.log('CMS Configuration loaded');
console.log(`Port configured: ${PORT}`);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Set' : 'Not set');

// Export a placeholder for the build process
export default {};

// Load environment variables
const path = require('path');
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: path.join(__dirname, `../.env.${env}`) });
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Centralized JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "calander";

console.log("✅ JWT_SECRET loaded:", {
  JWT_SECRET: JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  from: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
});

module.exports = {
  JWT_SECRET
};

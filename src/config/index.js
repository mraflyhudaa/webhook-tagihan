require('dotenv').config();

const constants = require('../utils/constants');

const config = {
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  },
  server: {
    port: constants.SERVER.PORT,
    timezone: constants.CRON.TIMEZONE,
  },
  environment: process.env.NODE_ENV || 'development',
};

// Validate required environment variables
const requiredEnvVars = ['DISCORD_WEBHOOK_URL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

module.exports = config;

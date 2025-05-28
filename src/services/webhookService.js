const { WebhookClient } = require('discord.js');
const config = require('../config');
const logger = require('../utils/logger');

class WebhookService {
  constructor() {
    this.webhook = new WebhookClient({
      url: config.discord.webhookUrl,
    });
  }

  async sendMessage(message) {
    try {
      await this.webhook.send(message);
      logger.info('Successfully sent webhook message');
    } catch (error) {
      logger.error('Error sending webhook message:', error);
      throw error;
    }
  }
}

module.exports = new WebhookService();

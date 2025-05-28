const { WebhookClient } = require('discord.js');
const config = require('../config');

class WebhookService {
  constructor() {
    this.webhook = new WebhookClient({ url: config.DISCORD_WEBHOOK_URL });
  }

  async sendMessage(message) {
    try {
      await this.webhook.send(message);
    } catch (error) {
      console.error('Error sending webhook message:', error);
    }
  }
}

module.exports = new WebhookService();

const cron = require('node-cron');
const config = require('./config');
const logger = require('./utils/logger');
const server = require('./server');
const subscriptionService = require('./services/subscriptionService');
const webhookService = require('./services/webhookService');
const { CRON } = require('./utils/constants');

class Application {
  constructor() {
    this.subscriptionDates = [
      ...new Set(
        subscriptionService.subscriptions.map((sub) => sub.billingDate)
      ),
    ];
  }

  setupCronJobs() {
    this.subscriptionDates.forEach((billingDate) => {
      const cronExpression = `0 1 ${billingDate} * *`;

      cron.schedule(
        cronExpression,
        async () => {
          try {
            const subscriptions =
              subscriptionService.getSubscriptionsForDate(billingDate);

            for (const subscription of subscriptions) {
              const message =
                subscriptionService.formatSubscriptionMessage(subscription);
              await webhookService.sendMessage(message);
            }

            logger.info(
              `Successfully processed subscriptions for date ${billingDate}`
            );
          } catch (error) {
            logger.error(
              `Error processing subscriptions for date ${billingDate}:`,
              error
            );
          }
        },
        {
          timezone: CRON.TIMEZONE,
        }
      );

      logger.info(`Scheduled job for billing date ${billingDate}`);
    });
  }

  start() {
    try {
      this.setupCronJobs();
      server.listen(config.server.port, () => {
        logger.info(`Server running on port ${config.server.port}`);
        logger.info(`Server running in ${config.server.timezone} timezone`);
        logger.info('Subscription tracker bot is running!');
      });
    } catch (error) {
      logger.error('Failed to start application:', error);
      process.exit(1);
    }
  }
}

module.exports = new Application();

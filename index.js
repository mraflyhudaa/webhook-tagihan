const cron = require('node-cron');
const subscriptionService = require('./services/subscriptionService');
const webhookService = require('./services/webhookService');
const config = require('./config');

const subscriptionDates = [
  ...new Set(subscriptionService.subscriptions.map((sub) => sub.billingDate)),
];

subscriptionDates.forEach((billingDate) => {
  const cronExpression = `31 14 ${billingDate} * *`;

  cron.schedule(
    cronExpression,
    async () => {
      const subscriptions =
        subscriptionService.getSubscriptionsForDate(billingDate);

      for (const subscription of subscriptions) {
        const message =
          subscriptionService.formatSubscriptionMessage(subscription);
        await webhookService.sendMessage(message);
      }
    },
    {
      timezone: config.TIMEZONE,
    }
  );

  console.log(`Scheduled job for billing date ${billingDate}`);
});

console.log(`Server running in ${config.TIMEZONE} timezone`);
console.log('Subscription tracker bot is running!');

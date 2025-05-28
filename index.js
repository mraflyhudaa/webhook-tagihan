const cron = require('node-cron');
const subscriptionService = require('./services/subscriptionService');
const webhookService = require('./services/webhookService');
const config = require('./config');
const http = require('http');

const subscriptionDates = [
  ...new Set(subscriptionService.subscriptions.map((sub) => sub.billingDate)),
];

subscriptionDates.forEach((billingDate) => {
  const cronExpression = `0 1 ${billingDate} * *`;

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

http
  .createServer((req, res) => {
    if (req.url === '/health') {
      res.writeHead(200);
      res.end('OK');
    }
  })
  .listen(3000);

console.log(`Server running in ${config.TIMEZONE} timezone`);
console.log('Subscription tracker bot is running!');

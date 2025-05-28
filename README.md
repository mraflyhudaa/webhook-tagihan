# Discord Subscription Tracker Bot

A Discord bot that sends notifications for upcoming subscription payments via webhook.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Discord webhook URL:
   ```
   DISCORD_WEBHOOK_URL=your_webhook_url_here
   DISCORD_TOKEN=your_bot_token_here
   ```
4. Start the bot:
   ```bash
   node index.js
   ```

## Features

- Daily checks for subscription payments
- Automated notifications via Discord webhook
- Customizable subscription tracking
- Embedded message formatting

## Adding New Subscriptions

Add new subscriptions in `services/subscriptionService.js`:

```javascript
new Subscription('Service Name', amount, billingDate, 'Currency');
```

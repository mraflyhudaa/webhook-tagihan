const Subscription = require('../models/Subscription');
const logger = require('../utils/logger');
const { CURRENCY } = require('../utils/constants');

class SubscriptionService {
  constructor() {
    this.subscriptions = [
      new Subscription('Netflix', '46.500', 28),
      new Subscription('Spotify', '15.000', 1),
    ];

    this.monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
  }

  getSubscriptionsForDate(date) {
    try {
      return this.subscriptions.filter((sub) => sub.billingDate === date);
    } catch (error) {
      logger.error('Error getting subscriptions:', error);
      return [];
    }
  }

  formatSubscriptionMessage(subscription) {
    try {
      const currentMonth = this.monthNames[new Date().getMonth()];

      return {
        embeds: [
          {
            title: '🔔 Tagihan baru gaess!!!',
            color: 0xff0000,
            fields: [
              {
                name: 'Service',
                value: subscription.name,
                inline: true,
              },
              {
                name: 'Jumlah',
                value: `${CURRENCY.IDR} ${subscription.amount}`,
                inline: true,
              },
              {
                name: 'Tanggal Tagihan',
                value: `Tanggal ${subscription.billingDate} bulan ${currentMonth}`,
                inline: true,
              },
            ],
            timestamp: new Date(),
            footer: {
              text: 'Dusun Creative Finance',
            },
          },
        ],
      };
    } catch (error) {
      logger.error('Error formatting message:', error);
      throw error;
    }
  }
}

module.exports = new SubscriptionService();

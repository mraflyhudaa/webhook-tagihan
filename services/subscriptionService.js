const Subscription = require('../models/Subscription');

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
    return this.subscriptions.filter((sub) => sub.billingDate === date);
  }

  formatSubscriptionMessage(subscription) {
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
              value: `Rp ${subscription.amount}`,
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
  }
}

module.exports = new SubscriptionService();

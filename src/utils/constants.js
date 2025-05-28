module.exports = {
  CURRENCY: {
    IDR: 'Rp',
  },
  CRON: {
    DAILY_CHECK: '0 1 * * *',
    TIMEZONE: 'Asia/Jakarta',
  },
  SERVER: {
    PORT: process.env.PORT || 3000,
  },
};

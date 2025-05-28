class Subscription {
  constructor(name, amount, billingDate) {
    if (!name || !amount || !billingDate) {
      throw new Error('Missing required parameters for Subscription');
    }

    if (billingDate < 1 || billingDate > 31) {
      throw new Error('Invalid billing date');
    }

    this.name = name;
    this.amount = this.formatAmount(amount);
    this.billingDate = billingDate;
  }

  formatAmount(amount) {
    return amount.toString().replace(/\./g, ',');
  }

  toJSON() {
    return {
      name: this.name,
      amount: this.amount,
      billingDate: this.billingDate,
    };
  }
}

module.exports = Subscription;

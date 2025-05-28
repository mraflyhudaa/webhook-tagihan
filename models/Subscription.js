class Subscription {
  constructor(name, amount, billingDate) {
    this.name = name;
    this.amount = amount.toString().replace(/\./g, ',');
    this.billingDate = billingDate;
  }
}

module.exports = Subscription;

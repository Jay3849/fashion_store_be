const Razorpay = require("razorpay");

class RazorpayService {
  razorpay;
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_TEST_KEY_ID,
      key_secret: process.env.RAZORPAY_TEST_SECRET_KEY,
    });
  }

  async createOrder(options) {
    try {
      return await this.razorpay.orders.create(options);
    } catch (error) {
      console.log("error create order", error);
      throw error;
    }
  }
}

module.exports = RazorpayService;

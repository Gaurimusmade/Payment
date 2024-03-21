const { instance } = require("../index.js");
const crypto = require('crypto');

function hmac_sha256(data, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest('hex');
}

module.exports.checkout = async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order=await instance.orders.create(options);
  res.status(200).json({ success: true, order });
};

module.exports.paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_API_SECRET);

    if (generated_signature === razorpay_signature) {
        // Payment verification successful
        console.log("Payment is successful");
        res.status(200).json({ success: true });
    } else {
        // Payment verification failed
        console.log("Payment verification failed");
        res.status(400).json({ success: false });
    }
};

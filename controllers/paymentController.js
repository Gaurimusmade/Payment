const { instance } = require("../index.js"); // Import the Razorpay instance
const crypto = require("crypto"); // Import the crypto module for generating HMAC

// Function to generate HMAC SHA256 signature
function hmac_sha256(data, key) {
  const hmac = crypto.createHmac("sha256", key); // Create HMAC object with SHA256 algorithm and secret key
  hmac.update(data); // Update HMAC with data
  return hmac.digest("hex"); // Generate hexadecimal digest
}

// Controller function to create a new order
module.exports.checkout = async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100), // Convert amount to paise (Razorpay expects amount in smallest currency unit)
    currency: "INR", // Set currency to Indian Rupees
  };
  const order = await instance.orders.create(options); // Create new order using the Razorpay instance
  res.status(200).json({ success: true, order }); // Respond with success and order details
};

// Controller function to verify payment signature
module.exports.paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body; // Extract payment details from request body

  const generated_signature = hmac_sha256(
    razorpay_order_id + "|" + razorpay_payment_id,
    process.env.RAZORPAY_API_SECRET
  ); // Generate signature using HMAC SHA256

  if (generated_signature === razorpay_signature) {
    // Signature verification successful
    console.log("Payment is successful");
    res.status(200).json({ success: true }); // Respond with success
  } else {
    // Signature verification failed
    console.log("Payment verification failed");
    res.status(400).json({ success: false }); // Respond with failure
  }
};

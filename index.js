const express = require("express");
const app = express();
const cors = require("cors");

// Enable CORS
app.use(cors());

// Load environment variables
require("dotenv").config();

// Import Razorpay module
const Razorpay = require("razorpay");

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Razorpay instance
module.exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Import payment route
const paymentRoute = require("./routes/paymentRoute");

// Define payment route
app.use("/api", paymentRoute);

// Define endpoint to get Razorpay API key
app.get("api/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

// Start the server
const PORT = process.env.PORT || 3000; // Default port is 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

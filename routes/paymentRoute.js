const instance = require("../index.js");
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController.js");

// Route to handle checkout request
router.post("/checkout", paymentController.checkout);

// Route to handle payment verification request
router.post("/paymentVerification", paymentController.paymentVerification);

module.exports = router;

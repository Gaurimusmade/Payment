const instance=require('../index.js');
const express = require('express');
const router = express.Router();
const paymentController=require('../controllers/paymentController.js');

router.post('/checkout',paymentController.checkout);
router.post('/paymentVerification',paymentController.paymentVerification);


module.exports = router;

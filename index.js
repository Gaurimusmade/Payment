const express=require('express');
const app=express();
const cors = require('cors');

app.use(cors());
require('dotenv').config();
const Razorpay=require('razorpay');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY ,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const paymentRoute = require('./routes/paymentRoute');
  app.use('/api',paymentRoute );

const PORT=process.env.PORT;

app.get('api/getkey',(req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
})
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})



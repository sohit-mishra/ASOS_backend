const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const connectToDatabase = require('./config/db');
const auth = require('./routes/authRole');
const address = require('./routes/addressRoutes');
const cart = require('./routes/cartRoute');
const coupon = require('./routes/couponRoutes');
const offer = require('./routes/offerRoutes');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoutes');
const product = require('./routes/productRoutes');
const review = require('./routes/reviewRoutes');
const cors = require("./config/corsConfig");

app.use(express.json());
app.use(cors);

connectToDatabase();


app.get('/', (req, res)=>{
    try {
        res.status(200).send("Hello World");
    } catch (error) {
        res.status(500).send({error : error});
    }
})

app.use('/api/auth', auth);
app.use('/api/address', address);
app.use('/api/cart', cart);
app.use('/api/coupon', coupon);
app.use('/api/offer', offer);
app.use('/api/order', order);
app.use('/api/payment', payment);
app.use('/api/product', product);
app.use('/api/review', review);


app.listen(PORT,()=>{
    console.log("Server is Working localhost",PORT);
})
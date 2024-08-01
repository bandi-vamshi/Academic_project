const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/checkout', (req, res) => {
    const cart = req.body.cart;

    if (!cart || cart.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    req.session.cart = cart;

    res.status(200).json({ message: 'Checkout successful' });
});
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.json(cart);
});

app.post('/clear-cart', (req, res) => {
    req.session.cart = [];
    res.json({ message: 'Cart cleared' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

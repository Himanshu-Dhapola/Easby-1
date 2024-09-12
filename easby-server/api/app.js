import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from '../src/db/index.js';
import customerRouter from '../src/routes/customer.routes.js';
import cartRouter from '../src/routes/cart.routes.js';
import cartItemRouter from '../src/routes/cartItem.routes.js';
import customerProductRouter from '../src/routes/customerProduct.routes.js';
import adminProductRouter from '../src/routes/adminProduct.routes.js';
import orderRouter from '../src/routes/customerOrder.routes.js';
import paymentRouter from '../src/routes/payment.routes.js';
import orderHistoryRouter from '../src/routes/orderHistory.routes.js';

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Root route is working!');
});

app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/products', customerProductRouter);
app.use('/api/v1/admin/products', adminProductRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/cart_items', cartItemRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/order_history', orderHistoryRouter);

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
};


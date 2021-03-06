import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode at port ${PORT}`.green
      .inverse.underline
  )
);

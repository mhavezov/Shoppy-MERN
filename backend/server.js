import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errors.js';

dotenv.config();

connectDB();

const app = express();

app.use('/api/products', productRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode port ${PORT}`)
);

import express from 'express';
import 'dotenv/config';
import { connectDb } from './db/connectDB.js';
import { errorHandler } from './middlewares/errorHandler.js';
import productsRouter from './routers/productsRouter.js';
import authRouter from './routers/authRouter.js';
import orderRouter from './routers/ordersRouter.js';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/orders', orderRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

try {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
} catch (error) {
  console.log(`Failed to start server:`, error);
  process.exit(1);
}

export default app;

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDb } from './db/connectDB.js';
import { errorHandler } from './middlewares/errorHandler.js';
import productsRouter from './routers/productsRouter.js';
import authRouter from './routers/authRouter.js';
import orderRouter from './routers/ordersRouter.js';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import brandRouter from './routers/brandsRouter.js';
import reviewRouter from './routers/rewiewsRouter.js';
import basketRouter from './routers/basketRouter.js';
import promoRouter from './routers/promoRouter.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/orders', orderRouter);
app.use('/brands', brandRouter);
app.use('/reviews', reviewRouter);
app.use('/basket', basketRouter);
app.use('/promo', promoRouter);

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

import express from 'express';
import 'dotenv/config';
import { connectDb } from './db/connectDB.js';
import { errorHandler } from './middlewares/errorHandler.js';
import productsRouter from './routers/productsRouter.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/products', productsRouter);

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

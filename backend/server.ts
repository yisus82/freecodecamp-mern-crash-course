import express from 'express';
import { connectDB } from './db/config.ts';
import productRouter from './routes/product.ts';

process.loadEnvFile();

const server = process.env.SERVER || 'http://localhost';
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on ${server}:${port}`);
});

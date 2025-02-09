import express from 'express';
import { connectDB } from './db/config.ts';
import Product from './models/product.model.ts';
import type { DBProduct } from './types/backend.d.ts';

process.loadEnvFile();

const server = process.env.SERVER || 'http://localhost';
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.post('/api/products', async (req, res) => {
  const product: DBProduct = req.body;

  if (!product.name || !product.price || !product.image) {
    res.status(400).json({ message: 'Name, price, and image are required' });
    return;
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.header('Location', `/api/products/${newProduct._id}`);
    res.status(201).json({ message: 'Product created', data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Product removed', data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log('Environment:', process.env.NODE_ENV);
  connectDB();
  console.log(`Server is running on ${server}:${port}`);
});

import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './db/config.ts';
import Product from './models/product.model.ts';
import type { DBProduct } from './types/backend.d.ts';

process.loadEnvFile();

const server = process.env.SERVER || 'http://localhost';
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get('/api/products', async (_req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
    res.status(201).json({ data: newProduct });
  } catch (error) {
    console.error(`Error creating product: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product: DBProduct = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid product ID' });
    return;
  }

  if (!product.name || !product.price || !product.image) {
    res.status(400).json({ message: 'Name, price, and image are required' });
    return;
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid product ID' });
    return;
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ data: deletedProduct });
  } catch (error) {
    console.error(`Error deleting product: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on ${server}:${port}`);
});

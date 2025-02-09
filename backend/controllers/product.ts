import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.ts';
import type { DBProduct } from '../types/backend.d.ts';

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req: Request, res: Response) => {
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
};

const updateProduct = async (req: Request, res: Response) => {
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
};

const deleteProduct = async (req: Request, res: Response) => {
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
};

export { createProduct, deleteProduct, getAllProducts, updateProduct };

import { create } from 'zustand';
import { Product } from './../types/frontend.d';

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (newProduct: Product) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    id: string,
    updatedProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductState>(set => ({
  products: [],
  setProducts: products => set({ products }),
  createProduct: async newProduct => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields' };
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set(state => ({ products: [...state.products, data.data] }));
    return { success: true, message: 'Product created successfully' };
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async id => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.message) {
      return { success: false, message: data.message };
    }
    set(state => ({ products: state.products.filter(product => product._id !== id) }));
    return { success: true, message: 'Product deleted successfully' };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (data.message) {
      return { success: false, message: data.message };
    }
    set(state => ({
      products: state.products.map(product => (product._id === id ? data.data : product)),
    }));
    return { success: true, message: 'Product updated successfully' };
  },
}));

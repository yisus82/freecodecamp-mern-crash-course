import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../controllers/product.ts';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;

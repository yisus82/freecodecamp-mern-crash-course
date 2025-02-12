import { Product } from '@/types/frontend';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <p>{product.name}</p>;
};

export default ProductCard;

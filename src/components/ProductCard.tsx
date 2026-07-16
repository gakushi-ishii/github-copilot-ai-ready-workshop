import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat('ja-JP');

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link className="card" to={`/product/${product.id}`}>
      <div className="card__imagewrap">
        <img
          className="card__image"
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
        />
      </div>
      <div className="card__body">
        <h2 className="card__name">{product.name}</h2>
        <p className="card__description">{product.description}</p>
        <p className="card__price">
          ¥{priceFormatter.format(product.price)}
          <span className="card__tax">税込</span>
        </p>
      </div>
    </Link>
  );
}

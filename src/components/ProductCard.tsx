import { Link } from 'react-router-dom';
import { formatPrice } from '../lib/formatPrice';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link className="card-link" to={`/product/${product.id}`}>
      <article className="card">
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
            ¥{formatPrice(product.price)}
            <span className="card__tax">税込</span>
          </p>
        </div>
      </article>
    </Link>
  );
}

import { Link, useParams } from 'react-router-dom';
import type { Product } from '../types';
import { getProductById } from '../lib/products';

interface ProductDetailProps {
  products: Product[];
}

const priceFormatter = new Intl.NumberFormat('ja-JP');

export function ProductDetail({ products }: ProductDetailProps) {
  const { id } = useParams();
  const productId = Number(id);
  const product = Number.isNaN(productId)
    ? undefined
    : getProductById(products, productId);

  if (!product) {
    return (
      <div className="detail">
        <p className="detail__notfound">
          お探しの商品は見つかりませんでした。
        </p>
        <Link className="detail__back" to="/">
          ← 一覧へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="detail">
      <Link className="detail__back" to="/">
        ← 一覧へ戻る
      </Link>

      <div className="detail__content">
        <div className="detail__imagewrap">
          <img
            className="detail__image"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        <div className="detail__body">
          <h2 className="detail__name">{product.name}</h2>
          <p className="detail__price">
            ¥{priceFormatter.format(product.price)}
            <span className="detail__tax">税込</span>
          </p>
          <p className="detail__description">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

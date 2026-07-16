import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../lib/products';

const priceFormatter = new Intl.NumberFormat('ja-JP');

export function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="detail detail--notfound">
        <p className="detail__notfound-text">
          商品が見つかりませんでした。
        </p>
        <Link to="/" className="detail__back">
          ← 一覧へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="detail">
      <Link to="/" className="detail__back">
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
          <p className="detail__description">{product.description}</p>
          <p className="detail__price">
            ¥{priceFormatter.format(product.price)}
            <span className="detail__tax">税込</span>
          </p>
        </div>
      </div>
    </div>
  );
}

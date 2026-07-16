import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../lib/products';

const priceFormatter = new Intl.NumberFormat('ja-JP');

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(Number(id)) : undefined;

  if (!product) {
    return (
      <main className="main">
        <p className="detail__not-found">商品が見つかりませんでした。</p>
        <Link to="/" className="detail__back">← 一覧へ戻る</Link>
      </main>
    );
  }

  return (
    <main className="main">
      <Link to="/" className="detail__back">← 一覧へ戻る</Link>
      <div className="detail">
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
            <span className="card__tax">税込</span>
          </p>
        </div>
      </div>
    </main>
  );
}

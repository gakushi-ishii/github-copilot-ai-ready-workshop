import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { formatPrice } from '../lib/formatPrice';

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(({ id: productId }) => productId === Number(id));

  if (!product) {
    return (
      <main className="main detail-main">
        <section className="product-not-found" aria-labelledby="not-found-heading">
          <h2 id="not-found-heading">商品が見つかりません</h2>
          <p>指定された商品は存在しないか、販売を終了した可能性があります。</p>
          <Link className="back-link" to="/">← 商品一覧へ戻る</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="main detail-main">
      <Link className="back-link" to="/">← 商品一覧へ戻る</Link>

      <article className="product-detail">
        <div className="product-detail__imagewrap">
          <img
            className="product-detail__image"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="product-detail__body">
          <p className="product-detail__eyebrow">商品詳細</p>
          <h2 className="product-detail__name">{product.name}</h2>
          <p className="product-detail__description">{product.description}</p>
          <p className="product-detail__price">
            ¥{formatPrice(product.price)}
            <span className="card__tax">税込</span>
          </p>
        </div>
      </article>
    </main>
  );
}

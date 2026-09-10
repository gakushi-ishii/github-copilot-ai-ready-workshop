import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { products } from '../data/products';

const priceFormatter = new Intl.NumberFormat('ja-JP');

export function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="app">
        <Header productCount={products.length} />

        <main className="main">
          <div className="detail-state">
            <p className="detail-state__title">商品が見つかりませんでした。</p>
            <p className="detail-state__text">指定された商品は削除されたか、URLが誤っています。</p>
            <Link className="link-button" to="/">
              一覧へ戻る
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Header productCount={products.length} />

      <main className="main">
        <Link className="link-button link-button--ghost" to="/">
          ← 一覧へ戻る
        </Link>

        <article className="detail">
          <div className="detail__imagewrap">
            <img className="detail__image" src={product.imageUrl} alt={product.name} />
          </div>

          <div className="detail__body">
            <p className="detail__eyebrow">商品詳細</p>
            <h1 className="detail__title">{product.name}</h1>
            <p className="detail__price">¥{priceFormatter.format(product.price)}</p>
            <p className="detail__description">{product.description}</p>

            <div className="detail__actions">
              <Link className="link-button" to="/">
                一覧へ戻る
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

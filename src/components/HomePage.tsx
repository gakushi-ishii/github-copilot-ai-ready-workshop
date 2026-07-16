import { useMemo, useState } from 'react';
import { SearchBar } from './SearchBar';
import { ProductGrid } from './ProductGrid';
import { products } from '../data/products';
import { searchProducts } from '../lib/search';

export function HomePage() {
  const [query, setQuery] = useState('');

  const visibleProducts = useMemo(
    () => searchProducts(products, query),
    [query],
  );

  return (
    <>
      <div className="main__intro">
        <h2 className="main__heading">おすすめのアウトドア用品</h2>
        <p className="main__lead">
          登山・キャンプに役立つアイテムを取り揃えています。キーワードで検索してみましょう。
        </p>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <p className="result-count">{visibleProducts.length} 件の商品</p>

      <ProductGrid products={visibleProducts} />
    </>
  );
}

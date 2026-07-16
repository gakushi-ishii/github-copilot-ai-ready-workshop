import { SearchBar } from './SearchBar';
import { ProductGrid } from './ProductGrid';
import type { Product } from '../types';

interface HomePageProps {
  products: Product[];
  query: string;
  onQueryChange: (value: string) => void;
}

export function HomePage({ products, query, onQueryChange }: HomePageProps) {
  return (
    <>
      <div className="main__intro">
        <h2 className="main__heading">おすすめのアウトドア用品</h2>
        <p className="main__lead">
          登山・キャンプに役立つアイテムを取り揃えています。キーワードで検索してみましょう。
        </p>
      </div>

      <SearchBar value={query} onChange={onQueryChange} />

      <p className="result-count">{products.length} 件の商品</p>

      <ProductGrid products={products} />
    </>
  );
}

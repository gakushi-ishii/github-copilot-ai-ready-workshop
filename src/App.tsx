import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductDetail } from './components/ProductDetail';
import { products } from './data/products';
import { searchProducts } from './lib/search';

export default function App() {
  const [query, setQuery] = useState('');

  const visibleProducts = useMemo(
    () => searchProducts(products, query),
    [query],
  );

  return (
    <div className="app">
      <Header productCount={products.length} />

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={visibleProducts}
                query={query}
                onQueryChange={setQuery}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail products={products} />}
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>Outdoor eShop — GitHub Copilot ワークショップ用サンプル</p>
      </footer>
    </div>
  );
}

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductDetail } from './components/ProductDetail';
import { products } from './data/products';

export default function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="app">
      <Header productCount={products.length} />

      <Routes>
        <Route path="/" element={<HomePage query={query} onQueryChange={setQuery} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <footer className="footer">
        <p>Outdoor eShop — GitHub Copilot ワークショップ用サンプル</p>
      </footer>
    </div>
  );
}

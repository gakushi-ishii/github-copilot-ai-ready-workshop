import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { products } from './data/products';

export default function App() {
  return (
    <div className="app">
      <Header productCount={products.length} />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>Outdoor eShop — GitHub Copilot ワークショップ用サンプル</p>
      </footer>
    </div>
  );
}

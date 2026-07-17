import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import { ProductDetailPage } from './ProductDetailPage';
import { products } from '../data/products';

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

describe('商品詳細ページへの遷移', () => {
  it('商品カードをクリックすると詳細ページへ遷移する', () => {
    const product = products[0];
    renderApp('/');

    const cardLink = screen.getByRole('link', {
      name: new RegExp(product.name),
    });
    expect(cardLink).toHaveAttribute('href', `/product/${product.id}`);

    fireEvent.click(cardLink);

    expect(
      screen.getByRole('heading', { level: 2, name: product.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /一覧へ戻る/ }),
    ).toBeInTheDocument();
  });

  it('詳細ページから「一覧へ戻る」で一覧へ戻れる', () => {
    const product = products[0];
    renderApp(`/product/${product.id}`);

    fireEvent.click(screen.getByRole('link', { name: /一覧へ戻る/ }));

    expect(screen.getByText('おすすめのアウトドア用品')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/検索|キーワード/),
    ).toBeInTheDocument();
  });

  it('存在しない商品 ID では見つからない旨と戻る導線を表示する', () => {
    render(
      <MemoryRouter initialEntries={['/product/999999']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/商品が見つかりませんでした/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /一覧へ戻る/ }),
    ).toBeInTheDocument();
  });

  it('一覧には全商品ぶんのカードリンクが表示される', () => {
    renderApp('/');
    const grid = screen.getByText(`${products.length} 件の商品`);
    expect(grid).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    const productLinks = links.filter((link) =>
      within(link).queryByRole('img'),
    );
    expect(productLinks).toHaveLength(products.length);
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { products } from './data/products';

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

const target = products[0];

describe('商品詳細ページへの遷移', () => {
  it('一覧の商品カードから詳細ページへ遷移できる', () => {
    renderApp('/');

    // 一覧が表示されている
    expect(
      screen.getByRole('heading', { name: 'おすすめのアウトドア用品' }),
    ).toBeInTheDocument();

    // 対象商品のカード（リンク）をクリック
    const cardLink = screen.getByRole('link', {
      name: new RegExp(target.name),
    });
    fireEvent.click(cardLink);

    // 詳細ページに商品情報が表示される
    const heading = screen.getByRole('heading', { name: target.name });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(target.description)).toBeInTheDocument();

    // 一覧の見出しは消えている
    expect(
      screen.queryByRole('heading', { name: 'おすすめのアウトドア用品' }),
    ).not.toBeInTheDocument();
  });

  it('詳細ページから一覧へ戻れる', () => {
    renderApp(`/product/${target.id}`);

    expect(
      screen.getByRole('heading', { name: target.name }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /一覧へ戻る/ }));

    expect(
      screen.getByRole('heading', { name: 'おすすめのアウトドア用品' }),
    ).toBeInTheDocument();
  });

  it('存在しない商品 id では見つからないメッセージを表示する', () => {
    renderApp('/product/99999');

    const detail = screen.getByText('お探しの商品は見つかりませんでした。');
    expect(detail).toBeInTheDocument();

    // 戻るリンクは存在する
    expect(screen.getByRole('link', { name: /一覧へ戻る/ })).toBeInTheDocument();
  });
});

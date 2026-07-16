import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App ルーティング', () => {
  it('/ で一覧ページが表示される', () => {
    renderApp('/');
    expect(screen.getByText('おすすめのアウトドア用品')).toBeInTheDocument();
  });

  it('/product/:id で商品詳細ページが表示される', () => {
    renderApp('/product/1');
    expect(screen.getByText('← 一覧へ戻る')).toBeInTheDocument();
  });

  it('存在しない id にアクセスすると not found 表示になる', () => {
    renderApp('/product/9999');
    expect(screen.getByText('商品が見つかりませんでした。')).toBeInTheDocument();
    expect(screen.getByText('← 一覧へ戻る')).toBeInTheDocument();
  });

  it('詳細ページから「一覧へ戻る」リンクで / へ戻れる', () => {
    renderApp('/product/1');
    const backLink = screen.getByText('← 一覧へ戻る');
    fireEvent.click(backLink);
    expect(screen.getByText('おすすめのアウトドア用品')).toBeInTheDocument();
  });

  it('商品カードをクリックして詳細ページへ遷移できる', () => {
    renderApp('/');
    const cards = screen.getAllByRole('link');
    fireEvent.click(cards[0]);
    expect(screen.getByText('← 一覧へ戻る')).toBeInTheDocument();
  });
});

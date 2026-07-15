import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

function CurrentPath() {
  return <output data-testid="current-path">{useLocation().pathname}</output>;
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <CurrentPath />
    </MemoryRouter>,
  );
}

describe('商品詳細へのルーティング', () => {
  it('商品カードから対応する詳細ページへ遷移する', () => {
    renderAt('/');

    fireEvent.click(screen.getByRole('link', { name: /キャンプランタン/ }));

    expect(screen.getByTestId('current-path')).toHaveTextContent('/product/8');
    expect(screen.getByText('商品詳細')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'キャンプランタン' })).toBeInTheDocument();
    expect(screen.getByText('¥3,480')).toBeInTheDocument();
  });

  it('詳細ページから商品一覧へ戻る', () => {
    renderAt('/product/2');

    fireEvent.click(screen.getByRole('link', { name: '← 商品一覧へ戻る' }));

    expect(screen.getByTestId('current-path')).toHaveTextContent('/');
    expect(screen.getByRole('heading', { name: 'おすすめのアウトドア用品' })).toBeInTheDocument();
  });

  it('詳細ページから戻ったときに検索条件を維持する', () => {
    renderAt('/');

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'ランタン' } });
    fireEvent.click(screen.getByRole('link', { name: /キャンプランタン/ }));
    fireEvent.click(screen.getByRole('link', { name: '← 商品一覧へ戻る' }));

    expect(screen.getByRole('searchbox')).toHaveValue('ランタン');
    expect(screen.getByText('1 件の商品')).toBeInTheDocument();
  });

  it('存在しない商品IDではエラーと一覧へのリンクを表示する', () => {
    renderAt('/product/999');

    expect(screen.getByRole('heading', { name: '商品が見つかりません' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '← 商品一覧へ戻る' })).toHaveAttribute('href', '/');
  });
});

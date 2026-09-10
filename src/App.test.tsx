import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './App';

describe('商品詳細ルーティング', () => {
  it('商品カードから詳細ページへ遷移し、一覧へ戻れる', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole('link', { name: /ソーラー充電式フラッシュライトの詳細を見る/i }),
    );

    expect(
      screen.getByRole('heading', { name: 'ソーラー充電式フラッシュライト' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: '一覧へ戻る' }));

    expect(
      screen.getByRole('heading', { name: 'おすすめのアウトドア用品' }),
    ).toBeInTheDocument();
  });

  it('存在しない商品IDの場合はエラーページを表示する', () => {
    render(
      <MemoryRouter initialEntries={['/product/9999']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText('商品が見つかりませんでした。')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '一覧へ戻る' })).toBeInTheDocument();
  });
});

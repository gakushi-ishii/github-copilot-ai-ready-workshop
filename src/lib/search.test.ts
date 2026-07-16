import { describe, it, expect } from 'vitest';
import { searchProducts } from './search';
import type { Product } from '../types';

const sample: Product[] = [
  { id: 1, name: 'キャンプランタン', description: 'キャンプサイトを明るく照らすランタン', price: 3480, imageUrl: '/images/product8.png' },
  { id: 2, name: 'トレッキングポール', description: '登山での膝への負担を軽減', price: 3980, imageUrl: '/images/product2.png' },
  { id: 3, name: 'キャンプテント', description: '設営が簡単なキャンプ用テント', price: 12800, imageUrl: '/images/product9.png' },
];

describe('searchProducts', () => {
  it('検索語が空のときは全商品を返す', () => {
    expect(searchProducts(sample, '')).toHaveLength(3);
    expect(searchProducts(sample, '   ')).toHaveLength(3);
  });

  it('商品名に部分一致する商品を返す', () => {
    const result = searchProducts(sample, 'キャンプ');
    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });

  it('説明文にヒットする商品も返す', () => {
    const result = searchProducts(sample, '登山');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('トレッキングポール');
  });

  it('大文字小文字を区別しない', () => {
    const items: Product[] = [
      { id: 10, name: 'Solar Flashlight', description: 'Outdoor gear', price: 2480, imageUrl: '/images/product1.png' },
    ];
    expect(searchProducts(items, 'solar')).toHaveLength(1);
    expect(searchProducts(items, 'OUTDOOR')).toHaveLength(1);
  });

  it('ヒットしない場合は空配列を返す', () => {
    expect(searchProducts(sample, '存在しない商品')).toEqual([]);
  });

  it('半角スペース区切りの複数キーワードを AND 条件で絞り込む（再現ケース）', () => {
    const result = searchProducts(sample, 'キャンプ テント');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  it('全角スペース区切りの複数キーワードも AND 条件で絞り込む', () => {
    const result = searchProducts(sample, 'キャンプ\u3000テント');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  it('連続スペースと前後スペースを無視する', () => {
    const result = searchProducts(sample, '  キャンプ   テント  ');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  it('すべてのキーワードにマッチしない場合は空配列を返す', () => {
    expect(searchProducts(sample, 'キャンプ 存在しない')).toEqual([]);
  });

  it('元の商品配列を変更しない', () => {
    const original = [...sample];
    searchProducts(sample, 'キャンプ テント');
    expect(sample).toEqual(original);
  });
});

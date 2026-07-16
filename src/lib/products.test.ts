import { describe, it, expect } from 'vitest';
import { getProductById } from './products';
import type { Product } from '../types';

const sample: Product[] = [
  { id: 1, name: 'キャンプランタン', description: 'サイトを照らすランタン', price: 3480, imageUrl: '/images/product8.png' },
  { id: 2, name: 'トレッキングポール', description: '膝への負担を軽減', price: 3980, imageUrl: '/images/product2.png' },
];

describe('getProductById', () => {
  it('id に一致する商品を返す', () => {
    const result = getProductById(sample, 2);
    expect(result?.name).toBe('トレッキングポール');
  });

  it('一致する商品がない場合は undefined を返す', () => {
    expect(getProductById(sample, 999)).toBeUndefined();
  });
});

import { describe, it, expect } from 'vitest';
import { getProductById } from './products';

describe('getProductById', () => {
  it('存在する id の商品を返す', () => {
    const product = getProductById(1);
    expect(product).toBeDefined();
    expect(product!.id).toBe(1);
  });

  it('存在しない id は undefined を返す', () => {
    expect(getProductById(9999)).toBeUndefined();
  });
});

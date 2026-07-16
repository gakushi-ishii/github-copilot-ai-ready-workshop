import { products } from '../data/products';
import type { Product } from '../types';

/**
 * id から商品を取得します。
 * 存在しない id の場合は undefined を返します。
 */
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

import type { Product } from '../types';
import { products } from '../data/products';

/**
 * 商品 ID から該当する商品を返す。
 * 見つからない場合や ID が数値でない場合は undefined を返す。
 */
export function getProductById(
  id: number | string | undefined,
  list: Product[] = products,
): Product | undefined {
  if (id === undefined) {
    return undefined;
  }

  const numericId = typeof id === 'number' ? id : Number(id);
  if (!Number.isInteger(numericId)) {
    return undefined;
  }

  return list.find((product) => product.id === numericId);
}

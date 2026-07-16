import type { Product } from '../types';

/**
 * 商品配列から id に一致する商品を取得します。
 *
 * 見つからない場合は undefined を返します。
 * この関数は副作用を持たない純粋関数です。
 */
export function getProductById(
  products: Product[],
  id: number,
): Product | undefined {
  return products.find((product) => product.id === id);
}

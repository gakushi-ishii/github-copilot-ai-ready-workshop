import type { Product } from '../types';

/**
 * 商品を全文検索します。
 *
 * 商品名(name)と説明(description)の両方を対象に、
 * 大文字小文字を区別せず部分一致で絞り込みます。
 * 検索語が空の場合は全商品を返します。
 *
 * ※ この関数は副作用を持たない純粋関数です。
 *    （ワークショップ題材B：価格ソート/絞り込みはここに追加します）
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const keyword = query.trim().toLowerCase();
  if (keyword === '') {
    return products;
  }
  return products.filter((product) => {
    const haystack = `${product.name} ${product.description}`.toLowerCase();
    return haystack.includes(keyword);
  });
}

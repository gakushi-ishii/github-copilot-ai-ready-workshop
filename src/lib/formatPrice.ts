const priceFormatter = new Intl.NumberFormat('ja-JP');

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}

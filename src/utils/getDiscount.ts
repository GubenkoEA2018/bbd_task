export function getDiscount(bannerPrice: number, sellPrice: number): number {
  return Math.ceil(100 - (bannerPrice / sellPrice) * 100);
}

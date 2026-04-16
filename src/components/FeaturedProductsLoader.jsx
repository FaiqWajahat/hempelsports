import { getFeaturedProducts } from "@/data/catalog";
import FeaturedProducts from "./FeaturedProducts";

export default async function FeaturedProductsLoader() {
  const products = await getFeaturedProducts();

  if (!products || products.length === 0) {
    return null; // Don't show anything if no featured products
  }

  return <FeaturedProducts products={products} />;
}

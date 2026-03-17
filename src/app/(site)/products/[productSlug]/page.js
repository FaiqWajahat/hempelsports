import ProductDetailDisplay from "./ProductDetailDisplay";
import { getProductBySlug } from "@/data/catalog";
import { getCategoryBySlug, getSubcategoryBySlugs } from "@/data/categories";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  
  if (!product) {
    return { title: "Product Not Found | Venpa Sports" };
  }

  const category = getCategoryBySlug(product.categorySlug);
  const subcategory = getSubcategoryBySlugs(
    product.categorySlug,
    product.subCategorySlug,
  );

  const baseTitle = product.name;
  const categoryPart = category ? ` | ${category.name}` : "";
  const subcategoryPart = subcategory ? ` – ${subcategory.name}` : "";

  return {
    title: `${baseTitle}${subcategoryPart}${categoryPart} | Venpa Sports B2B`,
    description: `Request a B2B manufacturing quote for ${baseTitle}.`,
  };
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-zinc-50">
        <h1 className="text-2xl font-black text-zinc-900">Product not found.</h1>
      </div>
    );
  }

  const subcategory = getSubcategoryBySlugs(product.categorySlug, product.subCategorySlug);
  const productWithLabels = {
    ...product,
    subCategory: subcategory?.name ?? product.subCategorySlug,
  };

  return (
    <>
      <ProductDetailDisplay product={productWithLabels} />
    </>
  );
}

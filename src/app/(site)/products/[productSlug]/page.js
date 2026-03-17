import ProductDetailDisplay from "./ProductDetailDisplay";
import { getProductBySlug } from "@/data/catalog";
import { getCategoryBySlug, getSubcategoryBySlugs } from "@/data/categories";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  
  if (!product) {
    return { title: "Product Not Found | Hempel Sports" };
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
    title: `${baseTitle}${subcategoryPart}${categoryPart} | Hempel Sports B2B`,
    description: `Request a B2B manufacturing quote for ${baseTitle}.`,
  };
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);

  if (!product) {
    return (
      <>
        {/* Dark Hero Section to support the transparent navbar */}
        <section className="relative overflow-hidden bg-black pt-32 pb-12 lg:pt-40 lg:pb-16 flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
          </div>
          
          <div className="relative z-10 w-full max-w-7xl px-5 lg:px-8 flex flex-col items-center text-center">
            <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-black uppercase tracking-tighter leading-[0.9] text-white">
              Product Not Found
            </h1>
          </div>
        </section>

        {/* Dark Breadcrumbs */}
        <div className="bg-black">
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Product Not Found" }
            ]} 
            isDark={true}
          />
        </div>

        <div className="flex min-h-[50vh] items-center justify-center bg-zinc-50">
          <h1 className="text-2xl font-black text-zinc-900">Product not found.</h1>
        </div>
      </>
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

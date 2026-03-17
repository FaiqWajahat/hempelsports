import Link from "next/link";
import { searchProductsByQuery } from "@/data/catalog";
import { getCategoryBySlug, getSubcategoryBySlugs } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateMetadata({ searchParams }) {
  const resolved = await searchParams;
  const q = resolved?.q?.trim() || "";
  if (!q) return { title: "Search | Venpa Sports" };
  return {
    title: `Search: ${q} | Venpa Sports`,
    description: `Search results for "${q}" in our product catalog.`,
  };
}

export default async function SearchPage({ searchParams }) {
  const resolved = await searchParams;
  const q = resolved?.q?.trim() || "";
  const products = q ? await searchProductsByQuery(q) : [];

  const productsWithLabels = products.map((p) => {
    const category = getCategoryBySlug(p.categorySlug);
    const subcategory = getSubcategoryBySlugs(p.categorySlug, p.subCategorySlug);
    return {
      ...p,
      category: category?.name ?? p.categorySlug,
      subCategory: subcategory?.name ?? p.subCategorySlug,
    };
  });

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-24">
      <section className="border-b border-zinc-200 bg-white pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Search", href: "/search" },
              ...(q ? [{ label: `"${q}"` }] : []),
            ]}
          />
          <h1 className="mt-4 text-3xl font-black text-zinc-900 sm:text-4xl">
            {q ? `Search results for "${q}"` : "Search products"}
          </h1>
          {q && (
            <p className="mt-2 text-sm text-zinc-500">
              {productsWithLabels.length === 0
                ? "No products found. Try a different name or SKU."
                : `${productsWithLabels.length} product${productsWithLabels.length === 1 ? "" : "s"} found.`}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16">
        {!q ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center">
            <p className="text-zinc-500">
              Enter a product name or SKU in the search bar to find items.
            </p>
            <Link
              href="/categories"
              className="mt-6 inline-block rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[var(--color-secondary)]"
            >
              Browse categories
            </Link>
          </div>
        ) : productsWithLabels.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center">
            <p className="text-zinc-600">No products match your search.</p>
            <p className="mt-2 text-sm text-zinc-500">
              Try a different product name or SKU (e.g. BX-APEX-001).
            </p>
            <Link
              href="/categories"
              className="mt-6 inline-block rounded-xl border border-zinc-200 px-6 py-3 text-sm font-bold uppercase tracking-widest text-zinc-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              Browse all categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsWithLabels.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

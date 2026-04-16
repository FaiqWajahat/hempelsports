import Link from "next/link";
import { searchProductsByQuery } from "@/data/catalog";
import { getCategoryBySlug, getSubcategoryBySlugs } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateMetadata({ searchParams }) {
  const resolved = await searchParams;
  const q = resolved?.q?.trim() || "";
  if (!q) return { title: "Search | Hempel Sports" };
  return {
    title: `Search: ${q} | Hempel Sports`,
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
      {/* Search Result Hero - Dark Mode for Navbar Visibility */}
      <section className="relative overflow-hidden bg-black pt-32 pb-12 lg:pt-40 lg:pb-16 grayscale-0">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
          <div className="absolute inset-b-0 h-full w-full bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16 relative z-10">
          <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
            Product Discovery
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-tighter leading-[0.9] text-white">
            {q ? `Results for "${q}"` : "Search Catalog"}
          </h1>
          {q && (
            <p className="mt-6 text-sm font-medium leading-relaxed text-white/50 max-w-xl">
              {productsWithLabels.length === 0
                ? "No exact matches found in our current manufacturing lines."
                : `We found ${productsWithLabels.length} exact matching model${productsWithLabels.length === 1 ? "" : "s"} in your lookup.`}
            </p>
          )}
        </div>
      </section>

      {/* Dark Breadcrumbs Alignment */}
      <div className="bg-black">
        <Breadcrumbs
          isDark={true}
          items={[
            { label: "Home", href: "/" },
            { label: "Search", href: "/search" },
            ...(q ? [{ label: `"${q}"` }] : []),
          ]}
        />
      </div>

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

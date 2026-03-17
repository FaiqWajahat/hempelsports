import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCategoryBySlug } from "@/data/categories";
import { getProductCounts } from "@/lib/countUtils";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.categorySlug);
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.name} | Venpa Sports`,
    description: category.shortDescription,
  };
}

export default async function SubCategoryIndexPage({ params }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.categorySlug);
  const counts = await getProductCounts();

  if (!category) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-zinc-50">
        <h1 className="text-2xl font-black text-zinc-900">Category not found.</h1>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.name }
  ];
  console.log(resolvedParams);

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-24">
      
      
      {/* Category Hero */}
      <section className="relative overflow-hidden bg-black pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            priority
            className="object-cover object-center grayscale mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="mx-auto max-w-[1200px] px-6 relative z-10 text-center flex flex-col items-center">
            <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              Category Focus
            </span>
            <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.9] text-white">
              {category.name}
            </h1>
            <p className="mt-6 text-sm font-medium leading-relaxed text-white/50 max-w-xl mx-auto">
              Select a subcategory to view our manufactured product lines.
            </p>
        </div>
      </section>
      
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16 mt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Subcategories Grid */}
      <section className="mx-auto w-full max-w-[1600px] px-6 lg:px-16 pt-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {category.subcategories.map((sub) => (
            <Link 
              key={sub.slug}
              href={`/categories/${resolvedParams.categorySlug}/${sub.slug}`}
              className="group relative h-[400px] overflow-hidden bg-[#f5f5f5] block"
            >
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={sub.heroImage || category.heroImage}
                  alt={sub.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105 grayscale mix-blend-multiply opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/60" />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white">{sub.name}</h3>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#999]">
                  {counts.subCategories[`${resolvedParams.categorySlug}:${sub.slug}`] !== undefined 
                    ? `${counts.subCategories[`${resolvedParams.categorySlug}:${sub.slug}`]} Series` 
                    : sub.productCountLabel}
                </p>
                
                <span className="mt-8 flex items-center justify-center border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]">
                  Explore Mode
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

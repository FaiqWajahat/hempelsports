import CategoryProductDisplay from "../CategoryProductDisplay";
import {
  getCategoryBySlug,
  getSubcategoryBySlugs,
  getSubcategoriesForCategory,
} from "@/data/categories";
import { getProductsByCategoryAndSubcategory } from "@/data/catalog";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.categorySlug);

  if (!category) {
    return { title: "Category Not Found | Venpa Sports" };
  }

  const subcategory =
    resolvedParams.subCategorySlug === "all"
      ? null
      : getSubcategoryBySlugs(
          resolvedParams.categorySlug,
          resolvedParams.subCategorySlug,
        );

  const subName = subcategory
    ? subcategory.name
    : resolvedParams.subCategorySlug.replace(/-/g, " ").replace(/\b\w/g, (l) =>
        l.toUpperCase(),
      );

  return {
    title: `${subName} | ${category.name} | Venpa Sports `,
    description: category.description,
  };
}

export default async function SubCategoryProductPage({ params }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.categorySlug);

  if (!category) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-zinc-50">
        <h1 className="text-2xl font-black text-zinc-900">Category not found.</h1>
      </div>
    );
  }

  const subcategories = getSubcategoriesForCategory(resolvedParams.categorySlug);
  const products = await getProductsByCategoryAndSubcategory(
    resolvedParams.categorySlug,
    resolvedParams.subCategorySlug,
  );

  return (
    <>
      <CategoryProductDisplay
        category={category}
        categorySlug={resolvedParams.categorySlug}
        subcategories={subcategories}
        initialSubSlug={resolvedParams.subCategorySlug}
        products={products}
      />
    </>
  );
}

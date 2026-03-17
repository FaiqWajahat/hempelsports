import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { categories } from "@/data/categories";

const SITE_URL = "https://hempelsports.com";

export default async function sitemap() {
  // 1. Static Routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/quote",
    "/categories",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  }));

  // 2. Category Routes
  const categoryRoutes = categories.map((cat) => ({
    url: `${SITE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Subcategory Routes
  const subCategoryRoutes = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      url: `${SITE_URL}/categories/${cat.slug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }))
  );

  // 4. Product Routes (Dynamic from DB)
  let productRoutes = [];
  try {
    await connectDB();
    const products = await Product.find({}, "slug updatedAt").lean();
    productRoutes = products.map((prod) => ({
      url: `${SITE_URL}/products/${prod.slug}`,
      lastModified: prod.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap error fetching products:", error);
  }

  return [...staticRoutes, ...categoryRoutes, ...subCategoryRoutes, ...productRoutes];
}

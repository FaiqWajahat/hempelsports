import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { categories } from "@/data/categories";
import StatCards from "./StatCards";
import ProductsTable from "./ProductsTable";

export default async function AdminDashboard() {
  await connectDB();

  const totalCategories = categories.length;
  const totalSubcategories = categories.reduce(
    (acc, cat) => acc + (cat.subcategories?.length ?? 0),
    0
  );

  // Fetch products from MongoDB and serialize to plain objects
  const rawProducts = await Product.find({}).sort({ createdAt: -1 }).lean();
  const products = rawProducts.map((p) => ({
    ...p,
    _id: p._id.toString(),
    id: p._id.toString(),
    createdAt: p.createdAt?.toISOString() ?? null,
    updatedAt: p.updatedAt?.toISOString() ?? null,
  }));

  return (
    <div>
      <section id="admin-stats">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          Catalog Overview
        </h2>
        <StatCards
          categories={totalCategories}
          subcategories={totalSubcategories}
          products={products.length}
        />
      </section>

      <section id="admin-products" className="mt-10">
        <ProductsTable initialProducts={products} />
      </section>
    </div>
  );
}

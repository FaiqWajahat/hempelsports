import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";


export async function getAllProducts() {
  await connectDB();
  const products = await Product.find({}).lean();
  return products.map(p => ({
    ...p,
    id: p._id.toString(),
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString() || null,
    updatedAt: p.updatedAt?.toISOString() || null,
  }));
}

export async function getProductsByCategorySlug(categorySlug) {
  if (!categorySlug) return [];
  await connectDB();
  const products = await Product.find({ categorySlug }).lean();
  return products.map(p => ({
    ...p,
    id: p._id.toString(),
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString() || null,
    updatedAt: p.updatedAt?.toISOString() || null,
  }));
}

export async function getProductsByCategoryAndSubcategory(categorySlug, subCategorySlug) {
  if (!categorySlug) return [];
  if (!subCategorySlug || subCategorySlug === "all") {
    return getProductsByCategorySlug(categorySlug);
  }

  await connectDB();
  const products = await Product.find({ categorySlug, subCategorySlug }).lean();
  return products.map(p => ({
    ...p,
    id: p._id.toString(),
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString() || null,
    updatedAt: p.updatedAt?.toISOString() || null,
  }));
}

export async function getFeaturedProducts() {
  await connectDB();
  const products = await Product.find({ isFeatured: true }).lean();
  return products.map(p => ({
    ...p,
    id: p._id.toString(),
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString() || null,
    updatedAt: p.updatedAt?.toISOString() || null,
  }));
}

export async function searchProductsByQuery(query) {
  if (!query || typeof query !== "string") return [];
  const trimmed = query.trim();
  if (!trimmed) return [];

  await connectDB();
  const regex = new RegExp(trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const products = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { sku: { $regex: regex } },
    ],
  })
    .lean();

  return products.map((p) => ({
    ...p,
    id: p._id.toString(),
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString() || null,
    updatedAt: p.updatedAt?.toISOString() || null,
  }));
}

export async function getProductBySlug(productSlug) {
  if (!productSlug) return undefined;
  await connectDB();
  const product = await Product.findOne({ slug: productSlug }).lean();
  if (!product) return undefined;
  
  return {
    ...product,
    id: product._id.toString(),
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString() || null,
    updatedAt: product.updatedAt?.toISOString() || null,
  };
}

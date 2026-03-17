import { connectDB } from "./mongodb";
import Product from "@/models/Product";
import { categories as staticCategories } from "@/data/categories";

export async function getProductCounts() {
  try {
    await connectDB();
    
    // Format category counts into a map initialized with 0
    const categoryMap = {};
    const subCategoryMap = {};

    // Initialize all categories and subcategories with 0
    staticCategories.forEach(cat => {
      categoryMap[cat.slug] = 0;
      if (cat.subcategories) {
        cat.subcategories.forEach(sub => {
          subCategoryMap[`${cat.slug}:${sub.slug}`] = 0;
        });
      }
    });

    // Aggregate products by categorySlug
    const categoryCounts = await Product.aggregate([
      {
        $group: {
          _id: "$categorySlug",
          count: { $sum: 1 }
        }
      }
    ]);

    // Aggregate products by subCategorySlug
    const subCategoryCounts = await Product.aggregate([
      {
        $group: {
          _id: {
            category: "$categorySlug",
            sub: "$subCategorySlug"
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // Update categoryMap with real counts
    categoryCounts.forEach(item => {
      if (item._id) {
        categoryMap[item._id] = item.count;
      }
    });

    // Update subCategoryMap with real counts
    subCategoryCounts.forEach(item => {
      if (item._id && item._id.category && item._id.sub) {
        const key = `${item._id.category}:${item._id.sub}`;
        subCategoryMap[key] = item.count;
      }
    });

    return {
      categories: categoryMap,
      subCategories: subCategoryMap
    };
  } catch (error) {
    console.error("Error fetching product counts:", error);
    return { categories: {}, subCategories: {} };
  }
}

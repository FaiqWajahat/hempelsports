import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { categories } from "@/data/categories";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const totalCategories = categories.length;
    const totalSubcategories = categories.reduce(
      (acc, cat) => acc + (cat.subcategories?.length ?? 0),
      0
    );
    const totalProducts = await Product.countDocuments();

    return NextResponse.json({
      categories: totalCategories,
      subcategories: totalSubcategories,
      products: totalProducts,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch stats", detail: String(err) },
      { status: 500 }
    );
  }
}

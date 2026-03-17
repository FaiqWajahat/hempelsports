import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import { uploadBuffer } from "@/lib/cloudinary";
import Product from "@/models/Product";

// ─── GET all products ─────────────────────────────────────────────────────────
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch products", detail: String(err) },
      { status: 500 }
    );
  }
}

// ─── POST add a new product ───────────────────────────────────────────────────
export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Parse multipart form data
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const categorySlug = formData.get("categorySlug")?.toString().trim();
    const subCategorySlug = formData.get("subCategorySlug")?.toString().trim();

    if (!name || !categorySlug || !subCategorySlug) {
      return NextResponse.json(
        { error: "name, categorySlug and subCategorySlug are required." },
        { status: 400 }
      );
    }

    // Auto-generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Check slug uniqueness
    const existing = await Product.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: `A product with slug "${slug}" already exists.` },
        { status: 409 }
      );
    }

    // Handle image upload to Cloudinary
    let image = "";
    let imagePublicId = "";
    const imageFile = formData.get("image");

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await uploadBuffer(buffer, "venpa-sports/products");
      image = uploaded.url;
      imagePublicId = uploaded.public_id;
    }

    const product = await Product.create({
      name,
      slug,
      categorySlug,
      subCategorySlug,
      sku: formData.get("sku")?.toString().trim() || "",
      shortDescription: formData.get("shortDescription")?.toString().trim() || "",
      isNew: formData.get("isNew") === "true",
      isBestseller: formData.get("isBestseller") === "true",
      isFeatured: formData.get("isFeatured") === "true",
      image,
      imagePublicId,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create product", detail: String(err) },
      { status: 500 }
    );
  }
}

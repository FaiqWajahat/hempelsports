import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import { deleteImage } from "@/lib/cloudinary";
import Product from "@/models/Product";

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if it was uploaded there
    if (product.imagePublicId) {
      await deleteImage(product.imagePublicId);
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete product", detail: String(err) },
      { status: 500 }
    );
  }
}

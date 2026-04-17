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
    console.log(`[DELETE API] Attempting to delete product with ID: ${id}`);

    const product = await Product.findById(id);
    if (!product) {
      console.log(`[DELETE API] Product not found: ${id}`);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log(`[DELETE API] Found product: ${product.name}. ImagePublicId: ${product.imagePublicId}`);

    // Delete image from Cloudinary if it was uploaded there
    // Wrap in its own try-catch so failing to delete an image doesn't block DB deletion
    if (product.imagePublicId) {
      try {
        console.log(`[DELETE API] Deleting image ${product.imagePublicId} from Cloudinary...`);
        await deleteImage(product.imagePublicId);
        console.log(`[DELETE API] Cloudinary deletion successful.`);
      } catch (cloudinaryErr) {
        console.error(`[DELETE API] WARNING: Cloudinary deletion failed:`, cloudinaryErr);
        // We continue anyway so the DB entry can still be removed
      }
    }

    await Product.findByIdAndDelete(id);
    console.log(`[DELETE API] Successfully deleted product ${id} from MongoDB.`);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err) {
    console.error(`[DELETE API] CRITICAL ERROR:`, err);
    return NextResponse.json(
      { error: "Failed to delete product", detail: String(err) },
      { status: 500 }
    );
  }
}

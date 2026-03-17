import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    categorySlug: { type: String, required: true, trim: true },
    subCategorySlug: { type: String, required: true, trim: true },
    sku: { type: String, default: "", trim: true },
    image: { type: String, default: "" },           // Cloudinary secure_url
    imagePublicId: { type: String, default: "" },   // Cloudinary public_id (for deletion)
    isNew: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    shortDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

// Prevent model re-registration during hot-reload in dev
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

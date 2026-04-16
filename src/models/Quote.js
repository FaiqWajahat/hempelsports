import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    categories: { type: [String], default: [] },
    quantity: { type: String, trim: true },
    deliveryDate: { type: String, trim: true },
    projectDescription: { type: String, required: true },
    productSku: { type: String, trim: true },
    status: { type: String, enum: ["pending", "contacted", "closed"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);

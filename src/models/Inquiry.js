import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    inquiryType: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read", "contacted", "archived"], default: "unread" },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

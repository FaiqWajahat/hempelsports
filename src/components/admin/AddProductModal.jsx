import { useState } from "react";
import Image from "next/image";
import { categories } from "@/data/categories";

const EMPTY = {
  name: "",
  categorySlug: "",
  subCategorySlug: "",
  sku: "",
  shortDescription: "",
  isNew: false,
  isBestseller: false,
  isFeatured: false,
};

export default function AddProductModal({ onClose, onAdded }) {
  const [form, setForm] = useState(EMPTY);
  const [subcats, setSubcats] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    
    if (name === "categorySlug") {
      const cat = categories.find((c) => c.slug === value);
      setSubcats(cat?.subcategories ?? []);
      setForm((f) => ({ ...f, categorySlug: value, subCategorySlug: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: val }));
    }
    setError("");
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.categorySlug || !form.subCategorySlug) {
      setError("Name, Category and Subcategory are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      // Build FormData so we can send the image file together with the fields
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("categorySlug", form.categorySlug);
      fd.append("subCategorySlug", form.subCategorySlug);
      fd.append("sku", form.sku);
      fd.append("shortDescription", form.shortDescription);
      fd.append("isNew", String(form.isNew));
      fd.append("isBestseller", String(form.isBestseller));
      fd.append("isFeatured", String(form.isFeatured));
      if (imageFile) fd.append("image", imageFile);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: fd, // Let browser set Content-Type with boundary automatically
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add product.");
        return;
      }

      onAdded?.(data.product);
      onClose?.();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-base font-bold text-zinc-100">Add New Product</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          {/* Name */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Elite Pro Leather Gloves"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
            />
          </div>

          {/* Category + Subcategory */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categorySlug"
                value={form.categorySlug}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-500"
              >
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Subcategory <span className="text-red-500">*</span>
              </label>
              <select
                name="subCategorySlug"
                value={form.subCategorySlug}
                onChange={handleChange}
                disabled={!form.categorySlug}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-500 disabled:opacity-40"
              >
                <option value="">Select…</option>
                {subcats.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SKU */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-500">
              SKU
            </label>
            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              placeholder="e.g. BX-TRN-010"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-red-500"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              rows={2}
              placeholder="Brief product description…"
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-red-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Product Image
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/60 p-4 text-zinc-500 transition hover:border-red-500/50 hover:text-zinc-300">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={96}
                  height={96}
                  unoptimized
                  className="h-24 w-24 rounded-lg object-cover"
                />
              ) : (
                <>
                  <span className="text-2xl">🖼️</span>
                  <span className="text-xs">Click to select image</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {imageFile && (
              <p className="mt-1 truncate text-xs text-zinc-600">{imageFile.name}</p>
            )}
          </div>

          {/* Flags */}
          <div className="flex flex-wrap gap-5">
            {[
              { name: "isNew", label: "New Arrival" },
              { name: "isBestseller", label: "Bestseller" },
              { name: "isFeatured", label: "Featured" },
            ].map(({ name, label }) => (
              <label key={name} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name]}
                  onChange={handleChange}
                  className="h-4 w-4 rounded accent-red-500"
                />
                {label}
              </label>
            ))}
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400">
              {error}
            </p>
          )}

          {/* Footer */}
          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex min-w-[120px] items-center justify-center rounded-lg bg-red-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-400 disabled:opacity-60"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Uploading…
                </span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

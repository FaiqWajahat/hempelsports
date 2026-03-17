"use client";

import { useState } from "react";
import AddProductModal from "./AddProductModal";

export default function ProductsTable({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.categorySlug?.toLowerCase().includes(q) ||
      p.subCategorySlug?.toLowerCase().includes(q)
    );
  });

  async function handleDelete(id) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        // Match by _id (MongoDB string) or id
        setProducts((prev) => prev.filter((p) => (p._id ?? p.id) !== id));
        showToast("Product deleted successfully.");
      } else {
        showToast("Failed to delete product.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  function handleAdded(product) {
    setProducts((prev) => [...prev, product]);
    showToast(`"${product.name}" added successfully.`);
  }

  return (
    <div className="mt-8">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-6 top-6 z-50 rounded-xl px-5 py-3 text-sm font-medium shadow-xl transition-all ${
            toast.type === "error"
              ? "bg-red-500/90 text-white"
              : "bg-emerald-500/90 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Confirm delete dialog */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <p className="mb-1 text-base font-bold text-zinc-100">Delete Product?</p>
            <p className="mb-6 text-sm text-zinc-500">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-lg border border-zinc-700 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex flex-1 items-center justify-center rounded-lg bg-red-500 py-2 text-sm font-bold text-white transition hover:bg-red-400 disabled:opacity-60"
              >
                {deleting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdded={handleAdded}
        />
      )}

      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Products
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600">
            {filtered.length} of {products.length} shown
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, category…"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 sm:w-64"
          />
          {/* Add button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-red-400"
          >
            <span className="text-base leading-none">+</span>
            Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                #
              </th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Name
              </th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                SKU
              </th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Category
              </th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Subcategory
              </th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Flags
              </th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-zinc-600"
                >
                  {search ? "No products match your search." : "No products found."}
                </td>
              </tr>
            ) : (
              filtered.map((product, idx) => (
                <tr
                  key={product.id}
                  className="border-b border-zinc-800/60 transition-colors hover:bg-zinc-900/40"
                >
                  <td className="px-4 py-3 text-xs tabular-nums text-zinc-600">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-zinc-200">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                    {product.sku || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300">
                      {product.categorySlug}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-zinc-500">
                      {product.subCategorySlug}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.isNew && (
                        <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-400">
                          New
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">
                          Best
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-400">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

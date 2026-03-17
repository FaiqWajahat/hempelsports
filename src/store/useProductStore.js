import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  isInitialized: false,

  // Initialize the store with products fetched from server
  setProducts: (products) => set({ products, isInitialized: true }),

  // Helpers to get computed values synchronusly using get()
  getProductBySlug: (slug) => {
    return get().products.find(p => p.slug === slug);
  },
  
  getProductsByCategory: (categorySlug) => {
    return get().products.filter(p => p.categorySlug === categorySlug);
  },

  getProductsByCategoryAndSubcategory: (categorySlug, subCategorySlug) => {
    if (!subCategorySlug || subCategorySlug === "all") {
      return get().getProductsByCategory(categorySlug);
    }
    return get().products.filter(
      p => p.categorySlug === categorySlug && p.subCategorySlug === subCategorySlug
    );
  }
}));

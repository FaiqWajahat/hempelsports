'use client';

import { useEffect, useRef } from 'react';
import { useProductStore } from '@/store/useProductStore';

export default function StoreInitializer({ products }) {
  const initialized = useRef(false);

  // We set state immediately during render using useRef to avoid hydration mismatches
  // But we must do it carefully or use useEffect to guarantee no SSR warnings.
  // Using useEffect is safest for Next.js 13+ App Router
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    if (!initialized.current) {
      setProducts(products);
      initialized.current = true;
    }
  }, [products, setProducts]);

  return null;
}

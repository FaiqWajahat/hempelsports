import CategoriesHero from "./CategoriesHero";
import CategoriesGrid from "./CategoriesGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Product Categories | Hempel Sports",
  description: "Browse the full manufacturing catalog of Hempel Sports, from custom tracksuits to sports uniforms.",
};

import { getProductCounts } from "@/lib/countUtils";

export default async function CategoriesPage() {
  const counts = await getProductCounts();
  
  return (
    <>
     
      <CategoriesHero />
       <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />
      <CategoriesGrid counts={counts.categories} />
    </>
  );
}

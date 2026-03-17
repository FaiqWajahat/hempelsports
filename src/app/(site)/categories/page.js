import CategoriesHero from "./CategoriesHero";
import CategoriesGrid from "./CategoriesGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Shop Categories | Venpa Sports Manufacturing",
  description: "Browse premium manufactured combat sports equipment by category: Boxing, MMA, Protective Gear, and BJJ Apparel.",
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

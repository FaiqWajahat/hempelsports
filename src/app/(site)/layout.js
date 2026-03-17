import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreInitializer from "@/components/StoreInitializer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { getAllProducts } from "@/data/catalog";


export default async function SiteLayout({ children }) {
  const products = await getAllProducts();

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-950">
      <StoreInitializer products={products} />
      <Navbar />
      <main className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

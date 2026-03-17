import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";
import ContactFAQ from "./ContactFAQ";

export const metadata = {
  title: "Contact Us | Venpa Sports Manufacturing",
  description: "Get in touch with Venpa Sports for OEM/ODM manufacturing inquiries, bulk orders, and custom martial arts equipment quotes.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          
          {/* Contact Information Cards */}
          <ContactInfo />

        </div>
      </section>

      <ContactMap />
      <ContactFAQ />
    </>
  );
}

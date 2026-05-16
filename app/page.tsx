import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import InstagramCTA from "./components/InstagramCTA";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Reviews />
        <Gallery />
        <InstagramCTA />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import OurServices from "./components/OurServices";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
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
        <Gallery />
        <OurServices />
        <Services />
        <Reviews />
        <InstagramCTA />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

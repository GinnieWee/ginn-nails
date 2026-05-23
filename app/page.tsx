import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import About from "./components/About";
import InstagramCTA from "./components/InstagramCTA";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

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
        <About />
        <InstagramCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

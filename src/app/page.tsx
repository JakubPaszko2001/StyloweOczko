import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <Pricing />
      <BookingForm />
      <Footer />
      
      {/* Floating Ornament (Subtle background detail) */}
      <div className="ornament fixed top-1/4 right-10 w-64 h-64 border border-rose rounded-full opacity-[0.03] pointer-events-none -z-10" />
      <div className="ornament fixed bottom-1/4 -left-32 w-96 h-96 border border-rose rounded-full opacity-[0.02] pointer-events-none -z-10" />
    </main>
  );
}

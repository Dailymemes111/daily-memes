import About from "@/components/About";
import BrandCarousel from "@/components/BrandCarousel";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MotionField from "@/components/MotionField";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import Videos from "@/components/Videos";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <MotionField />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <BrandCarousel />
        <Videos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

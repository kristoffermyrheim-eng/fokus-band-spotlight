import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Media from "@/components/Media";
import Events from "@/components/Events";
import LatestNews from "@/components/LatestNews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Media />
      <Events />
      <LatestNews />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;

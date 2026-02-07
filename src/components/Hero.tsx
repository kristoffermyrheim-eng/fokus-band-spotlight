import { Button } from "@/components/ui/button";
import heroImage from "@/assets/Storbandet_Fokus.jpg";

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Band photo background */}
    <img
      src={heroImage}
      alt="Storbandet Fokus på scenen"
      className="absolute inset-0 w-full h-full object-cover object-top"
    />
    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />

    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
      <p className="text-primary text-sm tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-up">
        Big Band &middot; Jazz &middot; Soul
      </p>
      <h1 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-6 opacity-0 animate-fade-up [animation-delay:0.2s]">
        Storbandet Fokus
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 opacity-0 animate-fade-up [animation-delay:0.4s]">
        Kanskje Vestfolds mest engasjerende storband — med lang fartstid og anerkjennelse for å levere uforglemmelige musikalske opplevelser.
      </p>
      <div className="opacity-0 animate-fade-up [animation-delay:0.6s]">
        <Button size="lg" className="text-base px-8 py-6" asChild>
          <a href="#contact">Book oss</a>
        </Button>
      </div>
    </div>
  </section>
);

export default Hero;

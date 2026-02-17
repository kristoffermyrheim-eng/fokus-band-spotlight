import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import kristofferImg from "@/assets/kristoffer.jpg";
import roarImg from "@/assets/roar.jpg";
import totoImg from "@/assets/toto.jpg";
import gloerImg from "@/assets/gloer.jpg";

const boardMembers = [
  { name: "Kristoffer Myrheim", role: "Leder", image: kristofferImg },
  { name: "Roar Myrheim", role: "Styremedlem", image: roarImg },
  { name: "Toto Hagen", role: "Styremedlem", image: totoImg },
  { name: "Gløer Gløersen", role: "Varamedlem", image: gloerImg },
];

const News = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-primary"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tilbake til forsiden
          </Button>

          <h1 className="text-4xl md:text-5xl font-serif-display font-bold mb-12 text-primary">
            Nyheter
          </h1>

          {/* News article */}
          <article className="bg-card rounded-lg border border-border p-6 md:p-10">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4" />
              <time>Februar 2025</time>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif-display font-bold mb-6">
              Nytt styre i Storbandet Fokus
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Etter flere år med ledervervet, trekker Trygve Sivertsen seg ut av styret i bandet.
                Vi takker han for iherdig innsats over mange år.
              </p>
              <p>
                Ny leder, Kristoffer Myrheim, ble valgt inn på årsmøtet. I styret sitter ellers Roar Myrheim, Toto Hagen og Gløer Gløersen.
              </p>
            </div>

            <h3 className="text-xl font-serif-display font-semibold mb-6 text-foreground">
              Det nye styret
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {boardMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 border border-border">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-medium text-foreground text-sm">{member.name}</p>
                  <p className="text-xs text-primary">{member.role}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default News;

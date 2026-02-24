import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import kristofferImg from "@/assets/kristoffer.jpg";
import roarImg from "@/assets/roar.jpg";
import totoImg from "@/assets/toto.jpg";
import gloerImg from "@/assets/gloer.jpg";
import bakgardsfestivalenLogo from "@/assets/bakgardsfestivalen-logo.jpg";

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

          {/* Bakgårdsfestivalen article */}
          <article className="bg-card rounded-lg border border-border p-6 md:p-10 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4" />
              <time>2025</time>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif-display font-bold mb-6">
              Storbandet Fokus spiller på Bakgårdsfestivalen i Tønsberg 5. juni
            </h2>

            <div className="flex justify-center mb-6">
              <img
                src={bakgardsfestivalenLogo}
                alt="Bakgårdsfestivalen logo"
                className="h-40 rounded-lg"
              />
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Storbandet Fokus har gleden av å kunngjøre at vi spiller konsert under Bakgårdsfestivalen i Tønsberg fredag 5. juni 2026.
              </p>
              <p>
                Bakgårdsfestivalen er et frivillig drevet kulturarrangement som skaper liv og stemning i Tønsberg sentrum, med konserter og opplevelser i intime og uformelle omgivelser. Festivalen bygger på dugnadsånd og lokalt engasjement, og vi er stolte over å få være en del av dette fellesskapet.
              </p>
              <p>
                Publikum kan glede seg til en energisk storbandkonsert med variert repertoar – fra klassisk storbandjazz til mer moderne arrangementer – fremført av engasjerte musikere med sterk lokal tilknytning. For Storbandet Fokus er det viktig å bidra til levende byliv og tilgjengelige kulturopplevelser for et bredt publikum.
              </p>
              <p>
                Festivalen og konserten er i stor grad basert på frivillighet, og arrangementet gjennomføres med begrensede midler. At vi likevel får mulighet til å spille for publikum i Tønsberg sentrum, betyr mye for oss og understreker verdien av samarbeid mellom kulturaktører, frivillige og lokalt næringsliv.
              </p>
              <p>
                Vi håper å se både faste lyttere og nye ansikter i publikum når vi fyller bakgården med storbandlyd fredag 5. juni.
              </p>
              <p className="font-medium text-foreground">
                Velkommen til konsert!
              </p>
            </div>
          </article>

          {/* Nytt styre article */}
          <article className="bg-card rounded-lg border border-border p-6 md:p-10">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4" />
              <time>Februar 2025</time>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif-display font-bold mb-6">
              Nye takter i Storbandet Fokus: Kristoffer Myrheim tar over som leder i styret
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Etter et innholdsrikt jubileumsår og mange år med stødig kurs, skjer det nå endringer i kulissene hos Storbandet Fokus. På årets årsmøte ble et nytt styre valgt, og vi markerer samtidig slutten på en viktig epoke i bandets historie.
              </p>

              <h3 className="text-xl font-serif-display font-semibold text-foreground pt-2">
                En stor takk til Trygve Sivertsen
              </h3>
              <p>
                Etter flere år med utrettelig innsats som leder, har Trygve Sivertsen valgt å tre ut av styret. Trygve har vært en bærebjelke i bandet gjennom mange år, og hans iherdige arbeid har vært avgjørende for at vi i dag er et av regionens mest vitale storband. Vi retter en stor og hjertelig takk til Trygve for alt han har lagt ned av tid og sjel i Fokus!
              </p>

              <h3 className="text-xl font-serif-display font-semibold text-foreground pt-2">
                Klar for de neste 50 årene
              </h3>
              <p>
                Det er med glede vi presenterer Kristoffer Myrheim som ny leder for Storbandet Fokus. Med seg på laget har han et styre som kombinerer erfaring og brennende engasjement for storbandmusikken.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "Det er en ære å få lede et band med så mye tradisjon og spilleglede. Vi skal bygge videre på det gode fundamentet vi har, og sørge for at Storbandet Fokus fortsetter å levere musikalske opplevelser med skikkelig trøkk," sier den påtroppende lederen.
              </blockquote>
              <p>
              Det nye styret er allerede i gang med planleggingen av kommende konserter og prosjekter. Vi gleder oss til å se hva fremtiden bringer for gjengen i Re!
              </p>
            </div>

            <h3 className="text-xl font-serif-display font-semibold mb-6 text-foreground">
              Det nye styret består av:
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

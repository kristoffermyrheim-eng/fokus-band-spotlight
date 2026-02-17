import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bandPhoto from "@/assets/Storbandet_Fokus.jpg";

const timelineEvents = [
  {
    year: "1975",
    title: "Stiftelsen",
    text: "Orkesteret ble stiftet 16. mars 1975 på initiativ fra ildsjeler i Fon, Våle og Ramnes. Ildsjelene var Jacob Holden, Hans Kristian Hjelmtvedt, Thor Førsund, Ragnvald Kjølstad, Tor Engmann og Rolf Bruserød. Første øvelse ble holdt på Revetal ungdomsskole 16.9.1975 og første spilleoppdrag var i Stokke 31. oktober 1975.",
  },
  {
    year: "1975–1981",
    title: "Korpsårene",
    text: "I starten var det nærliggende å videreføre den tradisjonelle korpsmusikken. Bandet utviklet seg til et janitsjarkorps på nærmere 30 musikere med treblåse-, messingblåse- og slagverksinstrumenter.",
  },
  {
    year: "1981",
    title: "Hamskiftet — fra korps til storband",
    text: "Etter seks år gikk bandet inn i et hamskifte og bestemte seg for å utvikle seg i retning av storband med ordinær storbandbesetning bestående av trompet-, trombone-, saxrekke og komp. Musikalsk leder Knut Høydal ledet denne nye æraen, og bandet skiftet navn til Storbandet Fokus.",
  },
  {
    year: "Gjennom årene",
    title: "Det indre liv",
    text: "Det som har kjennetegnet bandet er den sosiale profilen, humoren og det inkluderende miljøet som gir plass både for de helt unge og de godt voksne. Øvelsene har hele tiden vært onsdager — først på Revetal ungdomsskole, videre til Ramnes barneskole og de siste 30 årene på Re videregående skole.",
  },
  {
    year: "Repertoar",
    title: "Arrangementer og stilarter",
    text: "Storbandet håndterer alt fra tradisjonell storbandjazz og mainstream jazz til dansbare låter innen latin, rock, disco, swing, vals, tango, blues og R&B. Bandet har gjennomført store produksjoner som «From Broadway to Borreveien», «A Tribute to Glenn Miller» og «Storbandjazzens Gullalder».",
  },
  {
    year: "2022",
    title: "Konsert med Heine Totland",
    text: "Storbandet gjennomførte en konsert med den kjente artisten Heine Totland.",
  },
  {
    year: "2023",
    title: "Konserter med stjernekraft",
    text: "I 2023 holdt bandet konsert med Hilde Louise Asbjørnsen, samt en spektakulær James Bond-konsert med John Berge.",
  },
  {
    year: "2024",
    title: "ABBA-konserter med Chili Vokal",
    text: "Storbandet satte opp to populære ABBA-konserter i samarbeid med vokalgruppa Chili Vokal.",
  },
  {
    year: "2025",
    title: "50-årsjubileum",
    text: "I 2025 feirer Storbandet Fokus 50 år med en stor jubileumskonsert. Gjesteartister var Hilde Louise Asbjørnsen, Ingar Kristiansen, Tarjei Grimsby, Line Knudsen, Trond Pedersen, Steinar Brenna og Hans Mathisen — i tillegg til fast vokalist Lena Jørgensen.",
  },
];

const musicalLeaders = [
  "Henry Klevan",
  "Ragnvald Kjølstad",
  "Willy Andreassen",
  "Knut Høydal",
  "Wojtek Paczuski",
  "Steinar Brenna",
  "Stig Fredriksen",
  "Hans Mathisen",
  "Trond Pedersen",
  "Øyvinn Pedersen",
];

const History = () => (
  <>
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={bandPhoto}
          alt="Storbandet Fokus"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Vår <span className="text-primary">Historie</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fra et lite korps i Vestfold i 1975 til et fullverdig storband med 50 års fartstid.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Det grunnleggende formålet var å lage et alternativt musikktilbud — særlig til unge musikere
            som gikk ut av skolekorpsene, men som ønsket å fortsette sin utvikling innen musikk i et
            mer voksent musikermiljø. Fokus holdt derfor et allsidig utvalg av musikkinstrumenter som
            nybegynnerne kunne låne og derved stimulere rekrutteringen.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-center mb-16">
            Tidslinje
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-12">
              {timelineEvents.map((event, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start md:items-center gap-8`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 md:-translate-x-1.5 mt-2 md:mt-0 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-primary font-semibold text-sm tracking-wider uppercase">
                      {event.year}
                    </span>
                    <h3 className="font-serif-display text-xl font-bold mt-1 mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{event.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Musical Leaders */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold mb-4">
            Musikalske <span className="text-primary">ledere</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-sm">
            Fra 1975 til i dag — i kronologisk rekkefølge
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {musicalLeaders.map((name) => (
              <span
                key={name}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground mt-8 text-sm max-w-xl mx-auto">
            Øyvinn Pedersen er den musikalske lederen med lengst erfaring — i over 30 år har han reist
            fra Modum hver onsdag for å lede storbandets øvelser.
          </p>
        </div>
      </section>

      {/* Vocalists */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold mb-8">
            Vokalister
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Storbandet har gjennom årene presentert mange vokalister. Faste vokalister har vært
            Sigbjørn Andersen, Line Knudsen, Erik Salminen — og vår nåværende vokalist{" "}
            <span className="text-primary font-semibold">Lena Jørgensen</span>.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default History;

import kristofferImg from "../assets/Kristoffer Myrheim.jpg";
import kulturhusetImg from "../assets/kulturhuset-drammen.jpg";

export interface NewsArticle {  id: string;
  title: string;
  slug: string;
  date: string; // ISO string
  excerpt: string;
  content: string; // HTML
  coverImageUrl?: string;
  ogImageUrl?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "2",
    title: "Storbandet Fokus spiller på Lørdagsjazzen i Drammen",
    slug: "lordagsjazzen-drammen-2026",
    date: "14.03.2026",
    excerpt:
      "Lørdag 20. juni inntar Storbandet Fokus scenen på Kulturhuset i Drammen som en del av den populære konsertserien Lørdagsjazzen.",
    coverImageUrl: kulturhusetImg,
    ogImageUrl: kulturhusetImg,
    content: `
      <p>Vi er stolte og glade for å kunne annonsere at Storbandet Fokus er invitert til å spille på <strong>Lørdagsjazzen</strong> på <a href="https://drammenkulturhus.no" target="_blank" rel="noopener noreferrer">Kulturhuset i Drammen</a> lørdag 20. juni 2026!</p>

      <h3>Om Lørdagsjazzen</h3>
      <p>Lørdagsjazzen er en av Drammens mest populære konsertserier, og trekker et stort og engasjert publikum gjennom hele sesongen. Konsertene arrangeres på Kulturhuset i Drammen, som med sin flotte akustikk og intime atmosfære gir en perfekt ramme for livejazz.</p>

      <h3>Storbandmusikk i storformat</h3>
      <p>Storbandet Fokus stiller med sine 18 musikere og byr på et variert program med alt fra klassiske storbandlåter til moderne arrangementer. Med et bredt repertoar som spenner fra swing og latin til funk og pop, garanterer vi en kveld med musikalsk bredde og spilleglede.</p>

      <blockquote>"Det er alltid en stor opplevelse å spille for et nytt publikum, og vi gleder oss enormt til å innta scenen på Kulturhuset i Drammen. Lørdagsjazzen har et fantastisk rykte, og vi lover å gi alt vi har!" sier bandets leder Kristoffer Myrheim.</blockquote>

      <h3>Praktisk informasjon</h3>
      <ul>
        <li><strong>Dato:</strong> Lørdag 20. juni 2026</li>
        <li><strong>Sted:</strong> Kulturhuset i Drammen</li>
        <li><strong>Konserttype:</strong> Lørdagsjazzen</li>
        <li><strong>Mer info:</strong> <a href="https://drammenkulturhus.no" target="_blank" rel="noopener noreferrer">drammenkulturhus.no</a></li>
      </ul>

      <p>Vi håper å se mange kjente og nye fjes i salen. Ta turen til Drammen og opplev Storbandet Fokus live!</p>
    `,
  },
  {
    id: "1",
    title:
      "Nye takter i Storbandet Fokus: Kristoffer Myrheim tar over som leder i styret",
    slug: "nytt-styre-2026",
    date: "02.12.2026",
    excerpt:
      "Etter et innholdsrikt jubileumsår skjer det endringer i kulissene. Kristoffer Myrheim er valgt som ny leder for Storbandet Fokus.",
    coverImageUrl: kristofferImg,
    ogImageUrl: kristofferImg,
    content: `
      <p>Etter et innholdsrikt jubileumsår og mange år med stødig kurs, skjer det nå endringer i kulissene hos Storbandet Fokus. På årets årsmøte ble et nytt styre valgt, og vi markerer samtidig slutten på en viktig epoke i bandets historie.</p>

      <h3>En stor takk til Trygve Sivertsen</h3>
      <p>Etter flere år med utrettelig innsats som leder, har Trygve Sivertsen valgt å tre ut av styret. Trygve har vært en bærebjelke i bandet gjennom mange år, og hans iherdige arbeid har vært avgjørende for at vi i dag er et av regionens mest vitale storband. Vi retter en stor og hjertelig takk til Trygve for alt han har lagt ned av tid og sjel i Fokus!</p>

      <h3>Klar for de neste 50 årene</h3>
      <p>Det er med glede vi presenterer Kristoffer Myrheim som ny leder for Storbandet Fokus. Med seg på laget har han et styre som kombinerer erfaring og brennende engasjement for storbandmusikken.</p>
      <blockquote>"Det er en ære å få lede et band med så mye tradisjon og spilleglede. Vi skal bygge videre på det gode fundamentet vi har, og sørge for at Storbandet Fokus fortsetter å levere musikalske opplevelser med skikkelig trøkk," sier den påtroppende lederen.</blockquote>
      <p>Det nye styret er allerede i gang med planleggingen av kommende konserter og prosjekter. Vi gleder oss til å se hva fremtiden bringer for gjengen i Re!</p>

      <h3>Det nye styret består av:</h3>
      <ul>
        <li><strong>Kristoffer Myrheim</strong> – Leder</li>
        <li><strong>Roar Myrheim</strong> – Styremedlem</li>
        <li><strong>Toto Hagen</strong> – Styremedlem</li>
        <li><strong>Gløer Gløersen</strong> – Varamedlem</li>
      </ul>
    `,
  },
];

// Sorted newest first
export const getNewsArticles = () =>
  [...newsArticles].sort((a, b) => b.date.localeCompare(a.date));

export const getNewsArticleBySlug = (slug: string) =>
  newsArticles.find((a) => a.slug === slug);

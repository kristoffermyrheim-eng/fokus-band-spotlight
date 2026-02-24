import bakgardsfestivalenLogo from "@/assets/bakgardsfestivalen-logo.jpg";
import kristofferImg from "@/assets/Kristoffer Myrheim.jpg";

export interface NewsArticle {
  id: string;
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
    id: "1",
    title: "Storbandet Fokus spiller på Bakgårdsfestivalen i Tønsberg 5. juni",
    slug: "bakgardsfestivalen-tonsberg-2026",
    date: "2025-12-01",
    excerpt:
      "Storbandet Fokus har gleden av å kunngjøre at vi spiller konsert under Bakgårdsfestivalen i Tønsberg fredag 5. juni 2026.",
    coverImageUrl: bakgardsfestivalenLogo,
    content: `
      <p>Storbandet Fokus har gleden av å kunngjøre at vi spiller konsert under Bakgårdsfestivalen i Tønsberg fredag 5. juni 2026.</p>
      <p>Bakgårdsfestivalen er et frivillig drevet kulturarrangement som skaper liv og stemning i Tønsberg sentrum, med konserter og opplevelser i intime og uformelle omgivelser. Festivalen bygger på dugnadsånd og lokalt engasjement, og vi er stolte over å få være en del av dette fellesskapet.</p>
      <p>Publikum kan glede seg til en energisk storbandkonsert med variert repertoar – fra klassisk storbandjazz til mer moderne arrangementer – fremført av engasjerte musikere med sterk lokal tilknytning. For Storbandet Fokus er det viktig å bidra til levende byliv og tilgjengelige kulturopplevelser for et bredt publikum.</p>
      <p>Festivalen og konserten er i stor grad basert på frivillighet, og arrangementet gjennomføres med begrensede midler. At vi likevel får mulighet til å spille for publikum i Tønsberg sentrum, betyr mye for oss og understreker verdien av samarbeid mellom kulturaktører, frivillige og lokalt næringsliv.</p>
      <p>Vi håper å se både faste lyttere og nye ansikter i publikum når vi fyller bakgården med storbandlyd fredag 5. juni.</p>
      <p><strong>Velkommen til konsert!</strong></p>
    `,
  },
  {
    id: "2",
    title:
      "Nye takter i Storbandet Fokus: Kristoffer Myrheim tar over som leder i styret",
    slug: "nytt-styre-2025",
    date: "2025-02-01",
    excerpt:
      "Etter et innholdsrikt jubileumsår skjer det endringer i kulissene. Kristoffer Myrheim er valgt som ny leder for Storbandet Fokus.",
    coverImageUrl: kristofferImg,
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

import kristofferImg from "../assets/Kristoffer Myrheim.jpg";
import kulturhusetImg from "../assets/Fokus_Abbakonsert.jpg";
import vikarGitarImg from "../assets/vikar-gitar.jpg";
import gooseImg from "../assets/goose-fokus-stoperiet-plakat.jpg";

export interface NewsArticle {  id: string;
  title: string;
  slug: string;
  date: string; // DD.MM.YYYY
  excerpt: string;
  content: string; // HTML
  coverImageUrl?: string;
  ogImageUrl?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "4",
    title: "Mannskor og storband går sammen om førjulskonsert på Støperiet",
    slug: "forjulskonsert-goose-storbandet-fokus",
    date: "14.10.2026",
    excerpt:
      "Mannskoret GOOSE og Storbandet Fokus inviterer til en felles konsert på Støperiet scene i Tønsberg lørdag 5. desember. Publikum får fyldig mannskorsang, swingende storbandmusikk og en smak av jul på samme kveld.",
    coverImageUrl: gooseImg,
    ogImageUrl: gooseImg,
    content: `
      <p><strong>Mannskoret GOOSE og Storbandet Fokus inviterer til en felles konsert på Støperiet scene i Tønsberg lørdag 5. desember. Publikum får fyldig mannskorsang, swingende storbandmusikk og en smak av jul på samme kveld.</strong></p>

      <p>To godt etablerte musikkmiljøer slår seg sammen for første gang. GOOSE (Gregershølet Og Omegn Sang Ensemble) og Storbandet Fokus, som har holdt på siden 1975, står på scenen sammen gjennom hele kvelden. Konserten er delt i to sett med pause mellom.</p>

      <p>Programmet spenner vidt. Når de fremfører sammen, får vi høre alt fra James Bond-musikk, ABBA-klassikere og julelåter som «Fairytale of New York» og «Winter Wonderland». I tillegg vil hvert av ensemblene fremføre låter fra egne repertoar.</p>

      <blockquote>«Her blir det litt av alt. Når et mannskor og et fullt storband står på scenen samtidig, blir lydbildet noe helt eget. Og siden julen nærmer seg, blir det selvsagt også noen juletoner,» sier Kristoffer Myrheim i Storbandet Fokus.</blockquote>

      <p>Korister og musikere vil øve sammen på felleslåtene i høst, blant annet på Re videregående skole, der generalprøven også holdes 2. desember.</p>

      <blockquote>«Vi håper mange vil ta turen. Dette passer fint som starten på en julebordkveld, eller som en kveld ute med gode venner,» sier Lars Kristian Rusten i GOOSE.</blockquote>

      <p>Det er allerede blitt solgt ganske mange billetter, så det kan lønne seg å være tidlig ute med å kjøpe billetter! Billetter kan kjøpes på <a href="https://goose.hoopla.no/event/1346970082" target="_blank" rel="noopener noreferrer">goose.hoopla.no</a> eller ved inngangen (hvis det er flere billetter igjen). Dørene åpner kl. 17.00, og i lokalet vil det bli solgt mineralvann, øl og vin.</p>

      <h3>Fakta om konserten</h3>
      <ul>
        <li><strong>Hva:</strong> Julekonsert med GOOSE og Storbandet Fokus</li>
        <li><strong>Hvor:</strong> Støperiet scene, Tønsberg</li>
        <li><strong>Når:</strong> Lørdag 5. desember, konsertstart kl. 18.00 (dørene åpner kl. 17.00)</li>
        <li><strong>Billetter:</strong> Kr 380. Kjøp på <a href="https://goose.hoopla.no/event/1346970082" target="_blank" rel="noopener noreferrer">goose.hoopla.no/event/1346970082</a> eller ved inngangen</li>
        <li><strong>Program:</strong> Storband, mannskor og fellesnummer, med alt fra Queen, ABBA og James Bond til julemusikk</li>
      </ul>

      <p>Vi håper å se mange kjente og nye fjes i publikum – velkommen til førjulskonsert på Støperiet!</p>
    `,
  },
  {
    id: "3",
    title: "Vi søker vikar på gitar!",
    slug: "vi-soker-vikar-pa-gitar",
    date: "30.09.2026",
    excerpt:
      "Storbandet Fokus leter etter en engasjert gitarist som kan steppe inn som vikar for en periode framover.",
    coverImageUrl: vikarGitarImg,
    ogImageUrl: vikarGitarImg,
    content: `
      <p>Storbandet Fokus leter etter en engasjert gitarist som kan steppe inn som vikar i kompgruppen for en periode framover.</p>

      <h3>Hvem ser vi etter?</h3>
      <p>Du bør ha god erfaring med gitar og lyst til å spille storbandmusikk i et velfungerende og hyggelig miljø. Erfaring med jazz er et pluss, men ikke et krav — det viktigste er spilleglede, pålitelighet og vilje til å øve sammen med resten av bandet.</p>

      <h3>Hva kan vi tilby?</h3>
      <ul>
        <li>Et engasjert storband med lange tradisjoner og godt sosialt miljø</li>
        <li>Ukentlige øvelser på Re videregående skole</li>
        <li>Spennende konsertoppdrag og variert repertoar</li>
        <li>Noter og øvingsmateriell tilgjengelig digitalt</li>
      </ul>

      <h3>Interessert?</h3>
      <p>Ta kontakt på telefon <a href="tel:+4740454960">404 54 960</a>, eller bruk <a href="/#contact">kontaktskjemaet</a> på nettsiden. Vi gleder oss til å høre fra deg!</p>
    `,
  },
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
        <li><strong>Mer info:</strong> <a href="https://www.drammenkulturhus.no/arrangement/lordagsjazzen-storbandet-fokus" target="_blank" rel="noopener noreferrer">drammenkulturhus.no</a></li>
      </ul>

      <p>Vi håper å se mange kjente og nye fjes i salen. Ta turen til Drammen og opplev Storbandet Fokus live!</p>
    `,
  },
  {
    id: "1",
    title:
      "Nye takter i Storbandet Fokus: Kristoffer Myrheim tar over som leder i styret",
    slug: "nytt-styre-2026",
    date: "12.02.2026",
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

// Dates are stored as DD.MM.YYYY, so compare them as dates — not as strings
const toTimestamp = (date: string) => {
  const [day, month, year] = date.split(".").map(Number);
  return new Date(year, month - 1, day).getTime();
};

// Sorted newest first
export const getNewsArticles = () =>
  [...newsArticles].sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));

export const getNewsArticleBySlug = (slug: string) =>
  newsArticles.find((a) => a.slug === slug);

# Sanity CMS – Oppsettguide for Storbandet Fokus

## 1. Opprett Sanity-prosjekt

```bash
# Installer Sanity CLI
npm install -g @sanity/cli

# Opprett nytt prosjekt
sanity init

# Velg:
# - Project name: storbandet-fokus-cms
# - Dataset: production
# - Template: Clean project with no predefined schemas
```

## 2. Legg til schema

Kopier filen `sanity/schemas/newsPost.ts` fra dette repoet til ditt Sanity Studio-prosjekt:

```
sanity-studio/
  schemas/
    newsPost.ts    ← kopier denne
  sanity.config.ts
```

Registrer schema i `sanity.config.ts`:

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { newsPost } from "./schemas/newsPost";

export default defineConfig({
  name: "default",
  title: "Storbandet Fokus CMS",
  projectId: "<DIN_PROJECT_ID>",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [newsPost],
  },
});
```

## 3. Konfigurer CORS

Gå til [sanity.io/manage](https://www.sanity.io/manage) → ditt prosjekt → **API** → **CORS origins**.

Legg til:
- `http://localhost:8080` (for utvikling)
- `https://www.storbandetfokus.no` (produksjon)
- `https://fokus-band-spotlight.lovable.app` (Lovable preview)

Kryss **IKKE** av for "Allow credentials" – vi bruker kun offentlig lesing.

## 4. Koble frontend til Sanity

I Lovable, opprett environment-variabelen via **Settings → Environment Variables**
(eller legg til i `.env` lokalt):

```
VITE_SANITY_PROJECT_ID=<din_project_id>
VITE_SANITY_DATASET=production
```

Disse er **offentlige** verdier (publishable) og trygge å ha i koden.

Alternativt: Rediger `src/lib/sanity.ts` og erstatt default-verdiene direkte:

```ts
const SANITY_PROJECT_ID = "din_project_id";
const SANITY_DATASET = "production";
```

## 5. Kjør Sanity Studio

```bash
cd sanity-studio
sanity dev       # lokal utvikling (http://localhost:3333)
sanity deploy    # deploy til <prosjektnavn>.sanity.studio
```

Redaktører logger inn på Studio for å opprette/redigere/publisere nyheter.

## 6. Opprett en nyhetssak

1. Åpne Studio
2. Klikk "Nyhetssak" → "Create"
3. Fyll inn tittel, ingress, brødtekst, bilde
4. Sett slug (genereres fra tittel)
5. Sett publiseringsdato
6. Slå på "Publisert" = true
7. Klikk Publish

Saken blir umiddelbart tilgjengelig på `/nyheter/<slug>`.

## 7. GitHub Pages SPA-routing

Filen `public/404.html` sørger allerede for at direkte URLer (f.eks. `/nyheter/min-sak`)
fungerer på GitHub Pages ved å redirecte til `index.html` med path i querystring.

## 8. Deling på Facebook

Hver nyhetssak har:
- OpenGraph `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card tags
- JSON-LD structured data
- "Del på Facebook"-knapp og "Kopier lenke"-knapp

**OBS:** Siden GitHub Pages er statisk, kan ikke Facebook-crawleren lese
JavaScript-genererte OG-tags. For full Facebook-preview trenger du en
prerender-løsning (f.eks. prerender.io, Netlify, eller Cloudflare Workers).

## 9. Fallback / migrering

Så lenge `VITE_SANITY_PROJECT_ID` ikke er satt, viser frontenden de
statiske nyhetssakene fra `src/data/news.ts`. Når Sanity er konfigurert,
hentes alt innhold fra Sanity CDN.

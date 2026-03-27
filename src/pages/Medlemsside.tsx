import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, UserPlus, Music, CalendarCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const slackFeatures = [
  { icon: CalendarCheck, text: "Øvingsbeskjeder og fravær" },
  { icon: Music, text: "Noter og arrangement" },
  { icon: Info, text: "Intern informasjon fra styret" },
  { icon: MessageSquare, text: "Diskusjoner og samarbeid mellom medlemmer" },
];

const SLACK_WORKSPACE = "https://app.slack.com/client/T0A8QAAMVAA";
const SLACK_INVITE = "https://join.slack.com/t/storbandetfokus/shared_invite/zt-3trh7c0vo-OwhivvTj_5UERcr~9wU39Q";

const Medlemsside = () => (
  <>
    <Navbar />
    <main className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          Tilbake til forsiden
        </Link>

        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold mb-4">
          Medlem i <span className="text-primary">Storbandet Fokus</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl">
          All intern kommunikasjon, øvingsinformasjon, noter og styrearbeid i
          Storbandet Fokus foregår i vår Slack-kanal. Slack er vår felles
          plattform der medlemmene holder seg oppdatert og samarbeider.
          Tilgang gis ved invitasjon.
        </p>

        {/* CTA Section */}
        <div className="bg-card border border-border rounded-xl p-8 mb-12 shadow-sm">
          <h2 className="font-serif-display text-2xl font-semibold mb-2">
            Kom i gang med Slack
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Er du allerede medlem? Åpne Slack direkte. Nytt medlem? Be om
            invitasjon via lenken under.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <a href={SLACK_WORKSPACE} target="_blank" rel="noopener noreferrer">
                <MessageSquare size={18} />
                Åpne Slack
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={SLACK_INVITE} target="_blank" rel="noopener noreferrer">
                <UserPlus size={18} />
                Bli medlem i Slack
              </a>
            </Button>
          </div>
        </div>

        {/* Feature list */}
        <h2 className="font-serif-display text-2xl font-semibold mb-6">
          Hva finner du i Slack?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {slackFeatures.map((f) => (
            <li
              key={f.text}
              className="flex items-start gap-3 bg-card border border-border rounded-lg p-5 shadow-sm"
            >
              <f.icon size={20} className="text-primary mt-0.5 shrink-0" />
              <span className="text-foreground text-sm">{f.text}</span>
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground text-xs text-center">
          Har du spørsmål om tilgang? Ta kontakt med styret eller en av
          bandets medlemmer.
        </p>
      </div>
    </main>
    <Footer />
  </>
);

export default Medlemsside;

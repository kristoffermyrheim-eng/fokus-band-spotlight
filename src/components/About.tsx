import { Music, Users, Star } from "lucide-react";

const features = [
  { icon: Music, title: "Allsidig repertoar", desc: "Fra klassisk jazz og swing til funk, soul og moderne pop-arrangementer." },
  { icon: Users, title: "20+ musikere", desc: "Et fullbemannet storband med erfarne musikere fra Vestfold-regionen." },
  { icon: Star, title: "Lang fartstid", desc: "Stor track record med hundrevis av opptredener — og bred anerkjennelse for det vi leverer." },
];

const About = () => (
  <section id="about" className="py-24 px-4">
    <div className="container mx-auto max-w-5xl">
      <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-center mb-4">
        Om <span className="text-primary">oss</span>
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 text-lg">
        Storbandet Fokus fra Vestfold har lang fartstid og er kjent for å levere energiske og 
        profesjonelle show. Vi har fått mye anerkjennelse for det vi gjør — enten det er et intimt selskap eller en stor festival.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
            <f.icon className="mx-auto mb-4 text-primary" size={32} />
            <h3 className="font-serif-display text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;

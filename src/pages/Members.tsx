import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import saxImg from "@/assets/Sax m navn.jpg";
import tromboneImg from "@/assets/Tromboner m navn.jpg";
import trompetImg from "@/assets/Trompet m navn.jpg";
import kompImg from "@/assets/Komp m navn.avif";
import dirigentImg from "@/assets/gallery-2.avif";

const sections = [
  {
    title: "Saxofoner",
    image: saxImg,
    members: [
      "Tom Nilsen",
      "Anne Karine Skredegård",
      "Vidar Berg",
      "Hilde Ederklep",
      "Gunn Hilde Kjølstad Hagen",
    ],
  },
  {
    title: "Tromboner",
    image: tromboneImg,
    members: [
      "Trond Antonsen",
      "Kristoffer Myrheim",
      "Thor Ole Johnsen",
      "Vidar Engelstad",
      "Scott Rogers",
    ],
  },
  {
    title: "Trompeter",
    image: trompetImg,
    members: ["Geir Sveen", "Toto Hagen", "Sveinung Takle", "Gløer Gløersen"],
  },
  {
    title: "Komp",
    image: kompImg,
    members: [
      "Roar Myrheim",
      "Jan Ekornrud",
      "Trygve Sivertsen",
      "Morten Kjølstad",
    ],
  },
  {
    title: "Dirigent",
    image: dirigentImg,
    members: ["Øyvinn Pedersen"],
  },
];

const Members = () => (
  <>
    <Navbar />
    <main className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          Tilbake til forsiden
        </Link>

        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold mb-4">
          Våre <span className="text-primary">musikere</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mb-16">
          Storbandet Fokus består av 18 dyktige musikere fra Vestfold-regionen.
        </p>

        <div className="space-y-20">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-6">
                {section.title}
              </h2>
              <div className="rounded-lg overflow-hidden border border-border mb-6">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {section.members.map((name) => (
                  <li
                    key={name}
                    className="bg-card border border-border rounded-md px-4 py-3 text-sm font-medium"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Members;

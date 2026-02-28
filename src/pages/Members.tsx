import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import saxImg from "@/assets/Sax m navn.jpg";
import tromboneImg from "@/assets/Tromboner m navn.jpg";
import trompetImg from "@/assets/Trompet m navn.jpg";
import kompImg from "@/assets/Komp m navn.avif";
import dirigentImg from "@/assets/gallery-2.avif";
import vokImg from "@/assets/gallery-1.avif";

type Member = {
  name: string;
  role?: string;   // Valgfritt: f.eks. "Bandleder", "Soloist"
  bio?: string;    // Valgfritt: kort info
};

const sections = [
  {
    title: "Saxofoner",
    image: saxImg,
    members: [
      { name: "Vidar Berg", role: "1. Tenorsax", bio: "Medlem siden " },
      { name: "Anne Karine Skredegård", role: "2. Altsax", bio: "Medlem siden " },
      { name: "Tom Nilsen", role: "1. Altsax", bio: "Medlem siden " },
      { name: "Hilde Ederklep", role: "2. Tenorsax", bio: "Medlem siden 2026" },
      { name: "Gunn Hilde Kjølstad Hagen", role: "Baritonsax", bio: "Medlem siden " },
    ],
  },
  {
    title: "Tromboner",
    image: tromboneImg,
    members: [
      { name: "Kristoffer Myrheim", role: "2. Trombone", bio: "Medlem siden 2021" },
      { name: "Trond Antonsen", role: "1. Trombone", bio: "Medlem siden " },
      { name: "Thor Ole Johnsen", role: "3. Trombone", bio: "Medlem siden 1975" },
      { name: "Scott Rogers", role: "Basstrombone", bio: "Medlem siden " },
      { name: "Vidar Engelstad", role: "Basstrombone", bio: "Medlem siden 1975" },
    ],
  },
  {
    title: "Trompeter",
    image: trompetImg,
    members: [
      { name: "Toto Hagen", role: "2. Trompet", bio: "Medlem siden " }, 
      { name: "Geir Sveen", role: "1. Trompet", bio: "Medlem siden " }, 
      { name: "Sveinung Takle", role: "3. Trompet", bio: "Medlem siden " }, 
      { name: "Gløer Gløersen", role: "4. Trompet", bio: "Medlem siden " },
    ],
  },
  {
    title: "Komp",
    image: kompImg,
    members: [
      { name: "Morten Ottesen", role: "Solo gitar", bio: "Medlem siden " }, 
      { name: "Trygve Sivertsen", role: "Rytme gitar", bio: "Medlem siden " }, 
      { name: "Morten Kjølstad", role: "Trommer", bio: "Medlem siden " }, 
      { name: "Jan Ekornrud", role: "Bass", bio: "Medlem siden " }, 
      { name: "Roar Myrheim", role: "Piano", bio: "Medlem siden " }, 
    ],
  },
  {
    title: "Dirigent",
    image: dirigentImg,
    members: [{ name: "Øyvinn Pedersen", role: "Dirigent" }, ],
  },
    {
    title: "Vokalist",
    image: vokImg,
    members: [{ name: "Lena Jørgensen", role: "Vokalist" }, ],
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
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                {section.members.map((member) => (
                  <li
                    key={member.name}
                    className="bg-card border border-border rounded-lg p-5 text-sm flex flex-col gap-2 shadow-sm"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-foreground leading-tight">
                        {member.name}
                      </span>
                      <span className="text-primary font-medium text-xs uppercase tracking-wider">
                        {member.role}
                      </span>
                    </div>
                    
                    {member.bio && (
                      <p className="text-muted-foreground text-sm leading-relaxed mt-2 border-t border-border pt-2">
                        {member.bio}
                      </p>
                    )}
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

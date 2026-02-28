import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const videos = [
  { title: "Foynhagenhistorien 2013–2022", vimeoId: "682508489" },
  { title: "Storbandet Fokus – 40 år på 14 minutter", vimeoId: "146415044" },
  { title: "Fokusåret 2018", vimeoId: "308067068" },
  { title: "Do Nothin' Till You Hear From Me", vimeoId: "306418646" },
  { title: "The Christmas Song – Caroline Kirkevold", vimeoId: "306643420" },
  { title: "Mary's Boy Child – Ingrid Hagen", vimeoId: "305071098" },
  { title: "Santa Baby – Martine Therese Tørum", vimeoId: "307303794" },
  { title: "Foynhagen 1. juni", vimeoId: "222656923" },
  { title: "Fokus i Foynhaven 11. juni 2014", vimeoId: "129547334" },
];

const Videos = () => (
  <>
    <Navbar />
    <main className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-center mb-4">
          Historiske <span className="text-primary">videoer</span>
        </h1>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12 text-lg">
          Et utvalg videoer fra konserter og arrangementer gjennom årene.
        </p>

        <div className="space-y-12">
          {videos.map((video) => (
            <div key={video.vimeoId}>
              <h2 className="text-lg font-semibold mb-3">{video.title}</h2>
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={`https://player.vimeo.com/video/${video.vimeoId}`}
                  className="w-full h-full rounded-lg"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Videos;

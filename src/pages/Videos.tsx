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

const facebookVideos = [
  {
    url: "https://www.facebook.com/1062115538/videos/pcb.10231473843923557/8963650346988977",
    caption: "Video 1",
  },
  {
    url: "https://www.facebook.com/1062115538/videos/pcb.10231473843923557/1274849270325258",
    caption: "Video 2",
  },
  {
    url: "https://www.facebook.com/1062115538/videos/pcb.10231473843923557/3990812874537534",
    caption: "Video 3",
  },
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

        {/* Facebook-videoer */}
        <div className="mt-20">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-center mb-4">
            Facebook-<span className="text-primary">videoer</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {facebookVideos.map((video) => (
              <div
                key={video.url}
                className="rounded-lg border border-border shadow-sm overflow-hidden bg-card"
              >
                <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=0&width=960`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={video.caption}
                  />
                </div>
                <p className="text-sm text-muted-foreground p-3 text-center">
                  {video.caption}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Videoene er lastet fra Facebook.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Videos;

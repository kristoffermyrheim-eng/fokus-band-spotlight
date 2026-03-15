import { useEffect } from "react";
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
    url: "https://www.facebook.com/1062115538/videos/8963650346988977/",
    caption: "Video 1",
  },
  {
    url: "https://www.facebook.com/1062115538/videos/1274849270325258/",
    caption: "Video 2",
  },
  {
    url: "https://www.facebook.com/1062115538/videos/3990812874537534/",
    caption: "Video 3",
  },
];

const Videos = () => {
  useEffect(() => {
    // Load Facebook SDK
    if (document.getElementById("facebook-jssdk")) {
      // SDK already loaded, re-parse
      if ((window as any).FB) {
        (window as any).FB.XFBML.parse();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup not strictly needed as SDK persists
    };
  }, []);

  return (
    <>
      <div id="fb-root" />
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
                  <div className="w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                    <div
                      className="fb-video"
                      data-href={video.url}
                      data-width="auto"
                      data-allowfullscreen="true"
                      data-autoplay="false"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground p-3 text-center">
                    {video.caption}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Videoene vises via Facebook og kan kreve samtykke til informasjonskapsler.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Videos;

import { AspectRatio } from "@/components/ui/aspect-ratio";
import konsertVideo from "@/assets/konsert-video.mp4";
import gallery1 from "@/assets/gallery-1.avif";
import gallery2 from "@/assets/gallery-2.avif";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const photos = [
  { src: gallery1, alt: "Vokalist med bandet" },
  { src: gallery2, alt: "Bandet på event" },
  { src: gallery3, alt: "Konsert med rødt scenelys" },
  { src: gallery4, alt: "Fullt band på scenen med publikum" },
];

const Media = () => (
  <section id="media" className="py-24 px-4 bg-secondary/20">
    <div className="container mx-auto max-w-5xl">
      <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-center mb-4">
        Se og <span className="text-primary">hør</span>
      </h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16 text-lg">
        Få en smakebit av hva vi kan tilby.
      </p>

      {/* Video */}
      <div className="max-w-3xl mx-auto mb-16">
        <AspectRatio ratio={16 / 9}>
          <video
            className="w-full h-full rounded-lg object-cover"
            controls
            preload="metadata"
          >
            <source src={konsertVideo} type="video/mp4" />
            Nettleseren din støtter ikke videoavspilling.
          </video>
        </AspectRatio>
        <p className="text-center text-muted-foreground text-sm mt-3">Video fra vår jubileumskonsert</p>
      </div>

      {/* Photo gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-lg border border-border hover:border-primary/40 transition-colors">
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Media;

import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const photos = [
  "Storbandet på scenen under festival",
  "Nærbilde av saksofonist",
  "Bandet på bedriftsevent",
  "Jazzaften med fullt band",
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

      {/* Video placeholder */}
      <div className="max-w-3xl mx-auto mb-16">
        <AspectRatio ratio={16 / 9}>
          <div className="w-full h-full bg-card border border-border rounded-lg flex items-center justify-center cursor-pointer group hover:border-primary/40 transition-colors">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Play className="text-primary ml-1" size={28} />
            </div>
          </div>
        </AspectRatio>
        <p className="text-center text-muted-foreground text-sm mt-3">Video fra konsert — kommer snart</p>
      </div>

      {/* Photo gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((alt, i) => (
          <div key={i} className="aspect-square bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary/40 transition-colors">
            <span className="text-muted-foreground text-xs text-center px-4">{alt}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Media;

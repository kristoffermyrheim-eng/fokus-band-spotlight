import { CalendarDays } from "lucide-react";

const Events = () => (
  <section id="events" className="py-24 px-4">
    <div className="container mx-auto max-w-3xl">
      <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-center mb-4">
        Kommende <span className="text-primary">konserter</span>
      </h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16 text-lg">
        Se hvor du kan oppleve oss live.
      </p>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <CalendarDays size={24} className="mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground text-lg">Ingen planlagte konserter akkurat nå.</p>
      </div>
    </div>
  </section>
);

export default Events;

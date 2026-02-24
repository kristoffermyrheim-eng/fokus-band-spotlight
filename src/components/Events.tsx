import { CalendarDays, MapPin } from "lucide-react";

const events = [
  { date: "5. juni 2026", venue: "Bakgårdsfestivalen, Tønsberg", desc: "Festivalopptreden med fullt band og storslått show." },
];

const Events = () => (
  <section id="events" className="py-24 px-4">
    <div className="container mx-auto max-w-3xl">
      <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-center mb-4">
        Kommende <span className="text-primary">konserter</span>
      </h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16 text-lg">
        Se hvor du kan oppleve oss live.
      </p>

      <div className="space-y-4">
        {events.map((e, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-lg p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="sm:w-40 shrink-0">
              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                <CalendarDays size={16} />
                {e.date}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-foreground font-medium mb-1">
                <MapPin size={14} className="text-muted-foreground" />
                {e.venue}
              </div>
              <p className="text-muted-foreground text-sm">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Events;

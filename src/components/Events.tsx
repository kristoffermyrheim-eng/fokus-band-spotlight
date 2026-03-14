import { CalendarDays, MapPin, ExternalLink } from "lucide-react";

const events = [
  {
    date: "20. juni 2026",
    title: "Lørdagsjazzen",
    venue: "Kulturhuset i Drammen",
    url: "https://drammenkulturhus.no",
  },
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
        {events.map((event, i) => (
          <a
            key={i}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-lg p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center gap-3 text-primary font-medium min-w-[160px]">
              <CalendarDays size={20} />
              <span>{event.date}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-serif-display font-bold text-lg group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                <MapPin size={14} />
                <span>{event.venue}</span>
              </div>
            </div>
            <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Events;

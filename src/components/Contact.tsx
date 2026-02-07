import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast({ title: "Takk for din henvendelse!", description: "Vi tar kontakt så snart som mulig." });
      (e.target as HTMLFormElement).reset();
      setSending(false);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-center mb-4">
          Book <span className="text-primary">oss</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16 text-lg">
          Interessert i å ha Storbandet Fokus på ditt arrangement? Send oss en melding!
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Navn</Label>
              <Input id="name" required placeholder="Ditt navn" className="mt-1.5 bg-card" />
            </div>
            <div>
              <Label htmlFor="email">E-post</Label>
              <Input id="email" type="email" required placeholder="din@epost.no" className="mt-1.5 bg-card" />
            </div>
            <div>
              <Label htmlFor="date">Dato for arrangement</Label>
              <Input id="date" type="date" className="mt-1.5 bg-card" />
            </div>
            <div>
              <Label htmlFor="message">Melding</Label>
              <Textarea id="message" required rows={4} placeholder="Fortell oss om arrangementet..." className="mt-1.5 bg-card" />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={sending}>
              {sending ? "Sender..." : "Send melding"}
            </Button>
          </form>

          <div className="flex flex-col justify-center gap-6">
            <div>
              <h3 className="font-serif-display text-xl font-semibold mb-3">Kontaktinfo</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary" />
                  <span>booking@storbandetfokus.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary" />
                  <span>+47 404 54 960</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-semibold mb-3">Følg oss</h3>
              <div className="flex gap-4 text-muted-foreground">
                <a href="https://www.facebook.com/profile.php?id=100063801992583" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a>
                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-primary transition-colors">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

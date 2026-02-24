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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);
    // Legg til din Web3Forms Access Key her:
    formData.append("access_key", "0ecb3af9-20e5-4c3c-b2c8-1f3e6bf3b2b6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast({ 
          title: "Takk for din henvendelse!", 
          description: "Vi har mottatt meldingen og tar kontakt så snart som mulig." 
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({ 
          variant: "destructive",
          title: "Oops!", 
          description: "Noe gikk galt. Vennligst prøv igjen senere." 
        });
      }
    } catch (error) {
      toast({ 
        variant: "destructive",
        title: "Feil", 
        description: "Kunne ikke koble til serveren." 
      });
    } finally {
      setSending(false);
    }
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
            {/* Navn-feltet må ha 'name="name"' for at Web3Forms skal skjønne det */}
            <div>
              <Label htmlFor="name">Navn</Label>
              <Input id="name" name="name" required placeholder="Ditt navn" className="mt-1.5 bg-card" />
            </div>
            <div>
              <Label htmlFor="email">E-post</Label>
              <Input id="email" name="email" type="email" required placeholder="din@epost.no" className="mt-1.5 bg-card" />
            </div>
            <div>
              <Label htmlFor="date">Dato for arrangement</Label>
              <Input id="date" name="date" type="date" className="mt-1.5 bg-card" />
            </div>
            <div>
              <Label htmlFor="message">Melding</Label>
              <Textarea id="message" name="message" required rows={4} placeholder="Fortell oss om arrangementet..." className="mt-1.5 bg-card" />
            </div>
            
            {/* Valgfritt: Legg til emne for e-posten du mottar */}
            <input type="hidden" name="subject" value="Ny bookingforespørsel fra nettsiden"></input>
            <input type="hidden" name="from_name" value="Storbandet Fokus Nettside" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
            
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
                  <span>booking@storbandetfokus.no</span>
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

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        <p className="text-sm text-foreground">
          Denne nettsiden bruker informasjonskapsler (cookies) for å forbedre
          brukeropplevelsen og samle anonym statistikk via Google Analytics. Ved
          å bruke nettsiden samtykker du til bruk av cookies.
        </p>
        {expanded && (
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Vi bruker Google Analytics for å forstå hvordan besøkende bruker
              nettsiden. Informasjonen som samles inn er anonymisert og deles med
              Google for analyseformål.
            </p>
            <p>
              Informasjonskapsler lagres i nettleseren din og hjelper oss med å
              forbedre innholdet og opplevelsen på nettsiden. Du kan når som
              helst slette cookies i nettleserens innstillinger.
            </p>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={accept}>
            Godta
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Skjul" : "Les mer"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/fokus-logo.avif";

const links = [
  { label: "Om oss", href: "#about" },
  { label: "Media", href: "#media" },
  { label: "Konserter", href: "#events" },
  { label: "Vår Historie", href: "/var-historie" },
  { label: "Nyheter", href: "/nyheter" },
  { label: "Kontakt", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + href);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-3">
          <img src={logo} alt="Storbandet Fokus logo" className="h-10 w-auto" />
        </button>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleLinkClick(l.href)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
          <Button size="sm" onClick={() => handleLinkClick("#contact")}>
            Book oss
          </Button>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleLinkClick(l.href)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 text-left"
            >
              {l.label}
            </button>
          ))}
          <Button size="sm" onClick={() => handleLinkClick("#contact")}>
            Book oss
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

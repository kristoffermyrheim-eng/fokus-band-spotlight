import logo from "@/assets/fokus-logo.avif";

const Footer = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <a href="#" className="flex items-center gap-3">
        <img src={logo} alt="Storbandet Fokus logo" className="h-8 w-auto" />
      </a>
      <span>&copy; {new Date().getFullYear()} Storbandet Fokus. Alle rettigheter reservert.</span>
    </div>
  </footer>
);

export default Footer;

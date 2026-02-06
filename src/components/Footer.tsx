const Footer = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <span className="font-serif-display text-foreground font-semibold">Storbandet Fokus</span>
      <span>&copy; {new Date().getFullYear()} Storbandet Fokus. Alle rettigheter reservert.</span>
    </div>
  </footer>
);

export default Footer;

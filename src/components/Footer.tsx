const Footer = () => {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-border/50 glass-effect">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base text-muted-foreground font-medium">
          &copy; {new Date().getFullYear()} Actor Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

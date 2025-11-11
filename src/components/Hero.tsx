import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Actor Portfolio
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Bringing stories to life through short films, diploma projects, and commercial work
        </p>
        <Button
          onClick={scrollToContact}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 transition-opacity text-primary-foreground font-semibold animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300"
        >
          Get In Touch
        </Button>
      </div>
    </section>
  );
};

export default Hero;

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 section-glow" />
      <div className="container mx-auto max-w-5xl relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 sm:mb-16 text-center animate-fade-in">
          <span className="text-gradient">
            About Me
          </span>
        </h2>
        <div className="glass-effect border border-border/50 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-elegant hover-glow animate-slide-up">
          <p className="text-base sm:text-lg lg:text-xl text-foreground/90 leading-relaxed mb-6 sm:mb-8">
            As a dedicated actor with a passion for storytelling, I've had the privilege of working across various mediums 
            including short films, diploma projects, and commercial advertisements.
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-foreground/90 leading-relaxed">
            My approach to acting is rooted in authenticity and emotional depth, bringing each character to life with 
            dedication and professionalism. I believe in the power of visual storytelling to connect with audiences and 
            create memorable experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

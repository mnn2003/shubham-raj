import Navigation from "@/components/Navigation";
import ActorProfile from "@/components/ActorProfile";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Works from "@/components/Works";
import Videos from "@/components/Videos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <Navigation />
      <ActorProfile />
      <About />
      <Gallery />
      <Works />
      <Videos />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

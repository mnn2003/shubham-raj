import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWorks } from "@/hooks/useFirebaseData";
import { Skeleton } from "@/components/ui/skeleton";

const Works = () => {
  const { works, loading, error } = useWorks();

  // Fallback placeholder data if Firebase is empty
  const placeholderWorks = [
    {
      id: "1",
      title: "Short Film: The Last Light",
      category: "Short Film",
      year: "2024",
      role: "Lead Actor",
      description: "A compelling drama about finding hope in darkness, showcasing emotional depth and character development.",
    },
    {
      id: "2",
      title: "Diploma Project: Echoes",
      category: "Diploma Film",
      year: "2023",
      role: "Supporting Actor",
      description: "An experimental piece exploring memory and identity through visual storytelling.",
    },
    {
      id: "3",
      title: "Commercial: Urban Style",
      category: "Advertisement",
      year: "2024",
      role: "Featured Actor",
      description: "High-energy fashion commercial for a leading lifestyle brand.",
    },
    {
      id: "4",
      title: "Short Film: Whispers",
      category: "Short Film",
      year: "2023",
      role: "Lead Actor",
      description: "A psychological thriller that challenges perception and reality.",
    },
  ];

  const displayWorks = works.length > 0 ? works : placeholderWorks;

  return (
    <section id="works" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 section-glow" />
      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 sm:mb-16 text-center animate-fade-in">
          <span className="text-gradient">
            Featured Works
          </span>
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="glass-effect border-border/50">
                <CardHeader>
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-12">
            <p>Failed to load works. Using placeholder data.</p>
          </div>
        ) : null}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {displayWorks.map((work, index) => (
            <Card 
              key={work.id} 
              className="glass-effect border-border/50 hover-glow group animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity" />
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <Badge className="bg-gradient-primary text-primary-foreground border-0 px-4 py-1 text-sm font-semibold">
                    {work.category}
                  </Badge>
                  <span className="text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">{work.year}</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl group-hover:text-primary transition-colors duration-300">
                  {work.title}
                </CardTitle>
                <CardDescription className="text-accent font-semibold text-base">
                  {work.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-foreground/80 leading-relaxed">
                  {work.description}
                </p>
              </CardContent>
            </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Works;

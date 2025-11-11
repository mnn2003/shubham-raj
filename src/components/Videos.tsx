import { useVideos } from "@/hooks/useFirebaseData";
import { Skeleton } from "@/components/ui/skeleton";

const Videos = () => {
  const { videos, loading, error } = useVideos();

  // Fallback placeholder video data if Firebase is empty
  const placeholderVideos = [
    {
      id: "1",
      title: "Showreel 2024",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "A compilation of my best performances from 2024",
    },
    {
      id: "2",
      title: "Behind the Scenes: The Last Light",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Exclusive behind-the-scenes footage from our latest short film",
    },
  ];

  const displayVideos = videos.length > 0 ? videos : placeholderVideos;

  return (
    <section id="videos" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 section-glow" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 sm:mb-16 text-center animate-fade-in">
          <span className="text-gradient">
            Video Gallery
          </span>
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-12">
            <p>Failed to load videos. Using placeholder data.</p>
          </div>
        ) : null}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {displayVideos.map((video, index) => (
            <div 
              key={video.id} 
              className="space-y-5 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-elegant hover-glow group">
                <iframe
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="glass-effect p-5 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gradient">{video.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{video.description}</p>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Videos;

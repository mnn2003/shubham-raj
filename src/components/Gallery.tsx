import { useState } from "react";
import { useGalleryImages } from "@/hooks/useFirebaseData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { images, loading, error } = useGalleryImages();

  // Fallback placeholder images if Firebase is empty
  const placeholderImages = [
    { id: "1", url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800", alt: "Acting shot 1" },
    { id: "2", url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800", alt: "Acting shot 2" },
    { id: "3", url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800", alt: "Acting shot 3" },
    { id: "4", url: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800", alt: "Acting shot 4" },
    { id: "5", url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800", alt: "Acting shot 5" },
    { id: "6", url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800", alt: "Acting shot 6" },
  ];

  const displayImages = images.length > 0 ? images : placeholderImages;

  return (
    <>
      <section id="gallery" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 section-glow" />
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 sm:mb-16 text-center animate-fade-in">
            <span className="text-gradient">
              Photo Gallery
            </span>
          </h2>
          
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center text-destructive py-12">
              <p>Failed to load gallery. Using placeholder images.</p>
            </div>
          )}

          {!loading && displayImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayImages.map((image, index) => (
                <div
                  key={image.id}
                  className="aspect-square overflow-hidden rounded-2xl border border-border/50 cursor-pointer group hover-glow animate-scale-in"
                  onClick={() => setSelectedImageIndex(index)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Carousel Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-5xl w-[95vw] sm:w-full p-4 sm:p-6 glass-effect border-border/50">
          {selectedImageIndex !== null && (
            <Carousel
              opts={{ loop: true, startIndex: selectedImageIndex }}
              className="w-full"
            >
              <CarouselContent>
                {displayImages.map((image, index) => (
                  <CarouselItem key={image.id}>
                    <div className="aspect-video flex items-center justify-center p-2 sm:p-6">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-2xl shadow-elegant"
                      />
                    </div>
                    {image.alt && (
                      <p className="text-center text-base sm:text-lg font-semibold mt-4 px-4 text-gradient">
                        {image.alt}
                      </p>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 sm:left-4 glass-effect hover-glow" />
              <CarouselNext className="right-2 sm:right-4 glass-effect hover-glow" />
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';
import { Mail, Phone, Instagram, Facebook, Twitter, Linkedin, User, Ruler } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileData {
  name: string;
  age: string;
  height: string;
  email: string;
  phone: string;
  imageUrl: string;
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const ActorProfile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Actor Name',
    age: '25',
    height: '5\'10"',
    email: 'actor@example.com',
    phone: '+1 234 567 890',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileRef = ref(database, 'profile');
    
    const unsubscribe = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const socialLinks = [
    { name: 'Instagram', url: profile.social?.instagram, icon: Instagram },
    { name: 'Facebook', url: profile.social?.facebook, icon: Facebook },
    { name: 'Twitter', url: profile.social?.twitter, icon: Twitter },
    { name: 'LinkedIn', url: profile.social?.linkedin, icon: Linkedin }
  ].filter(link => link.url && link.url !== '#');

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 section-glow" />
      {loading ? (
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          <Skeleton className="aspect-[3/4] rounded-3xl w-full max-w-md mx-auto" />
          <div className="space-y-6 px-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-12 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          {/* Left: Actor Image */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-border/50 shadow-elegant hover-glow group w-full max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 mix-blend-overlay" />
              <img
                src={profile?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"}
                alt={profile?.name || "Actor"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
            </div>
          </div>

          {/* Right: Actor Details */}
          <div className="order-1 lg:order-2 space-y-8 animate-slide-up px-4">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-gradient animate-scale-in">
                  {profile?.name || "Actor Name"}
                </span>
              </h1>
              <div className="flex flex-wrap gap-4 sm:gap-6 text-base sm:text-lg">
                <div className="glass-effect px-4 py-3 rounded-xl flex items-center gap-3 hover-glow">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                  </div>
                  <span className="font-medium">{profile?.age || "25"} years</span>
                </div>
                <div className="glass-effect px-4 py-3 rounded-xl flex items-center gap-3 hover-glow">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                  </div>
                  <span className="font-medium">{profile?.height || "5'10\""}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gradient">Contact</h2>
              <div className="space-y-3">
                <a
                  href={`mailto:${profile?.email || "actor@example.com"}`}
                  className="glass-effect px-5 py-4 rounded-xl flex items-center gap-4 hover-glow group block"
                >
                  <div className="p-3 bg-gradient-primary rounded-xl group-hover:shadow-glow transition-all">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm sm:text-base font-medium truncate">{profile?.email || "actor@example.com"}</span>
                </a>
                <a
                  href={`tel:${profile?.phone || "+1234567890"}`}
                  className="glass-effect px-5 py-4 rounded-xl flex items-center gap-4 hover-glow group block"
                >
                  <div className="p-3 bg-gradient-primary rounded-xl group-hover:shadow-glow transition-all">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">{profile?.phone || "+1 (234) 567-890"}</span>
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            {socialLinks.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gradient">Connect</h2>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map(({ name, url, icon: Icon }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-effect p-4 rounded-xl hover-glow group"
                      aria-label={name}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ActorProfile;
